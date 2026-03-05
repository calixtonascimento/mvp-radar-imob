import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  Minus,
} from 'lucide-react';
import {
  logsIntegracao,
  formatDateTime,
} from '../data/mockData';
import type { LogIntegracao } from '../types';

const statusConfig: Record<LogIntegracao['status'], { icon: React.ReactNode; label: string; color: string }> = {
  sucesso: {
    icon: <CheckCircle className="w-4 h-4" />,
    label: 'Sucesso',
    color: 'text-success bg-success/10',
  },
  erro: {
    icon: <XCircle className="w-4 h-4" />,
    label: 'Erro',
    color: 'text-danger bg-danger/10',
  },
  parcial: {
    icon: <AlertCircle className="w-4 h-4" />,
    label: 'Parcial',
    color: 'text-warning bg-warning/10',
  },
};

export default function LogsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <p className="text-sm text-gray">
        Histórico de sincronizações do seu feed de imóveis
      </p>

      {/* Timeline */}
      <div className="space-y-4">
        {logsIntegracao.map((log) => {
          const status = statusConfig[log.status];
          return (
            <div
              key={log.id}
              className={`bg-card rounded-xl border border-light-gray p-5 ${
                log.status === 'erro' ? 'border-l-4 border-l-danger' :
                log.status === 'parcial' ? 'border-l-4 border-l-warning' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg ${status.color}`}>
                    {status.icon}
                    {status.label}
                  </span>
                  <span className="text-sm text-gray">{formatDateTime(log.data)}</span>
                </div>
              </div>

              <p className="text-sm text-dark mb-4">{log.mensagem}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <LogStat
                  icon={<ArrowUpCircle className="w-4 h-4 text-success" />}
                  label="Entraram"
                  value={log.imoveisEntrada}
                  color={log.imoveisEntrada > 0 ? 'text-success' : 'text-gray'}
                />
                <LogStat
                  icon={<ArrowDownCircle className="w-4 h-4 text-danger" />}
                  label="Saíram"
                  value={log.imoveisSaida}
                  color={log.imoveisSaida > 0 ? 'text-danger' : 'text-gray'}
                />
                <LogStat
                  icon={<RefreshCw className="w-4 h-4 text-warning" />}
                  label="Atualizados"
                  value={log.imoveisAtualizados}
                  color={log.imoveisAtualizados > 0 ? 'text-warning' : 'text-gray'}
                />
                <LogStat
                  icon={<Minus className="w-4 h-4 text-gray" />}
                  label="Mantidos"
                  value={log.imoveisMantidos}
                  color="text-gray"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LogStat({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-surface rounded-xl p-3 flex items-center gap-2">
      {icon}
      <div>
        <p className={`text-lg font-bold ${color}`} style={{ fontFamily: 'var(--font-mono)' }}>{value}</p>
        <p className="text-xs text-gray">{label}</p>
      </div>
    </div>
  );
}
