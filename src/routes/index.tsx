import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/reports/Shell";
import { ReportsPage } from "@/components/reports/ReportsPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Relatórios de vendas | CSGourmet PDV" },
      {
        name: "description",
        content:
          "Relatórios de vendas do CSGourmet: faturamento, produtos, caixas, pedidos, clientes, despesas e DRE em um só lugar.",
      },
      { property: "og:title", content: "Relatórios de vendas | CSGourmet PDV" },
      {
        property: "og:description",
        content:
          "Acompanhe faturamento, ticket médio, formas de pagamento e DRE do seu restaurante em tempo real.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Shell>
      <ReportsPage />
    </Shell>
  );
}
