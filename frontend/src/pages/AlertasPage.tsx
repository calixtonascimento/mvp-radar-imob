import { useState } from 'react';
import {
  Bell,
  TrendingDown,
  UserPlus,
  ShoppingCart,
  AlertTriangle,
  Clock,
  Check,
  Filter,
} from 'lucide-react';
import {
  goldSignals,
  formatDate,
  getSignalLabel,
  getSignalColor,
  formatCurrency,
} from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import type { GoldSignal } from '../types';

const filterOptions: { value: GoldSignal['tipo'] | ''; label: string; icon: React.ReactNode }[] = [
  { value: '', label: 'Todos', icon: <Bell className="w-4 h-4" /> },
  { value: 'alteracao_preco', label: 'Preço', icon: <TrendingDown className="w-4 h-4" /> },
  { value: 'novo_concorrente', label: 'Novo Concorrente', icon: <UserPlus className="w-4 h-4" /> },
  { value: 'venda_retirada', label: 'Venda/Retirada', icon: <ShoppingCart className="w-4 h-4" /> },
  { value: 'acima_mercado', label: 'Acima do Mercado', icon: <AlertTriangle className="w-4 h-4" /> },
  { value: 'sem_alteracao', label: 'Sem Alteração', icon: <Clock className="w-4 h-4" /> },
];

const signalIcons: Record<GoldSignal['tipo'], React.ReactNode> = {
  alteracao_preco: <TrendingDown className="w-5 h-5" />,
  novo_concorrente: <UserPlus className="w-5 h-5" />,
  venda_retirada: <ShoppingCart className="w-5 h-5" />,
  acima_mercado: <AlertTriangle className="w-5 h-5" />,
  sem_alteracao: <Clock className="w-5 h-5" />,
};

export default function AlertasPage() {
  const navigate = useNavigate();
  const [filtroTipo, setFiltroTipo] = useState<GoldSignal['tipo'] | ''>('');
  const [filtroLido, setFiltroLido] = useState<'todos' | 'lidos' | 'nao_lidos'>('todos');

  const alertasFiltrados = goldSignals
    .filter((s) => !filtroTipo || s.tipo === filtroTipo)
    .filter((s) => {
      if (filtroLido === 'lidos') return s.lido;
      if (filtroLido === 'nao_lidos') return !s.lido;
      return true;
    })
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const naoLidos = goldSignals.filter((s) => !s.lido).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray">
            {naoLidos} alertas não lidos • {goldSignals.length} total
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-card border border-light-gray rounded-[10px] text-sm font-medium text-dark hover:border-border transition-all">
          <Check className="w-4 h-4" />
          Marcar todos como lidos
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFiltroTipo(opt.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all
              ${filtroTipo === opt.value
                ? 'bg-primary text-bg'
                : 'bg-card border border-light-gray text-gray hover:border-border hover:text-dark'
              }`}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray" />
          <select
            value={filtroLido}
            onChange={(e) => setFiltroLido(e.target.value as typeof filtroLido)}
            className="px-3 py-2 bg-surface border border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary"
          >
            <option value="todos">Todos</option>
            <option value="nao_lidos">Não lidos</option>
            <option value="lidos">Lidos</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alertasFiltrados.length === 0 ? (
          <div className="bg-card rounded-xl border border-light-gray p-12 text-center">
            <Bell className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-gray text-sm">Nenhum alerta encontrado com os filtros selecionados</p>
          </div>
        ) : (
          alertasFiltrados.map((signal) => (
            <div
              key={signal.id}
              className={`bg-card rounded-xl border border-light-gray p-5 hover:border-border transition-all cursor-pointer card-accent
                ${!signal.lido ? 'border-l-4 border-l-primary' : ''}
              `}
              onClick={() => navigate(`/dossie?id=${signal.imovelId}`)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${getSignalColor(signal.tipo)}`}>
                  {signalIcons[signal.tipo]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getSignalColor(signal.tipo)}`}>
                      {getSignalLabel(signal.tipo)}
                    </span>
                    <span className="text-xs text-gray">{signal.bairro}</span>
                    {!signal.lido && (
                      <span className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-dark mb-1">{signal.imovelTitulo}</p>
                  <p className="text-sm text-gray">{signal.descricao}</p>
                  {signal.valor && signal.valorAnterior && (
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray line-through">{formatCurrency(signal.valorAnterior)}</span>
                      <span className="text-sm font-semibold text-dark">{formatCurrency(signal.valor)}</span>
                      <span className="text-xs font-semibold text-secondary">
                        {(((signal.valor - signal.valorAnterior) / signal.valorAnterior) * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray">{formatDate(signal.data)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
