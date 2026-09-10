import { useState } from "react";
import { Download, Printer, Users } from "lucide-react";
import {
  Badge,
  Btn,
  Field,
  GlassPanel,
  Panel,
  TableShell,
  Td,
  Th,
  inputCls,
} from "./primitives";
import { PedidoModal, ClientesModal } from "./modals";
import {
  brl,
  caixas,
  clientes,
  despesas,
  dre,
  kpis,
  pedidos,
  produtos,
  recDesp,
  type Pedido,
  type Tone,
} from "@/lib/reports-data";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "resumo", label: "Resumo", title: "Resumo de vendas.", sub: "Visão consolidada do faturamento e das formas de pagamento no período." },
  { id: "produtos", label: "Produtos", title: "Produtos vendidos.", sub: "Ranking dos itens com maior giro e participação na receita." },
  { id: "caixas", label: "Caixas", title: "Histórico de caixas.", sub: "Aberturas, fechamentos e valores conferidos por operador." },
  { id: "pedidos", label: "Pedidos", title: "Pedidos do período.", sub: "Clique em qualquer linha para ver os detalhes completos do pedido." },
  { id: "clientes", label: "Clientes", title: "Clientes do período.", sub: "Quem mais comprou, com que frequência e quanto gastou." },
  { id: "despesas", label: "Despesas", title: "Despesas do período.", sub: "Saídas agrupadas por categoria, com visão resumida ou detalhada." },
  { id: "recdesp", label: "Rec. × Desp.", title: "Receitas × Despesas.", sub: "Comparativo mês a mês entre o que entrou e o que saiu." },
  { id: "dre", label: "DRE", title: "Demonstração de resultado.", sub: "Do faturamento bruto ao resultado operacional do período." },
] as const;

const atalhos = ["Hoje", "Ontem", "Últimos 7", "Este mês", "Mês anterior"];

const statusTone: Record<string, Tone> = {
  Concluído: "ok",
  "Em rota": "info",
  Cancelado: "danger",
  Aberto: "ok",
  Fechado: "info",
};

export function ReportsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("resumo");
  const [atalho, setAtalho] = useState("Últimos 7");
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [verClientes, setVerClientes] = useState(false);
  const [visaoDespesa, setVisaoDespesa] = useState<"resumo" | "detalhado">("resumo");

  const atual = tabs.find((t) => t.id === tab)!;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8">
      <header className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          CSGourmet · Relatórios
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {atual.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-3">{atual.sub}</p>
      </header>

      {/* Período */}
      <GlassPanel className="mb-5 p-5">
        <div className="flex flex-wrap items-end gap-4">
          <Field label="De" className="min-w-[9rem] flex-1">
            <div className="flex gap-2">
              <input type="date" defaultValue="2026-09-04" className={inputCls} />
              <input type="time" defaultValue="00:00" className={cn(inputCls, "w-28")} />
            </div>
          </Field>
          <Field label="Até" className="min-w-[9rem] flex-1">
            <div className="flex gap-2">
              <input type="date" defaultValue="2026-09-10" className={inputCls} />
              <input type="time" defaultValue="23:59" className={cn(inputCls, "w-28")} />
            </div>
          </Field>
          <div className="flex flex-wrap gap-2">
            <Btn variant="ghost">
              <Download className="size-4" /> CSV
            </Btn>
            <Btn variant="ghost">
              <Printer className="size-4" /> Imprimir
            </Btn>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {atalhos.map((a) => (
            <button
              key={a}
              onClick={() => setAtalho(a)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                atalho === a
                  ? "border-transparent bg-accent text-accent-foreground"
                  : "border-line-strong text-ink-2 hover:bg-hover",
              )}
            >
              {a}
            </button>
          ))}
        </div>
      </GlassPanel>

      {/* Abas */}
      <nav className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              tab === t.id
                ? "border-transparent bg-ink text-background"
                : "border-line-strong bg-paper text-ink-2 hover:bg-hover",
            )}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {/* Filtro */}
      <Panel className="mb-6 p-5">
        <h2 className="mb-4 font-display text-base font-semibold text-ink">Filtrar vendas</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cliente">
            <input list="clientes-lista" placeholder="Buscar cliente…" className={inputCls} />
            <datalist id="clientes-lista">
              {clientes.map((c) => (
                <option key={c.nome} value={c.nome} />
              ))}
            </datalist>
          </Field>
          <Field label="Forma de pagamento">
            <select className={inputCls} defaultValue="">
              <option value="">Todas</option>
              <option>Crédito</option>
              <option>Débito</option>
              <option>Dinheiro</option>
              <option>PIX</option>
            </select>
          </Field>
        </div>
      </Panel>

      {tab === "resumo" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {kpis.map((k) => (
            <Panel key={k.label} className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">{k.label}</p>
              <p
                className={cn(
                  "mt-2 font-display text-3xl font-semibold tabular-nums",
                  k.tone === "danger" ? "text-accent" : "text-ink",
                )}
              >
                {brl(k.value)}
              </p>
              <p className="mt-1 text-xs text-ink-4">{k.hint}</p>
            </Panel>
          ))}
        </div>
      )}

      {tab === "produtos" && (
        <Panel className="p-1.5">
          <TableShell>
            <thead>
              <tr>
                <Th>Produto</Th>
                <Th right>Qtd.</Th>
                <Th right>Bruto</Th>
                <Th right>Participação</Th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.nome} className="transition-colors hover:bg-hover">
                  <Td className="font-medium text-ink">{p.nome}</Td>
                  <Td right>{p.qtd}</Td>
                  <Td right>{brl(p.bruto)}</Td>
                  <Td right>{p.part}</Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      )}

      {tab === "caixas" && (
        <Panel className="p-1.5">
          <TableShell>
            <thead>
              <tr>
                <Th>Caixa</Th>
                <Th>Operador</Th>
                <Th>Abertura</Th>
                <Th>Fechamento</Th>
                <Th right>Saldo final</Th>
                <Th right>Status</Th>
              </tr>
            </thead>
            <tbody>
              {caixas.map((c) => (
                <tr key={c.id} className="transition-colors hover:bg-hover">
                  <Td className="font-medium text-ink">{c.id}</Td>
                  <Td>{c.operador}</Td>
                  <Td>{c.abertura}</Td>
                  <Td>{c.fechamento}</Td>
                  <Td right>{brl(c.final)}</Td>
                  <Td right>
                    <Badge tone={statusTone[c.status]}>{c.status}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      )}

      {tab === "pedidos" && (
        <Panel className="p-1.5">
          <TableShell>
            <thead>
              <tr>
                <Th>Pedido</Th>
                <Th>Hora</Th>
                <Th>Cliente</Th>
                <Th>Tipo</Th>
                <Th>Pagamento</Th>
                <Th right>Total</Th>
                <Th right>Status</Th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr
                  key={p.numero}
                  onClick={() => setPedido(p)}
                  className="cursor-pointer transition-colors hover:bg-hover"
                >
                  <Td className="font-medium text-ink">#{p.numero}</Td>
                  <Td>{p.hora}</Td>
                  <Td>{p.cliente}</Td>
                  <Td>{p.tipo}</Td>
                  <Td>{p.pagamento}</Td>
                  <Td right>{brl(p.total)}</Td>
                  <Td right>
                    <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                  </Td>
                </tr>
              ))}
            </tbody>
          </TableShell>
        </Panel>
      )}

      {tab === "clientes" && (
        <Panel className="p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="font-display text-base font-semibold text-ink">Ranking de clientes</h2>
            <Btn variant="ghost" onClick={() => setVerClientes(true)}>
              <Users className="size-4" /> Ver lista
            </Btn>
          </div>
          <ul className="divide-y divide-line">
            {clientes.map((c, i) => (
              <li key={c.nome} className="flex items-center justify-between gap-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="badge-base badge-info">{i + 1}º</span>
                  <div>
                    <p className="text-sm font-medium text-ink">{c.nome}</p>
                    <p className="text-xs text-ink-3">
                      {c.telefone} · último pedido {c.ultimo}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums text-ink">{brl(c.total)}</p>
                  <p className="text-xs text-ink-4">{c.pedidos} pedidos</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      {tab === "despesas" && (
        <Panel className="p-5">
          <div className="mb-4 inline-flex rounded-full border border-line-strong p-1">
            {(["resumo", "detalhado"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVisaoDespesa(v)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors",
                  visaoDespesa === v
                    ? "bg-accent text-accent-foreground"
                    : "text-ink-2 hover:bg-hover",
                )}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {despesas.map((g) => {
              const total = g.itens.reduce((s, i) => s + i.valor, 0);
              return (
                <div key={g.categoria} className="rounded-2xl border border-line bg-paper-2 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-base font-semibold text-ink">{g.categoria}</h3>
                    <span className="text-sm font-semibold tabular-nums text-accent">
                      {brl(total)}
                    </span>
                  </div>
                  {visaoDespesa === "detalhado" && (
                    <ul className="mt-3 divide-y divide-line">
                      {g.itens.map((i) => (
                        <li key={i.desc} className="flex justify-between gap-4 py-2 text-sm">
                          <span className="text-ink-2">{i.desc}</span>
                          <span className="tabular-nums text-ink-3">
                            {i.data} · {brl(i.valor)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>
      )}

      {tab === "recdesp" && (
        <Panel className="p-1.5">
          <TableShell>
            <thead>
              <tr>
                <Th>Mês</Th>
                <Th right>Receitas</Th>
                <Th right>Despesas</Th>
                <Th right>Resultado</Th>
              </tr>
            </thead>
            <tbody>
              {recDesp.map((r) => {
                const res = r.receita - r.despesa;
                return (
                  <tr key={r.mes} className="transition-colors hover:bg-hover">
                    <Td className="font-medium text-ink">{r.mes}</Td>
                    <Td right>{brl(r.receita)}</Td>
                    <Td right>{brl(r.despesa)}</Td>
                    <Td right>
                      <Badge tone={res >= 0 ? "ok" : "danger"}>{brl(res)}</Badge>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </TableShell>
        </Panel>
      )}

      {tab === "dre" && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { l: "Receita líquida", v: 44251.8 },
              { l: "Lucro bruto", v: 25831.2 },
              { l: "Resultado operacional", v: 10945.4 },
            ].map((k) => (
              <GlassPanel key={k.l} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-3">{k.l}</p>
                <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-ink">
                  {brl(k.v)}
                </p>
              </GlassPanel>
            ))}
          </div>
          <Panel className="p-1.5">
            <TableShell>
              <thead>
                <tr>
                  <Th>Conta</Th>
                  <Th right>Valor</Th>
                </tr>
              </thead>
              <tbody>
                {dre.map((d) => (
                  <tr key={d.linha} className={cn(d.total && "bg-paper-2")}>
                    <Td className={cn(d.total ? "font-semibold text-ink" : "pl-8")}>{d.linha}</Td>
                    <Td right className={cn(d.total && "font-semibold text-ink")}>
                      {brl(d.valor)}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </TableShell>
          </Panel>
        </div>
      )}

      {pedido && <PedidoModal pedido={pedido} onClose={() => setPedido(null)} />}
      {verClientes && <ClientesModal onClose={() => setVerClientes(false)} />}
    </div>
  );
}
