import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Radar, Eye, EyeOff } from 'lucide-react';

export default function CadastroPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-12" style={{ background: 'linear-gradient(135deg, #0c1220 0%, #111827 50%, #0c1220 100%)' }}>
        <div className="max-w-lg">
          <span className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)', fontFamily: 'var(--font-mono)' }}>
            Comece Agora
          </span>
          <h2 className="text-4xl font-black text-dark mb-6 leading-tight" style={{ letterSpacing: '-0.8px' }}>
            Monitore sua concorrência com{' '}
            <span className="text-secondary">inteligência</span>
          </h2>
          <p className="text-gray text-lg mb-8 leading-relaxed">
            Configure em minutos e tenha visibilidade total sobre o mercado ao redor dos seus imóveis.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { value: 'R$ 250', label: 'A partir de /mês' },
              { value: '50+', label: 'Imóveis monitorados' },
              { value: '24h', label: 'Atualização diária' },
              { value: '∞', label: 'Alertas ilimitados' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-xl p-4 border border-light-gray card-accent">
                <p className="text-2xl font-bold text-dark" style={{ fontFamily: 'var(--font-mono)' }}>{stat.value}</p>
                <p className="text-muted text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
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

          <h2 className="text-2xl font-black text-dark mb-2" style={{ letterSpacing: '-0.5px' }}>Crie sua conta</h2>
          <p className="text-gray mb-8">Preencha os dados para começar</p>

          <form onSubmit={handleCadastro} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Nome completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-3.5 bg-surface border-[1.5px] border-light-gray rounded-[10px] text-[0.9rem] text-dark placeholder:text-muted focus:outline-none focus:border-primary transition-all"
                style={{ boxShadow: 'none' }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Nome da imobiliária</label>
              <input
                type="text"
                placeholder="Imobiliária ou corretor"
                className="w-full px-4 py-3.5 bg-surface border-[1.5px] border-light-gray rounded-[10px] text-[0.9rem] text-dark placeholder:text-muted focus:outline-none focus:border-primary transition-all"
                style={{ boxShadow: 'none' }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(56,189,248,0.1)'}
                onBlur={(e) => e.target.style.boxShadow = 'none'}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">E-mail</label>
              <input
                type="email"
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
                  placeholder="Mínimo 8 caracteres"
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

            <div className="pt-2">
              <label className="flex items-start gap-2 text-sm text-gray cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-light-gray accent-primary" />
                <span>Concordo com os <a href="#" className="text-primary">Termos de Uso</a> e <a href="#" className="text-primary">Política de Privacidade</a></span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-bg font-bold py-3.5 rounded-[10px] transition-all duration-250 btn-primary-glow mt-2"
            >
              Criar conta
            </button>
          </form>

          <p className="text-center text-sm text-gray mt-8">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
