import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';

export default function CadastroPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left - Hero */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-secondary to-secondary-dark items-center justify-center p-12">
        <div className="max-w-lg text-white">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Comece a monitorar sua concorrência hoje
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Configure em minutos e tenha visibilidade total sobre o mercado ao redor dos seus imóveis.
          </p>
          <div className="grid grid-cols-2 gap-6 mt-10">
            {[
              { value: 'R$ 250', label: 'A partir de /mês' },
              { value: '50+', label: 'Imóveis monitorados' },
              { value: '24h', label: 'Atualização diária' },
              { value: '∞', label: 'Alertas ilimitados' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 rounded-2xl p-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form */}
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

          <h2 className="text-2xl font-bold text-dark mb-2">Crie sua conta</h2>
          <p className="text-gray mb-8">Preencha os dados para começar</p>

          <form onSubmit={handleCadastro} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Nome completo</label>
              <input
                type="text"
                placeholder="Seu nome"
                className="w-full px-4 py-3 border border-light-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Nome da imobiliária</label>
              <input
                type="text"
                placeholder="Imobiliária ou corretor"
                className="w-full px-4 py-3 border border-light-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com.br"
                className="w-full px-4 py-3 border border-light-gray rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Senha</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
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

            <div className="pt-2">
              <label className="flex items-start gap-2 text-sm text-gray cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-light-gray accent-primary" />
                <span>Concordo com os <a href="#" className="text-primary">Termos de Uso</a> e <a href="#" className="text-primary">Política de Privacidade</a></span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-colors duration-150 mt-2"
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
