import type {
  Imovel,
  GoldSignal,
  Integracao,
  LogIntegracao,
  DashboardResumo,
  User,
} from "../types";

// ============================
// USUÁRIO LOGADO
// ============================
export const currentUser: User = {
  id: "u1",
  nome: "Carlos Mendes",
  email: "carlos@imobiliariamendes.com.br",
  empresa: "Imobiliária Mendes & Associados",
  plano: "profissional",
};

// ============================
// IMÓVEIS DA IMOBILIÁRIA
// ============================
export const meusImoveis: Imovel[] = [
  {
    id: "own-1",
    titulo: "Apartamento 3 quartos - Vista Mar",
    endereco: "Rua das Palmeiras, 450, Apt 801",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.0005,
    longitude: -43.365,
    preco: 1250000,
    areaTotal: 120,
    areaPrivativa: 95,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 3,
    salas: 2,
    banheiros: 2,
    garagem: 2,
    isConcorrente: false,
    dataCadastro: "2025-11-15",
    ultimaAtualizacao: "2025-11-15",
    imagemUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
  },
  {
    id: "own-2",
    titulo: "Casa 4 quartos com piscina",
    endereco: "Rua Sérgio Porto, 120",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.0025,
    longitude: -43.36,
    preco: 2100000,
    areaTotal: 280,
    areaPrivativa: 220,
    tipo: "casa",
    finalidade: "residencial",
    quartos: 4,
    salas: 3,
    banheiros: 4,
    garagem: 3,
    isConcorrente: false,
    dataCadastro: "2025-10-02",
    ultimaAtualizacao: "2025-12-01",
    imagemUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
  },
  {
    id: "own-3",
    titulo: "Cobertura Duplex Luxo",
    endereco: "Av. Lúcio Costa, 3200",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.0045,
    longitude: -43.368,
    preco: 3500000,
    areaTotal: 350,
    areaPrivativa: 280,
    tipo: "cobertura",
    finalidade: "residencial",
    quartos: 5,
    salas: 3,
    banheiros: 5,
    garagem: 4,
    isConcorrente: false,
    dataCadastro: "2025-09-20",
    ultimaAtualizacao: "2025-09-20",
    imagemUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
  },
  {
    id: "own-4",
    titulo: "Apartamento 2 quartos reformado",
    endereco: "Rua Mário Covas, 88, Apt 302",
    bairro: "Recreio dos Bandeirantes",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.015,
    longitude: -43.445,
    preco: 680000,
    areaTotal: 75,
    areaPrivativa: 62,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 2,
    salas: 1,
    banheiros: 1,
    garagem: 1,
    isConcorrente: false,
    dataCadastro: "2025-12-10",
    ultimaAtualizacao: "2026-01-05",
    imagemUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
  },
  {
    id: "own-5",
    titulo: "Sala Comercial 60m²",
    endereco: "Av. das Américas, 4200, Sala 1205",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -22.999,
    longitude: -43.355,
    preco: 420000,
    areaTotal: 60,
    tipo: "comercial",
    finalidade: "comercial",
    quartos: 0,
    salas: 2,
    banheiros: 1,
    garagem: 1,
    isConcorrente: false,
    dataCadastro: "2025-08-01",
    ultimaAtualizacao: "2025-08-01",
    imagemUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
  },
  {
    id: "own-6",
    titulo: "Apartamento 3 quartos - Novo",
    endereco: "Rua Cel. Pedro Correia, 55",
    bairro: "Recreio dos Bandeirantes",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.017,
    longitude: -43.45,
    preco: 890000,
    areaTotal: 110,
    areaPrivativa: 85,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 3,
    salas: 2,
    banheiros: 2,
    garagem: 2,
    isConcorrente: false,
    dataCadastro: "2026-01-15",
    ultimaAtualizacao: "2026-02-20",
    imagemUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
  },
];

// ============================
// IMÓVEIS CONCORRENTES
// ============================
export const imoveisConcorrentes: Imovel[] = [
  {
    id: "conc-1",
    titulo: "Apartamento 3 quartos - Sol da Manhã",
    endereco: "Rua das Palmeiras, 320",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.001,
    longitude: -43.364,
    preco: 1180000,
    precoAnterior: 1280000,
    areaTotal: 115,
    areaPrivativa: 90,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 3,
    salas: 2,
    banheiros: 2,
    garagem: 2,
    isConcorrente: true,
    imobiliaria: "Lopes Rio",
    dataCadastro: "2025-10-01",
    ultimaAtualizacao: "2026-02-25",
    imagemUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
  },
  {
    id: "conc-2",
    titulo: "Apt 3 quartos Suite - Barra",
    endereco: "Av. Lúcio Costa, 2900",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.004,
    longitude: -43.3695,
    preco: 1320000,
    areaTotal: 125,
    areaPrivativa: 98,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 3,
    salas: 2,
    banheiros: 3,
    garagem: 2,
    isConcorrente: true,
    imobiliaria: "Century 21",
    dataCadastro: "2026-02-20",
    ultimaAtualizacao: "2026-02-20",
    imagemUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
  },
  {
    id: "conc-3",
    titulo: "Casa 4 suítes Condomínio Fechado",
    endereco: "Cond. Blue Houses, Lote 15",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.003,
    longitude: -43.358,
    preco: 1950000,
    areaTotal: 260,
    areaPrivativa: 200,
    tipo: "casa",
    finalidade: "residencial",
    quartos: 4,
    salas: 2,
    banheiros: 4,
    garagem: 3,
    isConcorrente: true,
    imobiliaria: "Brasil Brokers",
    dataCadastro: "2025-11-10",
    ultimaAtualizacao: "2026-01-20",
    imagemUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
  },
  {
    id: "conc-4",
    titulo: "Apartamento 2 quartos Praia",
    endereco: "Av. do Pepê, 680",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -22.9985,
    longitude: -43.362,
    preco: 790000,
    areaTotal: 78,
    areaPrivativa: 65,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 2,
    salas: 1,
    banheiros: 1,
    garagem: 1,
    isConcorrente: true,
    imobiliaria: "Patrimóvel",
    dataCadastro: "2026-02-15",
    ultimaAtualizacao: "2026-02-15",
    imagemUrl:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400",
  },
  {
    id: "conc-5",
    titulo: "Cobertura Linear 4 quartos",
    endereco: "Rua Sérgio Porto, 200",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.005,
    longitude: -43.367,
    preco: 3200000,
    precoAnterior: 3600000,
    areaTotal: 320,
    areaPrivativa: 260,
    tipo: "cobertura",
    finalidade: "residencial",
    quartos: 4,
    salas: 3,
    banheiros: 4,
    garagem: 3,
    isConcorrente: true,
    imobiliaria: "Lopes Rio",
    dataCadastro: "2025-08-15",
    ultimaAtualizacao: "2026-02-22",
    imagemUrl:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400",
  },
  {
    id: "conc-6",
    titulo: "Apt 2 quartos Recreio",
    endereco: "Rua Mário Pederneiras, 45",
    bairro: "Recreio dos Bandeirantes",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.016,
    longitude: -43.447,
    preco: 620000,
    areaTotal: 70,
    areaPrivativa: 58,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 2,
    salas: 1,
    banheiros: 1,
    garagem: 1,
    isConcorrente: true,
    imobiliaria: "Patrimóvel",
    dataCadastro: "2025-12-05",
    ultimaAtualizacao: "2026-02-10",
    imagemUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
  },
  {
    id: "conc-7",
    titulo: "Apt 3 quartos Recreio - Lazer Completo",
    endereco: "Av. Glaucio Gil, 900",
    bairro: "Recreio dos Bandeirantes",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -23.018,
    longitude: -43.452,
    preco: 920000,
    precoAnterior: 980000,
    areaTotal: 105,
    areaPrivativa: 82,
    tipo: "apartamento",
    finalidade: "residencial",
    quartos: 3,
    salas: 2,
    banheiros: 2,
    garagem: 2,
    isConcorrente: true,
    imobiliaria: "Fernandez Mera",
    dataCadastro: "2025-11-20",
    ultimaAtualizacao: "2026-02-26",
    imagemUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
  },
  {
    id: "conc-8",
    titulo: "Sala Comercial 55m² Barra",
    endereco: "Av. das Américas, 4100",
    bairro: "Barra da Tijuca",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    latitude: -22.9995,
    longitude: -43.3565,
    preco: 380000,
    areaTotal: 55,
    tipo: "comercial",
    finalidade: "comercial",
    quartos: 0,
    salas: 1,
    banheiros: 1,
    garagem: 1,
    isConcorrente: true,
    imobiliaria: "Brasil Brokers",
    dataCadastro: "2026-01-10",
    ultimaAtualizacao: "2026-01-10",
    imagemUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
  },
];

// ============================
// GOLD SIGNALS / ALERTAS
// ============================
export const goldSignals: GoldSignal[] = [
  {
    id: "gs-1",
    tipo: "alteracao_preco",
    imovelId: "conc-1",
    imovelTitulo: "Apartamento 3 quartos - Sol da Manhã",
    descricao:
      "Concorrente reduziu preço de R$ 1.280.000 para R$ 1.180.000 (-7,8%)",
    data: "2026-02-25",
    bairro: "Barra da Tijuca",
    valor: 1180000,
    valorAnterior: 1280000,
    lido: false,
  },
  {
    id: "gs-2",
    tipo: "novo_concorrente",
    imovelId: "conc-2",
    imovelTitulo: "Apt 3 quartos Suite - Barra",
    descricao:
      'Novo imóvel concorrente identificado próximo ao seu "Apartamento 3 quartos - Vista Mar"',
    data: "2026-02-20",
    bairro: "Barra da Tijuca",
    lido: false,
  },
  {
    id: "gs-3",
    tipo: "acima_mercado",
    imovelId: "own-1",
    imovelTitulo: "Apartamento 3 quartos - Vista Mar",
    descricao:
      "Seu imóvel está 18% acima da mediana dos concorrentes próximos (R$ 10.416/m² vs R$ 8.826/m²)",
    data: "2026-02-24",
    bairro: "Barra da Tijuca",
    lido: false,
  },
  {
    id: "gs-4",
    tipo: "alteracao_preco",
    imovelId: "conc-5",
    imovelTitulo: "Cobertura Linear 4 quartos",
    descricao:
      "Concorrente reduziu preço de R$ 3.600.000 para R$ 3.200.000 (-11,1%)",
    data: "2026-02-22",
    bairro: "Barra da Tijuca",
    valor: 3200000,
    valorAnterior: 3600000,
    lido: true,
  },
  {
    id: "gs-5",
    tipo: "sem_alteracao",
    imovelId: "own-3",
    imovelTitulo: "Cobertura Duplex Luxo",
    descricao:
      "Seu imóvel está sem alteração há 162 dias. Considere atualizar preço ou fotos.",
    data: "2026-02-28",
    bairro: "Barra da Tijuca",
    lido: false,
  },
  {
    id: "gs-6",
    tipo: "sem_alteracao",
    imovelId: "own-5",
    imovelTitulo: "Sala Comercial 60m²",
    descricao:
      "Seu imóvel está sem alteração há 211 dias. Pode estar ficando sem cuidado.",
    data: "2026-02-28",
    bairro: "Barra da Tijuca",
    lido: false,
  },
  {
    id: "gs-7",
    tipo: "venda_retirada",
    imovelId: "conc-removed-1",
    imovelTitulo: "Apartamento 3 quartos - Barra Premium",
    descricao:
      "Imóvel concorrente foi retirado do mercado. Possível venda realizada.",
    data: "2026-02-21",
    bairro: "Barra da Tijuca",
    lido: true,
  },
  {
    id: "gs-8",
    tipo: "novo_concorrente",
    imovelId: "conc-4",
    imovelTitulo: "Apartamento 2 quartos Praia",
    descricao:
      'Novo imóvel concorrente na região do seu "Apartamento 2 quartos reformado"',
    data: "2026-02-15",
    bairro: "Barra da Tijuca",
    lido: true,
  },
  {
    id: "gs-9",
    tipo: "alteracao_preco",
    imovelId: "conc-7",
    imovelTitulo: "Apt 3 quartos Recreio - Lazer Completo",
    descricao:
      "Concorrente reduziu preço de R$ 980.000 para R$ 920.000 (-6,1%)",
    data: "2026-02-26",
    bairro: "Recreio dos Bandeirantes",
    valor: 920000,
    valorAnterior: 980000,
    lido: false,
  },
  {
    id: "gs-10",
    tipo: "acima_mercado",
    imovelId: "own-6",
    imovelTitulo: "Apartamento 3 quartos - Novo",
    descricao:
      "Seu imóvel está 16% acima da mediana dos concorrentes próximos no Recreio",
    data: "2026-02-27",
    bairro: "Recreio dos Bandeirantes",
    lido: false,
  },
];

// ============================
// INTEGRAÇÕES
// ============================
export const integracoes: Integracao[] = [
  {
    id: "int-1",
    tipo: "xml",
    url: "https://imobiliariamendes.com.br/feed/imoveis.xml",
    status: "ativo",
    ultimaSincronizacao: "2026-02-28T06:00:00",
    totalImoveis: 6,
  },
];

// ============================
// LOGS DE INTEGRAÇÃO
// ============================
export const logsIntegracao: LogIntegracao[] = [
  {
    id: "log-1",
    integracaoId: "int-1",
    data: "2026-02-28T06:00:00",
    status: "sucesso",
    imoveisEntrada: 0,
    imoveisSaida: 0,
    imoveisAtualizados: 1,
    imoveisMantidos: 5,
    mensagem: "Sincronização concluída com sucesso. 1 imóvel atualizado.",
  },
  {
    id: "log-2",
    integracaoId: "int-1",
    data: "2026-02-27T06:00:00",
    status: "sucesso",
    imoveisEntrada: 0,
    imoveisSaida: 0,
    imoveisAtualizados: 0,
    imoveisMantidos: 6,
    mensagem: "Sincronização concluída. Nenhuma alteração detectada.",
  },
  {
    id: "log-3",
    integracaoId: "int-1",
    data: "2026-02-26T06:00:00",
    status: "sucesso",
    imoveisEntrada: 1,
    imoveisSaida: 0,
    imoveisAtualizados: 0,
    imoveisMantidos: 5,
    mensagem: "Sincronização concluída. 1 novo imóvel adicionado.",
  },
  {
    id: "log-4",
    integracaoId: "int-1",
    data: "2026-02-25T06:00:00",
    status: "parcial",
    imoveisEntrada: 0,
    imoveisSaida: 0,
    imoveisAtualizados: 2,
    imoveisMantidos: 3,
    mensagem: "Sincronização parcial. Timeout ao processar 1 imóvel.",
  },
  {
    id: "log-5",
    integracaoId: "int-1",
    data: "2026-02-24T06:00:00",
    status: "erro",
    imoveisEntrada: 0,
    imoveisSaida: 0,
    imoveisAtualizados: 0,
    imoveisMantidos: 0,
    mensagem: "Erro ao acessar XML. URL retornou status 503.",
  },
  {
    id: "log-6",
    integracaoId: "int-1",
    data: "2026-02-23T06:00:00",
    status: "sucesso",
    imoveisEntrada: 0,
    imoveisSaida: 1,
    imoveisAtualizados: 0,
    imoveisMantidos: 5,
    mensagem: "Sincronização concluída. 1 imóvel removido do feed.",
  },
];

// ============================
// DASHBOARD RESUMO
// ============================
export const dashboardResumo: DashboardResumo = {
  novosConcorrentes: 3,
  reducoesPreco: 4,
  imoveisAcimaMedia: 2,
  totalImoveis: 6,
  totalConcorrentes: 8,
  totalAlertas: 10,
};

// ============================
// HELPER: Todos os imóveis
// ============================
export const todosImoveis: Imovel[] = [...meusImoveis, ...imoveisConcorrentes];

// ============================
// HELPER: Bairros disponíveis
// ============================
export const bairros = ["Barra da Tijuca", "Recreio dos Bandeirantes"];

// ============================
// HELPER: Estados disponíveis
// ============================
export const estados = [...new Set(todosImoveis.map((i) => i.estado))].sort();

// ============================
// HELPER: Cidades por estado
// ============================
export function getCidadesPorEstado(estado: string): string[] {
  return [...new Set(todosImoveis.filter((i) => i.estado === estado).map((i) => i.cidade))].sort();
}

// ============================
// HELPER: Bairros por cidade
// ============================
export function getBairrosPorCidade(cidade: string): string[] {
  return [...new Set(todosImoveis.filter((i) => i.cidade === cidade).map((i) => i.bairro))].sort();
}

// ============================
// HELPER: Formatar moeda
// ============================
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ============================
// HELPER: Formatar data
// ============================
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

// ============================
// HELPER: Tipo de sinal em português
// ============================
export function getSignalLabel(tipo: GoldSignal["tipo"]): string {
  const labels: Record<GoldSignal["tipo"], string> = {
    alteracao_preco: "Alteração de Preço",
    venda_retirada: "Venda/Retirada",
    novo_concorrente: "Novo Concorrente",
    acima_mercado: "Acima do Mercado",
    sem_alteracao: "Sem Alteração",
  };
  return labels[tipo];
}

export function getSignalColor(tipo: GoldSignal["tipo"]): string {
  const colors: Record<GoldSignal["tipo"], string> = {
    alteracao_preco: "text-warning bg-warning/20",
    venda_retirada: "text-info bg-info/20",
    novo_concorrente: "text-danger bg-danger/20",
    acima_mercado: "text-primary bg-primary/20",
    sem_alteracao: "text-gray bg-gray/20",
  };
  return colors[tipo];
}
