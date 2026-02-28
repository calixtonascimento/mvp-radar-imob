import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import {
  meusImoveis,
  imoveisConcorrentes,
  formatCurrency,
  goldSignals,
  getSignalLabel,
  bairros,
} from '../data/mockData';
import type { Imovel, GoldSignal } from '../types';

// Custom icons
const myIcon = new L.DivIcon({
  html: `<div style="background:#00A699;width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const concorrenteIcon = new L.DivIcon({
  html: `<div style="background:#FF5A5F;width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const concorrenteAlertIcon = new L.DivIcon({
  html: `<div style="position:relative;">
    <div style="background:#FF5A5F;width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
    </div>
    <div style="position:absolute;top:-8px;right:-8px;background:#FFB400;color:white;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;">!</div>
  </div>`,
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const myAlertIcon = new L.DivIcon({
  html: `<div style="position:relative;">
    <div style="background:#00A699;width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
    </div>
    <div style="position:absolute;top:-8px;right:-8px;background:#FFB400;color:white;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;">!</div>
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

export default function MapaPage() {
  const navigate = useNavigate();
  const [bairroFilter, setBairroFilter] = useState<string>('');
  const [tipoFilter, setTipoFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const todosImoveis = useMemo(() => {
    let imoveis = [...meusImoveis, ...imoveisConcorrentes];
    if (bairroFilter) {
      imoveis = imoveis.filter((i) => i.bairro === bairroFilter);
    }
    if (tipoFilter) {
      imoveis = imoveis.filter((i) => i.tipo === tipoFilter);
    }
    return imoveis;
  }, [bairroFilter, tipoFilter]);

  const center: [number, number] = [-23.004, -43.365];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-4">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface border border-light-gray rounded-xl text-sm font-medium text-dark hover:bg-bg transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filtros
        </button>

        {showFilters && (
          <>
            <select
              value={bairroFilter}
              onChange={(e) => setBairroFilter(e.target.value)}
              className="px-4 py-2.5 bg-surface border border-light-gray rounded-xl text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Todos os bairros</option>
              {bairros.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <select
              value={tipoFilter}
              onChange={(e) => setTipoFilter(e.target.value)}
              className="px-4 py-2.5 bg-surface border border-light-gray rounded-xl text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Todos os tipos</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="cobertura">Cobertura</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </>
        )}

        {/* Legend */}
        <div className="ml-auto flex items-center gap-4 text-xs text-gray">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary" /> Seus imóveis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary" /> Concorrentes
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-warning" /> Com alertas
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-light-gray shadow-sm">
        <MapContainer center={center} zoom={14} className="h-full w-full" scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {todosImoveis.map((imovel) => {
            const signals = getImovelSignals(imovel.id);
            return (
              <Marker
                key={imovel.id}
                position={[imovel.latitude, imovel.longitude]}
                icon={getIconForImovel(imovel)}
              >
                <Popup>
                  <div className="min-w-[240px] p-1">
                    <div className="flex items-start gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${imovel.isConcorrente ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
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
                    <button
                      onClick={() => navigate(`/dossie?id=${imovel.id}`)}
                      className="mt-3 w-full text-xs bg-primary text-white py-1.5 rounded-lg font-medium hover:bg-primary-dark transition-colors"
                    >
                      Ver Dossiê
                    </button>
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
