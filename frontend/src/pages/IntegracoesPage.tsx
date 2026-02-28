import { useState } from 'react';
import {
  Settings,
  Plus,
  RefreshCw,
  Trash2,
  Edit3,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import {
  integracoes,
  formatDateTime,
} from '../data/mockData';
import type { Integracao } from '../types';

const statusConfig: Record<Integracao['status'], { icon: React.ReactNode; label: string; color: string }> = {
  ativo: {
    icon: <CheckCircle className="w-4 h-4" />,
    label: 'Ativo',
    color: 'text-success bg-success/10',
  },
  inativo: {
    icon: <XCircle className="w-4 h-4" />,
    label: 'Inativo',
    color: 'text-gray bg-gray/10',
  },
  erro: {
    icon: <AlertCircle className="w-4 h-4" />,
    label: 'Erro',
    color: 'text-danger bg-danger/10',
  },
};

export default function IntegracoesPage() {
  const [showModal, setShowModal] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);

  const handleSync = (id: string) => {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray">
          Gerencie suas integrações de dados de imóveis
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Integração
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Settings className="w-5 h-5 text-info mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-dark mb-1">Como funciona a integração?</h4>
            <p className="text-sm text-gray">
              Conecte seu feed XML de imóveis para sincronizar automaticamente seu portfólio.
              A sincronização acontece diariamente às 06:00 e pode ser executada manualmente a qualquer momento.
            </p>
          </div>
        </div>
      </div>

      {/* Integrations List */}
      <div className="space-y-4">
        {integracoes.map((integ) => {
          const status = statusConfig[integ.status];
          return (
            <div key={integ.id} className="bg-white rounded-2xl border border-light-gray p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-bg rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-gray" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-dark">Feed XML</h3>
                      <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-lg ${status.color}`}>
                        {status.icon}
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray mt-0.5 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {integ.url}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSync(integ.id)}
                    disabled={syncing === integ.id}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors
                      ${syncing === integ.id
                        ? 'bg-light-gray text-gray cursor-not-allowed'
                        : 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                      }
                    `}
                  >
                    <RefreshCw className={`w-4 h-4 ${syncing === integ.id ? 'animate-spin' : ''}`} />
                    {syncing === integ.id ? 'Sincronizando...' : 'Sincronizar'}
                  </button>
                  <button className="p-2 text-gray hover:text-dark hover:bg-bg rounded-xl transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray hover:text-danger hover:bg-danger/10 rounded-xl transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-light-gray">
                <div>
                  <p className="text-xs text-gray mb-1">Última sincronização</p>
                  <p className="text-sm font-medium text-dark">{formatDateTime(integ.ultimaSincronizacao)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray mb-1">Total de imóveis</p>
                  <p className="text-sm font-medium text-dark">{integ.totalImoveis}</p>
                </div>
                <div>
                  <p className="text-xs text-gray mb-1">Tipo</p>
                  <p className="text-sm font-medium text-dark uppercase">{integ.tipo}</p>
                </div>
                <div>
                  <p className="text-xs text-gray mb-1">Frequência</p>
                  <p className="text-sm font-medium text-dark">Diária (06:00)</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6">
            <h3 className="text-lg font-bold text-dark mb-4">Nova Integração</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">Tipo de integração</label>
                <select className="w-full px-4 py-3 border border-light-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <option value="xml">Feed XML</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">URL do Feed</label>
                <input
                  type="url"
                  placeholder="https://seusite.com.br/feed/imoveis.xml"
                  className="w-full px-4 py-3 border border-light-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-light-gray rounded-xl text-sm font-medium text-dark hover:bg-bg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Salvar Integração
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
