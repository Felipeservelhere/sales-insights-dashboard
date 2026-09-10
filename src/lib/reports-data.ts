export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export type Tone = "ok" | "warn" | "danger" | "info" | "neutral";

export const kpis: { label: string; value: number; hint: string; tone?: Tone }[] = [
  { label: "Faturamento", value: 48231.9, hint: "Líquido, já com descontos" },
  { label: "Ticket médio", value: 87.42, hint: "552 pedidos no período" },
  { label: "Total bruto", value: 51044.3, hint: "Antes de descontos e taxas" },
  { label: "Crédito", value: 18422.1, hint: "38% do faturamento" },
  { label: "Débito", value: 9310.55, hint: "19% do faturamento" },
  { label: "Dinheiro", value: 5120.0, hint: "11% do faturamento" },
  { label: "PIX", value: 14109.25, hint: "29% do faturamento" },
  { label: "Descontos", value: 2812.4, hint: "Cupons e cortesias", tone: "warn" },
  { label: "Divergência financeira", value: -87.35, hint: "Sangrias sem comprovante", tone: "danger" },
];

export const produtos = [
  { nome: "Feijoada completa", qtd: 184, bruto: 9752.0, part: "20,2%" },
  { nome: "Picanha na chapa (2 pessoas)", qtd: 122, bruto: 8906.0, part: "18,4%" },
  { nome: "Moqueca de camarão", qtd: 96, bruto: 6528.0, part: "13,5%" },
  { nome: "Escondidinho de carne seca", qtd: 143, bruto: 5148.0, part: "10,7%" },
  { nome: "Baião de dois", qtd: 131, bruto: 3930.0, part: "8,1%" },
  { nome: "Coxinha de costela (6un)", qtd: 208, bruto: 3536.0, part: "7,3%" },
  { nome: "Caipirinha de limão", qtd: 276, bruto: 4692.0, part: "9,7%" },
  { nome: "Pudim de leite", qtd: 164, bruto: 1968.0, part: "4,1%" },
];

export const caixas = [
  { id: "CX-1042", operador: "Marina Alves", abertura: "08/09 11:02", fechamento: "08/09 23:41", inicial: 200, final: 4812.55, status: "Fechado" },
  { id: "CX-1043", operador: "Rodrigo Prado", abertura: "09/09 10:58", fechamento: "09/09 23:12", inicial: 200, final: 5290.1, status: "Fechado" },
  { id: "CX-1044", operador: "Juliana Ramos", abertura: "10/09 11:05", fechamento: "—", inicial: 200, final: 3120.75, status: "Aberto" },
];

export type Pedido = {
  numero: string;
  hora: string;
  cliente: string;
  telefone: string;
  endereco: string;
  tipo: string;
  pagamento: string;
  status: "Concluído" | "Cancelado" | "Em rota";
  taxa: number;
  total: number;
  nfe: { situacao: "Autorizada" | "Rejeitada" | "Pendente"; chave: string };
  itens: { nome: string; qtd: number; preco: number }[];
};

export const pedidos: Pedido[] = [
  {
    numero: "4821", hora: "10/09 12:14", cliente: "Ana Beatriz Souza", telefone: "(11) 98812-4410",
    endereco: "Rua Harmonia, 412 — Vila Madalena", tipo: "Delivery", pagamento: "PIX",
    status: "Concluído", taxa: 9.9, total: 148.7,
    nfe: { situacao: "Autorizada", chave: "3524 0912 3456 7890 0011" },
    itens: [
      { nome: "Feijoada completa", qtd: 2, preco: 53.0 },
      { nome: "Caipirinha de limão", qtd: 2, preco: 17.0 },
    ],
  },
  {
    numero: "4822", hora: "10/09 12:31", cliente: "Carlos Menezes", telefone: "(11) 99640-2277",
    endereco: "Balcão — Mesa 07", tipo: "Salão", pagamento: "Crédito",
    status: "Concluído", taxa: 0, total: 213.4,
    nfe: { situacao: "Autorizada", chave: "3524 0912 3456 7890 0012" },
    itens: [
      { nome: "Picanha na chapa (2 pessoas)", qtd: 1, preco: 73.0 },
      { nome: "Moqueca de camarão", qtd: 2, preco: 68.0 },
      { nome: "Pudim de leite", qtd: 1, preco: 12.0 },
    ],
  },
  {
    numero: "4823", hora: "10/09 13:02", cliente: "Fernanda Lopes", telefone: "(11) 97733-8180",
    endereco: "Av. Pompeia, 1180 — Perdizes", tipo: "Delivery", pagamento: "Débito",
    status: "Em rota", taxa: 12.5, total: 96.5,
    nfe: { situacao: "Pendente", chave: "—" },
    itens: [
      { nome: "Escondidinho de carne seca", qtd: 2, preco: 36.0 },
      { nome: "Coxinha de costela (6un)", qtd: 1, preco: 17.0 },
    ],
  },
  {
    numero: "4824", hora: "10/09 13:20", cliente: "Thiago Barreto", telefone: "(11) 98120-5533",
    endereco: "Retirada no balcão", tipo: "Retirada", pagamento: "Dinheiro",
    status: "Cancelado", taxa: 0, total: 58.0,
    nfe: { situacao: "Rejeitada", chave: "3524 0912 3456 7890 0014" },
    itens: [{ nome: "Baião de dois", qtd: 2, preco: 29.0 }],
  },
  {
    numero: "4825", hora: "10/09 13:47", cliente: "Larissa Nogueira", telefone: "(11) 99011-7742",
    endereco: "Rua Cardoso de Almeida, 90 — Sumaré", tipo: "Delivery", pagamento: "PIX",
    status: "Concluído", taxa: 8.9, total: 131.9,
    nfe: { situacao: "Autorizada", chave: "3524 0912 3456 7890 0015" },
    itens: [
      { nome: "Moqueca de camarão", qtd: 1, preco: 68.0 },
      { nome: "Caipirinha de limão", qtd: 3, preco: 17.0 },
    ],
  },
];

export const clientes = [
  { nome: "Ana Beatriz Souza", telefone: "(11) 98812-4410", pedidos: 14, total: 1842.3, ultimo: "10/09" },
  { nome: "Carlos Menezes", telefone: "(11) 99640-2277", pedidos: 11, total: 1610.9, ultimo: "10/09" },
  { nome: "Fernanda Lopes", telefone: "(11) 97733-8180", pedidos: 9, total: 987.4, ultimo: "09/09" },
  { nome: "Larissa Nogueira", telefone: "(11) 99011-7742", pedidos: 8, total: 902.1, ultimo: "10/09" },
  { nome: "Thiago Barreto", telefone: "(11) 98120-5533", pedidos: 6, total: 512.0, ultimo: "08/09" },
];

export const despesas = [
  { categoria: "Insumos e mercadoria", itens: [
    { desc: "Açougue Bom Corte — carnes", data: "04/09", valor: 4820.0 },
    { desc: "Hortifruti São Jorge", data: "06/09", valor: 1310.4 },
  ] },
  { categoria: "Pessoal", itens: [
    { desc: "Adiantamento equipe cozinha", data: "05/09", valor: 3200.0 },
    { desc: "Freelas de fim de semana", data: "08/09", valor: 940.0 },
  ] },
  { categoria: "Operacional", itens: [
    { desc: "Energia elétrica", data: "07/09", valor: 1180.6 },
    { desc: "Gás (2 cilindros)", data: "03/09", valor: 640.0 },
    { desc: "Embalagens delivery", data: "09/09", valor: 715.2 },
  ] },
];

export const recDesp = [
  { mes: "Junho", receita: 41230.5, despesa: 28110.2 },
  { mes: "Julho", receita: 45890.0, despesa: 29740.8 },
  { mes: "Agosto", receita: 47110.7, despesa: 31005.4 },
  { mes: "Setembro (parcial)", receita: 48231.9, despesa: 12806.2 },
];

export const dre = [
  { linha: "Receita bruta de vendas", valor: 51044.3, total: true },
  { linha: "(-) Descontos concedidos", valor: -2812.4 },
  { linha: "(-) Impostos sobre vendas", valor: -3980.1 },
  { linha: "= Receita líquida", valor: 44251.8, total: true },
  { linha: "(-) CMV — insumos", valor: -18420.6 },
  { linha: "= Lucro bruto", valor: 25831.2, total: true },
  { linha: "(-) Pessoal", valor: -9140.0 },
  { linha: "(-) Operacional", valor: -4535.8 },
  { linha: "(-) Marketing", valor: -1210.0 },
  { linha: "= Resultado operacional", valor: 10945.4, total: true },
];
