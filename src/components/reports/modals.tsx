import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { Badge, Btn } from "./primitives";
import { brl, clientes, type Pedido, type Tone } from "@/lib/reports-data";

function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-overlay backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-line bg-paper text-ink shadow-[var(--shadow-lift)] sm:rounded-3xl"
      >
        <header className="flex items-center justify-between gap-4 border-b border-line bg-paper-2 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-ink-3 transition-colors hover:bg-hover hover:text-ink"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
        </header>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer ? (
          <footer className="flex flex-wrap justify-end gap-2 border-t border-line bg-paper-2 px-6 py-4">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-line py-2.5 last:border-0">
      <span className="text-sm text-ink-3">{label}</span>
      <span className="text-right text-sm font-medium text-ink">{children}</span>
    </div>
  );
}

const statusTone: Record<string, Tone> = {
  Concluído: "ok",
  "Em rota": "info",
  Cancelado: "danger",
  Autorizada: "ok",
  Pendente: "warn",
  Rejeitada: "danger",
};

export function PedidoModal({ pedido, onClose }: { pedido: Pedido; onClose: () => void }) {
  const subtotal = pedido.itens.reduce((s, i) => s + i.qtd * i.preco, 0);
  return (
    <Modal
      title={`Detalhes do Pedido #${pedido.numero}`}
      onClose={onClose}
      footer={
        <>
          <Btn variant="ghost">Comprovante</Btn>
          <Btn variant="ghost">NFC-e PDF</Btn>
          <Btn variant="solid" onClick={onClose}>
            Fechar
          </Btn>
        </>
      }
    >
      <Row label="Status">
        <Badge tone={statusTone[pedido.status]}>{pedido.status}</Badge>
      </Row>
      <Row label="Tipo">{pedido.tipo}</Row>
      <Row label="Cliente">{pedido.cliente}</Row>
      <Row label="Telefone">{pedido.telefone}</Row>
      <Row label="Endereço">{pedido.endereco}</Row>
      <Row label="Taxa de entrega">{brl(pedido.taxa)}</Row>
      <Row label="Abertura">{pedido.hora}</Row>
      <Row label="Fechamento">{pedido.status === "Em rota" ? "—" : pedido.hora}</Row>

      <h3 className="mt-6 font-display text-base font-semibold text-ink">
        Nota Fiscal Eletrônica
      </h3>
      <div className="mt-2 rounded-2xl border border-line bg-paper-2 px-4 py-3">
        <Row label="Situação">
          <Badge tone={statusTone[pedido.nfe.situacao]}>{pedido.nfe.situacao}</Badge>
        </Row>
        <Row label="Chave de acesso">
          <span className="font-mono text-xs text-ink-2">{pedido.nfe.chave}</span>
        </Row>
      </div>

      <h3 className="mt-6 font-display text-base font-semibold text-ink">Itens do pedido</h3>
      <ul className="mt-2 divide-y divide-line">
        {pedido.itens.map((i) => (
          <li key={i.nome} className="flex items-center justify-between gap-4 py-2.5">
            <span className="text-sm text-ink">
              <span className="mr-2 text-ink-3">{i.qtd}×</span>
              {i.nome}
            </span>
            <span className="text-sm tabular-nums text-ink-2">{brl(i.qtd * i.preco)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-accent-soft px-4 py-3">
        <span className="text-sm font-semibold text-ink">Total</span>
        <span className="font-display text-xl font-semibold tabular-nums text-accent">
          {brl(subtotal + pedido.taxa)}
        </span>
      </div>
    </Modal>
  );
}

export function ClientesModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal
      title="Clientes no período"
      onClose={onClose}
      footer={
        <Btn variant="solid" onClick={onClose}>
          Fechar
        </Btn>
      }
    >
      <ul className="divide-y divide-line">
        {clientes.map((c) => (
          <li key={c.nome} className="flex items-center justify-between gap-4 py-3">
            <div>
              <p className="text-sm font-medium text-ink">{c.nome}</p>
              <p className="text-xs text-ink-3">{c.telefone}</p>
            </div>
            <span className="text-sm tabular-nums text-ink-2">{c.pedidos} pedidos</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}
