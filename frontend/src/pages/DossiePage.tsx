import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Ruler,
  BedDouble,
  Bath,
  Car,
  DoorOpen,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Download,
  Filter,
} from 'lucide-react';
import {
  meusImoveis,
  imoveisConcorrentes,
  goldSignals,
  formatCurrency,
  formatDate,
  getSignalLabel,
  getSignalColor,
  estados,
  getCidadesPorEstado,
  getBairrosPorCidade,
} from '../data/mockData';
import type { Imovel } from '../types';

function getConcorrentesProximos(imovel: Imovel): Imovel[] {
  return imoveisConcorrentes.filter((c) => {
    if (c.bairro !== imovel.bairro) return false;
    if (c.tipo !== imovel.tipo) return false;
    const diffArea = Math.abs(c.areaTotal - imovel.areaTotal) / imovel.areaTotal;
    return diffArea <= 0.2;
  });
}

export default function DossiePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get('id');

  const [estadoFilter, setEstadoFilter] = useState('');
  const [cidadeFilter, setCidadeFilter] = useState('');
  const [bairroFilter, setBairroFilter] = useState('');
  const [tipoFilter, setTipoFilter] = useState('');

  const cidadesDisponiveis = useMemo(() => estadoFilter ? getCidadesPorEstado(estadoFilter) : [], [estadoFilter]);
  const bairrosDisponiveis = useMemo(() => cidadeFilter ? getBairrosPorCidade(cidadeFilter) : [], [cidadeFilter]);

  const imoveisFiltrados = useMemo(() => {
    let imoveis = [...meusImoveis];
    if (estadoFilter) imoveis = imoveis.filter((i) => i.estado === estadoFilter);
    if (cidadeFilter) imoveis = imoveis.filter((i) => i.cidade === cidadeFilter);
    if (bairroFilter) imoveis = imoveis.filter((i) => i.bairro === bairroFilter);
    if (tipoFilter) imoveis = imoveis.filter((i) => i.tipo === tipoFilter);
    return imoveis;
  }, [estadoFilter, cidadeFilter, bairroFilter, tipoFilter]);

  // Block concorrentes from accessing dossiê
  const imovel = id ? meusImoveis.find((i) => i.id === id) : undefined;
  const isConcorrente = id ? imoveisConcorrentes.some((i) => i.id === id) : false;

  if (id && isConcorrente) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray hover:text-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
        <div className="bg-card rounded-xl border border-light-gray p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-warning mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-dark mb-2">Dossiê indisponível</h3>
          <p className="text-sm text-gray">
            O dossiê é gerado apenas para imóveis da sua imobiliária. Concorrentes não possuem dossiê.
          </p>
        </div>
      </div>
    );
  }

  if (!imovel) {
    return (
      <div className="space-y-6">
        <div className="bg-card rounded-xl border border-light-gray p-6">
          <h3 className="text-lg font-semibold text-dark mb-4">Selecione um imóvel para gerar o dossiê</h3>
          <p className="text-sm text-gray mb-6">
            Escolha um dos seus imóveis abaixo ou acesse pelo mapa de comparação.
          </p>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <Filter className="w-4 h-4 text-gray" />
            <select
              value={estadoFilter}
              onChange={(e) => { setEstadoFilter(e.target.value); setCidadeFilter(''); setBairroFilter(''); }}
              className="px-3 py-2 bg-surface border border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary"
            >
              <option value="">Todos os estados</option>
              {estados.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
            <select
              value={cidadeFilter}
              onChange={(e) => { setCidadeFilter(e.target.value); setBairroFilter(''); }}
              disabled={!estadoFilter}
              className="px-3 py-2 bg-surface border border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary disabled:opacity-50"
            >
              <option value="">Todas as cidades</option>
              {cidadesDisponiveis.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={bairroFilter}
              onChange={(e) => setBairroFilter(e.target.value)}
              disabled={!cidadeFilter}
              className="px-3 py-2 bg-surface border border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary disabled:opacity-50"
            >
              <option value="">Todos os bairros</option>
              {bairrosDisponiveis.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="px-3 py-2 bg-surface border border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary"
            >
              <option value="">Todos os tipos</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="cobertura">Cobertura</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {imoveisFiltrados.map((im) => (
              <div
                key={im.id}
                className="bg-surface rounded-xl overflow-hidden cursor-pointer group card-accent border border-light-gray"
                onClick={() => navigate(`/dossie?id=${im.id}`)}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={im.imagemUrl}
                    alt={im.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-bg/90 backdrop-blur-sm text-dark text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {im.tipo.charAt(0).toUpperCase() + im.tipo.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-dark mb-1 truncate">{im.titulo}</h4>
                  <p className="text-xs text-gray mb-2">{im.bairro}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-base font-bold text-dark">{formatCurrency(im.preco)}</p>
                    <span className="text-xs text-gray">{im.areaTotal}m²</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const concorrentes = getConcorrentesProximos(imovel);
  const sinais = goldSignals.filter(
    (s) => s.imovelId === imovel.id || concorrentes.some((c) => c.id === s.imovelId)
  );

  const precosPorM2Concorrentes = concorrentes.map((c) => c.preco / c.areaTotal);
  const mediaPrecoPorM2 =
    precosPorM2Concorrentes.length > 0
      ? precosPorM2Concorrentes.reduce((a, b) => a + b, 0) / precosPorM2Concorrentes.length
      : 0;
  const meuPrecoPorM2 = imovel.preco / imovel.areaTotal;
  const posicionamento = mediaPrecoPorM2 > 0 ? ((meuPrecoPorM2 - mediaPrecoPorM2) / mediaPrecoPorM2) * 100 : 0;

  const sinaisResumidos = {
    vendas: sinais.filter((s) => s.tipo === 'venda_retirada').length,
    alteracoes: sinais.filter((s) => s.tipo === 'alteracao_preco').length,
    novos: sinais.filter((s) => s.tipo === 'novo_concorrente').length,
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray hover:text-dark transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      {/* Header Card */}
      <div className="bg-card rounded-xl border border-light-gray overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-80 h-64 md:h-auto">
            <img
              src={imovel.imagemUrl}
              alt={imovel.titulo}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="relative flex items-start justify-between mb-4">
              <div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${imovel.isConcorrente ? 'bg-primary/20 text-primary-dark' : 'bg-secondary/20 text-secondary-dark'}`}>
                  {imovel.isConcorrente ? 'Imóvel Concorrente' : 'Seu Imóvel'}
                </span>
                <h2 className="text-xl font-bold text-dark mt-2">{imovel.titulo}</h2>
                <p className="text-sm text-gray flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {imovel.endereco} - {imovel.bairro}, {imovel.cidade}/{imovel.estado}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary text-bg rounded-[10px] text-sm font-bold hover:bg-primary-dark transition-all btn-primary-glow whitespace-nowrap max-sm:absolute max-sm:-top-2 max-sm:right-0">
                <Download className="w-4 h-4" />
                Exportar PDF
              </button>
            </div>

            <div className="flex items-end gap-4 mb-4 max-sm:flex-col max-sm:items-start max-sm:gap-1">
              <p className="text-3xl font-bold text-dark" style={{ fontFamily: 'var(--font-mono)' }}>{formatCurrency(imovel.preco)}</p>
              {imovel.precoAnterior && (
                <p className="text-sm text-gray line-through mb-1">{formatCurrency(imovel.precoAnterior)}</p>
              )}
              <p className="text-sm text-gray mb-1">
                {formatCurrency(meuPrecoPorM2)}/m²
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray">
              <span className="flex items-center gap-1.5"><Ruler className="w-4 h-4" /> {imovel.areaTotal}m² total</span>
              {imovel.quartos > 0 && <span className="flex items-center gap-1.5"><BedDouble className="w-4 h-4" /> {imovel.quartos} quartos</span>}
              {imovel.banheiros > 0 && <span className="flex items-center gap-1.5"><Bath className="w-4 h-4" /> {imovel.banheiros} banheiros</span>}
              {imovel.garagem > 0 && <span className="flex items-center gap-1.5"><Car className="w-4 h-4" /> {imovel.garagem} vagas</span>}
              {imovel.salas > 0 && <span className="flex items-center gap-1.5"><DoorOpen className="w-4 h-4" /> {imovel.salas} salas</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Resumo 30 dias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<TrendingDown className="w-5 h-5 text-warning" />}
          value={sinaisResumidos.alteracoes}
          label="alterações de preço"
          sublabel="nos últimos 30 dias"
        />
        <SummaryCard
          icon={<AlertTriangle className="w-5 h-5 text-info" />}
          value={sinaisResumidos.vendas}
          label="vendas/retiradas"
          sublabel="nos últimos 30 dias"
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-danger" />}
          value={sinaisResumidos.novos}
          label="novos concorrentes"
          sublabel="nos últimos 30 dias"
        />
        <SummaryCard
          icon={
            posicionamento > 0
              ? <TrendingUp className="w-5 h-5 text-primary" />
              : <TrendingDown className="w-5 h-5 text-secondary" />
          }
          value={`${posicionamento > 0 ? '+' : ''}${posicionamento.toFixed(1)}%`}
          label={posicionamento > 0 ? 'acima da mediana' : 'abaixo da mediana'}
          sublabel={`Média concorrente: ${formatCurrency(mediaPrecoPorM2)}/m²`}
          highlight={posicionamento > 15}
        />
      </div>

      {/* Concorrentes Próximos */}
      <div className="bg-card rounded-xl border border-light-gray p-6 card-accent">
        <h3 className="text-base font-semibold text-dark mb-4">
          Concorrentes próximos ({concorrentes.length})
        </h3>
        {concorrentes.length === 0 ? (
          <p className="text-sm text-gray">Nenhum concorrente próximo encontrado com os critérios de comparação.</p>
        ) : (
          <div className="space-y-3">
            {concorrentes.map((conc) => {
              const concPorM2 = conc.preco / conc.areaTotal;
              const diff = ((concPorM2 - meuPrecoPorM2) / meuPrecoPorM2) * 100;
              const concSignals = goldSignals.filter((s) => s.imovelId === conc.id);

              return (
                <div
                  key={conc.id}
                  className="flex items-center gap-4 p-4 bg-surface rounded-xl hover:bg-elevated transition-all"
                >
                  <img
                    src={conc.imagemUrl}
                    alt={conc.titulo}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{conc.titulo}</p>
                    <p className="text-xs text-gray">{conc.imobiliaria} • {conc.areaTotal}m² • {conc.quartos}q • {conc.garagem}v</p>
                    {concSignals.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {concSignals.map((s) => (
                          <span key={s.id} className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${getSignalColor(s.tipo)}`}>
                            {getSignalLabel(s.tipo)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-dark">{formatCurrency(conc.preco)}</p>
                    <p className="text-xs text-gray">{formatCurrency(concPorM2)}/m²</p>
                    <p className={`text-xs font-semibold mt-1 ${diff < 0 ? 'text-secondary' : 'text-danger'}`}>
                      {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sinais Recentes */}
      <div className="bg-card rounded-xl border border-light-gray p-6 card-accent">
        <h3 className="text-base font-semibold text-dark mb-4">
          Gold Signals - Últimos 30 dias ({sinais.length})
        </h3>
        {sinais.length === 0 ? (
          <p className="text-sm text-gray">Nenhum sinal detectado nos últimos 30 dias.</p>
        ) : (
          <div className="space-y-3">
            {sinais.map((signal) => (
              <div key={signal.id} className="flex items-start gap-3 p-3 bg-surface rounded-xl max-sm:flex-col max-sm:items-start max-sm:px-0">
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg whitespace-nowrap ${getSignalColor(signal.tipo)}`}>
                  {getSignalLabel(signal.tipo)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-dark">{signal.descricao}</p>
                  <p className="text-xs text-gray mt-1">{formatDate(signal.data)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumo para proprietário */}
      <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(56,189,248,0.15), rgba(52,211,153,0.1))', border: '1px solid rgba(56,189,248,0.2)' }}>
        <h3 className="text-lg font-bold mb-3 text-dark">📋 Resumo para o proprietário</h3>
        <ul className="space-y-2 text-sm text-gray">
          <li>• {sinaisResumidos.novos} novos concorrentes nos últimos 30 dias</li>
          <li>• {sinaisResumidos.alteracoes} imóveis concorrentes reduziram preço</li>
          <li>• {sinaisResumidos.vendas} imóvel(is) vendido(s) ou retirado(s)</li>
          <li>
            • Seu imóvel está {posicionamento > 0 ? `${posicionamento.toFixed(0)}% acima` : `${Math.abs(posicionamento).toFixed(0)}% abaixo`} da mediana
            (Média: {formatCurrency(mediaPrecoPorM2)}/m²)
          </li>
          <li>• Preço médio por m² dos concorrentes: {formatCurrency(mediaPrecoPorM2)}</li>
        </ul>
      </div>
    </div>
  );
}

function SummaryCard({
  icon,
  value,
  label,
  sublabel,
  highlight,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  sublabel: string;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-card rounded-xl border p-5 metric-hover ${highlight ? 'border-primary' : 'border-light-gray'}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-2xl font-bold text-dark" style={{ fontFamily: 'var(--font-mono)' }}>{value}</span>
      </div>
      <p className="text-sm font-medium text-dark">{label}</p>
      <p className="text-xs text-gray mt-0.5">{sublabel}</p>
    </div>
  );
}
