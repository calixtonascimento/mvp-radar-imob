import {
  TrendingDown,
  Users,
  AlertTriangle,
  Home,
  Target,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  dashboardResumo,
  meusImoveis,
  goldSignals,
  formatCurrency,
  getSignalLabel,
  getSignalColor,
  formatDate,
} from '../data/mockData';
import { useNavigate } from 'react-router-dom';

const precoPorBairro = [
  { bairro: 'Barra da Tijuca', meu: 10416, concorrente: 8826 },
  { bairro: 'Recreio', meu: 8090, concorrente: 7600 },
];

const tipoDistribuicao = [
  { name: 'Apartamento', value: 8, color: '#FF5A5F' },
  { name: 'Casa', value: 3, color: '#00A699' },
  { name: 'Cobertura', value: 2, color: '#FFB400' },
  { name: 'Comercial', value: 2, color: '#428BFF' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const alertasRecentes = goldSignals.filter((s) => !s.lido).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          icon={<Users className="w-5 h-5" />}
          label="Novos Concorrentes"
          value={dashboardResumo.novosConcorrentes}
          subtitle="essa semana"
          color="danger"
          trend="+2"
          trendUp
        />
        <KPICard
          icon={<TrendingDown className="w-5 h-5" />}
          label="Reduções de Preço"
          value={dashboardResumo.reducoesPreco}
          subtitle="nos últimos 7 dias"
          color="warning"
          trend="+1"
          trendUp
        />
        <KPICard
          icon={<AlertTriangle className="w-5 h-5" />}
          label="Acima da Média"
          value={dashboardResumo.imoveisAcimaMedia}
          subtitle="dos seus imóveis"
          color="primary"
        />
        <KPICard
          icon={<Home className="w-5 h-5" />}
          label="Meus Imóveis"
          value={dashboardResumo.totalImoveis}
          subtitle="no portfólio"
          color="secondary"
        />
        <KPICard
          icon={<Target className="w-5 h-5" />}
          label="Concorrentes"
          value={dashboardResumo.totalConcorrentes}
          subtitle="monitorados"
          color="info"
        />
        <KPICard
          icon={<Bell className="w-5 h-5" />}
          label="Alertas"
          value={dashboardResumo.totalAlertas}
          subtitle="total gerados"
          color="gray"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preço m² por Bairro */}
        <div className="bg-surface rounded-2xl border border-light-gray p-6">
          <h3 className="text-base font-semibold text-dark mb-4">Preço médio por m² - Seus imóveis vs Concorrentes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={precoPorBairro}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-light-gray)" />
              <XAxis dataKey="bairro" tick={{ fontSize: 12, fill: 'var(--color-gray)' }} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--color-gray)' }} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-light-gray)', backgroundColor: 'var(--color-surface)', color: 'var(--color-dark)' }}
              />
              <Bar dataKey="meu" name="Seus imóveis" fill="#FF5A5F" radius={[6, 6, 0, 0]} />
              <Bar dataKey="concorrente" name="Concorrentes" fill="#00A699" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição por Tipo */}
        <div className="bg-surface rounded-2xl border border-light-gray p-6">
          <h3 className="text-base font-semibold text-dark mb-4">Distribuição por tipo de imóvel</h3>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={tipoDistribuicao}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {tipoDistribuicao.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-light-gray)', backgroundColor: 'var(--color-surface)', color: 'var(--color-dark)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {tipoDistribuicao.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray">{item.name}</span>
                  <span className="text-sm font-semibold text-dark ml-1">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertas Recentes */}
        <div className="bg-surface rounded-2xl border border-light-gray p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-dark">Alertas recentes</h3>
            <button
              onClick={() => navigate('/alertas')}
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              Ver todos →
            </button>
          </div>
          <div className="space-y-3">
            {alertasRecentes.map((signal) => (
              <div
                key={signal.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-bg hover:bg-light-gray/50 transition-colors cursor-pointer"
                onClick={() => navigate('/alertas')}
              >
                <span className={`text-xs font-semibold px-2 py-1 rounded-lg whitespace-nowrap ${getSignalColor(signal.tipo)}`}>
                  {getSignalLabel(signal.tipo)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-dark truncate">{signal.descricao}</p>
                  <p className="text-xs text-gray mt-1">{formatDate(signal.data)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Imóveis do Portfólio */}
        <div className="bg-surface rounded-2xl border border-light-gray p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-dark">Meus imóveis</h3>
            <button
              onClick={() => navigate('/mapa')}
              className="text-sm text-primary hover:text-primary-dark font-medium"
            >
              Ver no mapa →
            </button>
          </div>
          <div className="space-y-3">
            {meusImoveis.slice(0, 4).map((imovel) => (
              <div
                key={imovel.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-bg hover:bg-light-gray/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/dossie?id=${imovel.id}`)}
              >
                <img
                  src={imovel.imagemUrl}
                  alt={imovel.titulo}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark truncate">{imovel.titulo}</p>
                  <p className="text-xs text-gray">{imovel.bairro} • {imovel.areaTotal}m²</p>
                </div>
                <p className="text-sm font-semibold text-dark whitespace-nowrap">
                  {formatCurrency(imovel.preco)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  icon,
  label,
  value,
  subtitle,
  color,
  trend,
  trendUp,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  subtitle: string;
  color: string;
  trend?: string;
  trendUp?: boolean;
}) {
  const colorMap: Record<string, string> = {
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    danger: 'text-danger bg-danger/10',
    warning: 'text-warning bg-warning/10',
    info: 'text-info bg-info/10',
    gray: 'text-gray bg-gray/10',
  };

  return (
    <div className="bg-surface rounded-2xl border border-light-gray p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
          {icon}
        </div>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${trendUp ? 'text-danger' : 'text-secondary'}`}>
            {trendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-dark">{value}</p>
      <p className="text-xs text-gray mt-1">{label} <span className="text-gray/60">• {subtitle}</span></p>
    </div>
  );
}
