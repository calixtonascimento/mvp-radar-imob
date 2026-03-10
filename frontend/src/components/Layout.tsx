import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Bell,
  FileText,
  Settings,
  ScrollText,
  Menu,
  X,
  LogOut,
  Radar,
  Sun,
  Moon,
} from 'lucide-react';
import { currentUser, goldSignals } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/mapa', icon: Map, label: 'Mapa' },
  { to: '/alertas', icon: Bell, label: 'Alertas' },
  { to: '/dossie', icon: FileText, label: 'Dossiê' },
  { to: '/integracoes', icon: Settings, label: 'Integrações' },
  { to: '/logs', icon: ScrollText, label: 'Logs' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const naoLidos = goldSignals.filter((s) => !s.lido).length;

  const isAuthPage = location.pathname === '/login' || location.pathname === '/cadastro';
  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-light-gray
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-light-gray">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #38bdf8, #34d399)' }}>
            <Radar className="w-4.5 h-4.5 text-bg" strokeWidth={2.5} />
          </div>
          <h1 className="text-[1.2rem] font-black text-dark tracking-tight" style={{ letterSpacing: '-0.5px' }}>
            Clarity<span className="text-primary">Imob</span>
          </h1>
          <button
            className="lg:hidden ml-auto p-1 hover:bg-elevated rounded-lg transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-gray" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted hover:text-dark hover:bg-elevated'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.label === 'Alertas' && (
                <span className="ml-auto bg-primary text-bg text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  5
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-light-gray">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/15 rounded-full flex items-center justify-center text-primary font-bold text-sm">
              {currentUser.nome.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark truncate">{currentUser.nome}</p>
              <p className="text-xs text-muted truncate">{currentUser.empresa}</p>
            </div>
            <button className="p-1.5 hover:bg-elevated rounded-lg text-muted hover:text-primary transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-surface border-b border-light-gray px-4 lg:px-8 py-4 flex items-center gap-4"
          style={{ backdropFilter: 'blur(20px) saturate(1.5)' }}>
          <button
            className="lg:hidden p-2 hover:bg-elevated rounded-xl transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-dark" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-dark">
              {navItems.find((n) => n.to === location.pathname)?.label || 'ClarityImob'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-elevated rounded-xl transition-colors text-gray hover:text-dark"
              title={theme === 'light' ? 'Tema escuro' : 'Tema claro'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <NavLink
              to="/alertas"
              className="relative p-2 hover:bg-elevated rounded-xl transition-colors text-gray hover:text-dark"
            >
              <Bell className="w-5 h-5" />
              {naoLidos > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-bg text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {naoLidos}
                </span>
              )}
            </NavLink>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(52, 211, 153, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(52, 211, 153, 0.2)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.5px',
                textTransform: 'uppercase' as const,
              }}>
              {currentUser.plano}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
