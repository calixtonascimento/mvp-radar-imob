import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import CadastroPage from './pages/CadastroPage';
import DashboardPage from './pages/DashboardPage';
import MapaPage from './pages/MapaPage';
import AlertasPage from './pages/AlertasPage';
import DossiePage from './pages/DossiePage';
import IntegracoesPage from './pages/IntegracoesPage';
import LogsPage from './pages/LogsPage';

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/mapa" element={<MapaPage />} />
          <Route path="/alertas" element={<AlertasPage />} />
          <Route path="/dossie" element={<DossiePage />} />
          <Route path="/integracoes" element={<IntegracoesPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
