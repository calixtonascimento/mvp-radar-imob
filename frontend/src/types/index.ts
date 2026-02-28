export interface Imovel {
  id: string;
  titulo: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  latitude: number;
  longitude: number;
  preco: number;
  precoAnterior?: number;
  areaTotal: number;
  areaPrivativa?: number;
  tipo: "apartamento" | "casa" | "terreno" | "comercial" | "cobertura";
  finalidade: "residencial" | "comercial";
  quartos: number;
  salas: number;
  banheiros: number;
  garagem: number;
  isConcorrente: boolean;
  imobiliaria?: string;
  dataCadastro: string;
  ultimaAtualizacao: string;
  imagemUrl?: string;
}

export interface GoldSignal {
  id: string;
  tipo:
    | "alteracao_preco"
    | "venda_retirada"
    | "novo_concorrente"
    | "acima_mercado"
    | "sem_alteracao";
  imovelId: string;
  imovelTitulo: string;
  descricao: string;
  data: string;
  bairro: string;
  valor?: number;
  valorAnterior?: number;
  lido: boolean;
}

export interface Integracao {
  id: string;
  tipo: "xml";
  url: string;
  status: "ativo" | "inativo" | "erro";
  ultimaSincronizacao: string;
  totalImoveis: number;
}

export interface LogIntegracao {
  id: string;
  integracaoId: string;
  data: string;
  status: "sucesso" | "erro" | "parcial";
  imoveisEntrada: number;
  imoveisSaida: number;
  imoveisAtualizados: number;
  imoveisMantidos: number;
  mensagem: string;
}

export interface DashboardResumo {
  novosConcorrentes: number;
  reducoesPreco: number;
  imoveisAcimaMedia: number;
  totalImoveis: number;
  totalConcorrentes: number;
  totalAlertas: number;
}

export interface Dossie {
  imovel: Imovel;
  concorrentes: Imovel[];
  sinais: GoldSignal[];
  mediaPrecoPorM2: number;
  posicionamento: number; // percentual acima/abaixo da média
}

export interface User {
  id: string;
  nome: string;
  email: string;
  empresa: string;
  plano: "basico" | "profissional" | "enterprise";
}
