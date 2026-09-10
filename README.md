# Sales Insights Dashboard

Quero que você construa do zero a tela de "Relatórios" de um sistema de PDV (ponto de venda) de restaurante/delivery, em React + Tailwind, com suporte NATIVO e completo a modo claro e modo escuro — os dois temas são requisito de primeira classe, não um "modo escuro" jogado por cima depois.

CONTEXTO / FUNÇÃO DA TELA

É a tela de relatórios de vendas de um sistema tipo PDV (nome do produto: CSGourmet). Fica dentro de um shell com sidebar de navegação à esquerda e uma barra superior (topo) com toggles e o menu do usuário — pode assumir que esse shell já existe e construir só o CONTEÚDO da página de relatórios.

A página tem:

1. Um cabeçalho com título "Resumo de vendas." (o título muda conforme a aba) e subtítulo explicativo.

2. Um card de "Período selecionado" com: campo de data "De" + hora, campo de data "Até" + hora, e botões de atalho (Hoje, Ontem, Últimos 7, Este mês, Mês anterior), mais botões de exportar CSV e imprimir.

3. Uma barra de abas (pills arredondadas) para alternar entre: Resumo, Produtos, Caixas, Pedidos, Clientes, Despesas, Rec. × Desp., DRE.

4. Um card de filtro ("Filtrar vendas") com campo de cliente (autocomplete) e select de forma de pagamento.

5. Conteúdo específico de cada aba:

   - Resumo: grid de cards de KPI (Faturamento, Ticket médio, Total bruto, Crédito, Débito, Dinheiro, PIX, Descontos, Divergência financeira etc.), cada um com valor grande, rótulo e uma legenda pequena.

   - Produtos: ranking de produtos vendidos (tabela).

   - Caixas: histórico de abertura/fechamento de caixa (tabela com badge de status "Aberto"/"Fechado").

   - Pedidos: tabela completa de pedidos do período (é clicável — cada linha abre um MODAL de detalhes).

   - Clientes: lista/ranking de clientes (também tem um modal de "Clientes no período").

   - Despesas: toggle entre visões (resumo/detalhado) + lista de despesas por categoria.

   - Rec. × Desp.: receitas vs despesas.

   - DRE: Demonstração de Resultado — KPIs grandes estilo "extrato" + tabela hierárquica com linhas de total em negrito.

6. Modal "Detalhes do Pedido #XXXX": cabeçalho com título e botão fechar, corpo com linhas de label/valor (Status, Tipo, Cliente, Telefone, Endereço, Taxa de entrega, Abertura, Fechamento, seção de Nota Fiscal Eletrônica com badge de situação, lista de itens do pedido com nome/qtd/preço, total), rodapé com botões (Comprovante, NFC-e PDF, Fechar).

7. Modal "Clientes no período": lista simples de clientes.

ESTILO VISUAL

Modo claro: paleta quente, "editorial/café da manhã" — fundo creme (#f1ebdc), papel/cards num creme mais claro (#f7f2e4), tinta quase-preta pro texto principal (#1c1d18), acento terracota/queimado (#c0492c) pra destaques e itálico, tipografia serifada (Fraunces/Georgia) pros títulos e sans (Inter) pro resto. Cantos bem arredondados (14–18px), sombras suaves.

Modo escuro: NÃO é só "inverter". Fundo grafite-azulado bem escuro (#1c1f25), cards num tom um pouco mais claro (#20242b–#262a32), texto principal quase-branco (#e8eaed), textos secundários em cinza-azulado (#c4c9d1, #9aa1ad, #6f7783), o mesmo acento terracota só que clareado pra pop em fundo escuro (#f08c70). Bordas/divisórias em branco bem transparente (rgba(255,255,255,.10) a .18). Se algum card usar um efeito "vidro fosco" (branco translúcido por cima do fundo pra dar profundidade), no claro pode ser um branco forte (25–30% de opacidade) porque o fundo já é claro — mas no ESCURO isso tem que cair pra bem baixo (5–8% de opacidade), senão vira um cinza-chumbo feio que destoa de tudo. Badges de status (verde/âmbar/vermelho/azul) no claro usam fundo pastel + texto saturado escuro da mesma cor; no escuro invertam pra fundo saturado bem transparente (~18%) + texto na cor clara/pastel da mesma família — nunca deixem o texto escuro original sobrevivendo em cima de um fundo que ficou escuro.

REGRA DE OURO (o motivo desse prompt existir)

A versão anterior dessa tela foi feita com cores de texto e fundo HARDCODED em vários componentes (ex: `style="color:#1c1d18"` direto no elemento, ou `background:#fff!important` fixo em modais), e depois alguém tentou "consertar" o modo escuro só トocando a cor do elemento PAI — sem perceber que:

(a) `color` herda, mas se um elemento FILHO tem sua própria regra de cor direta (por mais específica ou simples que seja, mesmo sem !important), ela sempre vence a herança do pai, não importa o !important do pai;

(b) background NÃO herda de jeito nenhum — cada elemento com fundo próprio precisa da sua própria definição de fundo escuro, não adianta só escurecer o container de fora;

(c) `!important` num `style=""` inline é praticamente impossível de vencer com um seletor CSS externo, mesmo que esse seletor também tenha !important — se o valor precisa mudar por tema, ele tem que vir de uma CSS variable (ex: `background:var(--panel-bg)`) e não de um valor fixo com !important direto no atributo style.

Resultado prático do bug: títulos de modal pretos em cima de barra marrom escura, corpo de modal inteiro branco com texto claro (quase invisível), textos "tinta escura" sobre fundo escuro com contraste de ~1.15:1 (praticamente invisível).

Portanto: TODA cor de texto e de fundo nesse componente tem que vir de tokens de tema (CSS variables redefinidas em `[data-theme="dark"]`, ou classes Tailwind `dark:`), nunca de hex fixo inline nem de `!important` isolado num elemento sem cobrir explicitamente CADA elemento filho que também define cor/fundo próprio. Antes de terminar, resolva mentalmente (ou via devtools) o contraste texto/fundo de CADA card, badge, modal e cabeçalho nos dois temas — nenhum par pode ficar abaixo de ~4.5:1 pra texto normal.

Use dados fake plausíveis (nomes de pratos brasileiros, valores em R$, datas recentes) pra popular a tela. Entregue a tela funcional com alternância de tema (posso simular um botão de alternar claro/escuro no topo pra eu testar), responsiva, e com os dois temas visualmente polidos — não só "passa no teste automático de contraste", mas bonito de verdade nos dois modos.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fe7eed17-17c1-41d7-a8dc-654c0c9a5cf4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
