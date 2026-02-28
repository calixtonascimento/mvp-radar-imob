import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';

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
    <div className="min-h-screen bg-white flex">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-dark tracking-tight">
              Radar<span className="text-primary">Imob</span>
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-dark mb-2">Bem-vindo de volta</h2>
          <p className="text-gray mb-8">Entre com suas credenciais para acessar o painel</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com.br"
                className="w-full px-4 py-3 border border-light-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                  className="w-full px-4 py-3 border border-light-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-dark"
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
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors duration-150"
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
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary to-primary-dark items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Inteligência competitiva para o mercado imobiliário
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Monitore automaticamente a concorrência, receba alertas em tempo real e tome decisões
            estratégicas baseadas em dados.
          </p>
          <div className="space-y-4">
            {[
              'Mapa de comparação competitiva',
              'Alertas de movimentação do mercado',
              'Dossiê completo por imóvel',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/90 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
