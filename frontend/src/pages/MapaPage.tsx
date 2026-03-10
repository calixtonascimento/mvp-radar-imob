import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import {
  meusImoveis,
  imoveisConcorrentes,
  formatCurrency,
  goldSignals,
  getSignalLabel,
  estados,
  getCidadesPorEstado,
  getBairrosPorCidade,
} from '../data/mockData';
import type { Imovel, GoldSignal } from '../types';

// Custom icons
const myIcon = new L.DivIcon({
  html: `<div style="background:#34d399;width:32px;height:32px;border-radius:50%;border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px rgba(52,211,153,0.4),0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#060a13" stroke="#060a13" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const concorrenteIcon = new L.DivIcon({
  html: `<div style="background:#f87171;width:32px;height:32px;border-radius:50%;border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px rgba(248,113,113,0.4),0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#060a13" stroke="#060a13" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const concorrenteAlertIcon = new L.DivIcon({
  html: `<div style="position:relative;">
    <div style="background:#f87171;width:32px;height:32px;border-radius:50%;border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px rgba(248,113,113,0.4),0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#060a13" stroke="#060a13" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
    </div>
    <div style="position:absolute;top:-8px;right:-8px;background:#fbbf24;color:#060a13;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.9);">!</div>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const myAlertIcon = new L.DivIcon({
  html: `<div style="position:relative;">
    <div style="background:#34d399;width:32px;height:32px;border-radius:50%;border:3px solid rgba(255,255,255,0.9);box-shadow:0 0 12px rgba(52,211,153,0.4),0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#060a13" stroke="#060a13" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
    </div>
    <div style="position:absolute;top:-8px;right:-8px;background:#fbbf24;color:#060a13;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid rgba(255,255,255,0.9);">!</div>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function getImovelSignals(imovelId: string): GoldSignal[] {
  return goldSignals.filter((s) => s.imovelId === imovelId);
}

function getIconForImovel(imovel: Imovel): L.DivIcon {
  const signals = getImovelSignals(imovel.id);
  if (imovel.isConcorrente) {
    return signals.length > 0 ? concorrenteAlertIcon : concorrenteIcon;
  }
  return signals.length > 0 ? myAlertIcon : myIcon;
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

export default function MapaPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [estadoFilter, setEstadoFilter] = useState<string>('');
  const [cidadeFilter, setCidadeFilter] = useState<string>('');
  const [bairroFilter, setBairroFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Highlight a specific property when coming from Alertas page
  const highlightId = searchParams.get('highlight');

  const cidadesDisponiveis = useMemo(() => {
    return estadoFilter ? getCidadesPorEstado(estadoFilter) : [];
  }, [estadoFilter]);

  const bairrosDisponiveis = useMemo(() => {
    return cidadeFilter ? getBairrosPorCidade(cidadeFilter) : [];
  }, [cidadeFilter]);

  const todosImoveis = useMemo(() => {
    let imoveis = [...meusImoveis, ...imoveisConcorrentes];
    if (estadoFilter) {
      imoveis = imoveis.filter((i) => i.estado === estadoFilter);
    }
    if (cidadeFilter) {
      imoveis = imoveis.filter((i) => i.cidade === cidadeFilter);
    }
    if (bairroFilter) {
      imoveis = imoveis.filter((i) => i.bairro === bairroFilter);
    }
    return imoveis;
  }, [estadoFilter, cidadeFilter, bairroFilter]);

  const { center, zoom } = useMemo(() => {
    if (highlightId) {
      const allImoveis = [...meusImoveis, ...imoveisConcorrentes];
      const target = allImoveis.find((i) => i.id === highlightId);
      if (target) {
        return { center: [target.latitude, target.longitude] as [number, number], zoom: 16 };
      }
    }
    if (todosImoveis.length > 0) {
      const avgLat = todosImoveis.reduce((sum, i) => sum + i.latitude, 0) / todosImoveis.length;
      const avgLng = todosImoveis.reduce((sum, i) => sum + i.longitude, 0) / todosImoveis.length;
      return { center: [avgLat, avgLng] as [number, number], zoom: 14 };
    }
    return { center: [-23.004, -43.365] as [number, number], zoom: 14 };
  }, [todosImoveis, highlightId]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 bg-card border border-light-gray rounded-[10px] text-sm font-medium text-dark hover:border-border transition-all"
        >
          <Filter className="w-4 h-4" />
          Filtros
        </button>

        {showFilters && (
          <>
            <select
              value={estadoFilter}
              onChange={(e) => {
                setEstadoFilter(e.target.value);
                setCidadeFilter('');
                setBairroFilter('');
              }}
              className="px-4 py-2.5 bg-surface border-[1.5px] border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary"
            >
              <option value="">Todos os estados</option>
              {estados.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>

            <select
              value={cidadeFilter}
              onChange={(e) => {
                setCidadeFilter(e.target.value);
                setBairroFilter('');
              }}
              disabled={!estadoFilter}
              className="px-4 py-2.5 bg-surface border-[1.5px] border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary disabled:opacity-50"
            >
              <option value="">Todas as cidades</option>
              {cidadesDisponiveis.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={bairroFilter}
              onChange={(e) => setBairroFilter(e.target.value)}
              disabled={!cidadeFilter}
              className="px-4 py-2.5 bg-surface border-[1.5px] border-light-gray rounded-[10px] text-sm text-dark focus:outline-none focus:border-primary disabled:opacity-50"
            >
              <option value="">Todos os bairros</option>
              {bairrosDisponiveis.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </>
        )}

        {/* Legend */}
        <div className="ml-auto flex items-center gap-4 text-xs text-gray">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary" /> Seus imóveis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-danger" /> Concorrentes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-warning" /> Com alertas
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 rounded-xl overflow-hidden border border-light-gray">
        <MapContainer center={center} zoom={zoom} className="h-full w-full" scrollWheelZoom>
          <MapUpdater center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {todosImoveis.map((imovel) => {
            const signals = getImovelSignals(imovel.id);
            const isHighlighted = highlightId === imovel.id;
            return (
              <Marker
                key={imovel.id}
                position={[imovel.latitude, imovel.longitude]}
                icon={getIconForImovel(imovel)}
                ref={(ref) => {
                  if (ref && isHighlighted) {
                    setTimeout(() => ref.openPopup(), 300);
                  }
                }}
              >
                <Popup>
                  <div className="min-w-60 p-1">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${imovel.isConcorrente ? 'bg-danger/10 text-danger' : 'bg-secondary/10 text-secondary'}`}>
                        {imovel.isConcorrente ? 'Concorrente' : 'Seu imóvel'}
                      </span>
                    </div>
                    <h4 className="font-semibold text-sm text-dark mb-1">{imovel.titulo}</h4>
                    <p className="text-xs text-gray mb-2">{imovel.endereco}</p>
                    <p className="text-base font-bold text-dark mb-1">{formatCurrency(imovel.preco)}</p>
                    {imovel.precoAnterior && (
                      <p className="text-xs text-warning font-medium mb-2">
                        Antes: {formatCurrency(imovel.precoAnterior)} ({(((imovel.preco - imovel.precoAnterior) / imovel.precoAnterior) * 100).toFixed(1)}%)
                      </p>
                    )}
                    <div className="flex gap-3 text-xs text-gray mb-2">
                      <span>{imovel.areaTotal}m²</span>
                      {imovel.quartos > 0 && <span>{imovel.quartos} quartos</span>}
                      {imovel.garagem > 0 && <span>{imovel.garagem} vagas</span>}
                    </div>
                    {imovel.imobiliaria && (
                      <p className="text-xs text-gray mb-2">🏢 {imovel.imobiliaria}</p>
                    )}
                    {signals.length > 0 && (
                      <div className="border-t border-light-gray pt-2 mt-2 space-y-1">
                        {signals.map((s) => (
                          <p key={s.id} className="text-[11px] text-warning font-medium">
                            ⚡ {getSignalLabel(s.tipo)}
                          </p>
                        ))}
                      </div>
                    )}
                    {!imovel.isConcorrente && (
                      <button
                        onClick={() => navigate(`/dossie?id=${imovel.id}`)}
                        className="mt-3 w-full text-xs bg-primary text-bg py-1.5 rounded-lg font-bold hover:bg-primary-dark transition-all"
                      >
                        Ver Dossiê
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
