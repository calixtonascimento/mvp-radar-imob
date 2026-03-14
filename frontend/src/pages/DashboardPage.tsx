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
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';
import {
  dashboardResumo,
} from '../data/mockData';
import { useDeviceType } from '../utils/useDeviceType';

const tipoDistribuicao = [
  { name: 'Apartamento', value: 8, color: '#38bdf8' },
  { name: 'Casa', value: 3, color: '#34d399' },
  { name: 'Cobertura', value: 2, color: '#fbbf24' },
  { name: 'Comercial', value: 2, color: '#f87171' },
];

export default function DashboardPage() {
  const { isMobile } = useDeviceType();

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
        {/* Distribuição por Tipo */}
        <div className="bg-card rounded-xl border border-light-gray p-6 card-accent">
          <h3 className="text-base font-semibold text-dark mb-4">Distribuição por tipo de imóvel</h3>
          <div className="flex items-center max-sm:flex-col">
            <ResponsiveContainer width={isMobile ? '100%' : '50%'} height={250}>
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
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-light-gray)', backgroundColor: 'var(--color-card)', color: 'var(--color-dark)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 max-sm:w-full">
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
    <div className="bg-card rounded-xl border border-light-gray p-5 metric-hover">
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
      <p className="text-2xl font-bold text-dark" style={{ fontFamily: 'var(--font-mono)' }}>{value}</p>
      <p className="text-xs text-gray mt-1">{label} <span className="text-muted">• {subtitle}</span></p>
    </div>
  );
}
