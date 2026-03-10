import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Radar, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #38bdf8, #34d399)' }}>
              <Radar className="w-4.5 h-4.5 text-bg" strokeWidth={2.5} />
            </div>
            <h1 className="text-[1.2rem] font-black text-dark" style={{ letterSpacing: '-0.5px' }}>
              Clarity<span className="text-primary">Imob</span>
            </h1>
          </div>

          <h2 className="text-2xl font-black text-dark mb-2" style={{ letterSpacing: '-0.5px' }}>Bem-vindo de volta</h2>
          <p className="text-gray mb-8">Entre com suas credenciais para acessar o painel</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com.br"
                className="w-full px-4 py-3.5 bg-surface border-[1.5px] border-light-gray rounded-[10px] text-[0.9rem] text-dark placeholder:text-muted focus:outline-none focus:border-primary transition-all"
                style={{ boxShadow: 'none' }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 bg-surface border-[1.5px] border-light-gray rounded-[10px] text-[0.9rem] text-dark placeholder:text-muted focus:outline-none focus:border-primary transition-all"
                  style={{ boxShadow: 'none' }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.1)'}
                  onBlur={(e) => e.target.style.boxShadow = 'none'}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-dark transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray cursor-pointer">
                <input type="checkbox" className="rounded border-light-gray accent-primary" />
                Lembrar de mim
              </label>
              <a href="#" className="text-sm text-primary hover:text-primary-dark font-medium">
                Esqueci a senha
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-bg font-bold py-3.5 rounded-[10px] transition-all duration-250 btn-primary-glow"
            >
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-gray mt-8">
            Não tem uma conta?{' '}
            <Link to="/cadastro" className="text-primary hover:text-primary-dark font-medium">
              Cadastre-se gratuitamente
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-card) 50%, var(--color-surface) 100%)' }}>
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-primary text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.2)', fontFamily: 'var(--font-mono)' }}>
            Inteligência Competitiva
          </span>
          <h2 className="text-4xl font-black text-dark mb-6 leading-tight" style={{ letterSpacing: '-0.8px' }}>
            Monitore o mercado imobiliário com{' '}
            <span className="text-primary">dados em tempo real</span>
          </h2>
          <p className="text-gray text-lg mb-8 leading-relaxed">
            Monitore automaticamente a concorrência, receba alertas estratégicos e tome decisões
            baseadas em dados concretos.
          </p>
          <div className="space-y-4">
            {[
              'Mapa de comparação competitiva',
              'Alertas de movimentação do mercado',
              'Dossiê completo por imóvel',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.15)' }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="#34d399" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
