import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { clientes } from "@/lib/reports-data";
import { cn } from "@/lib/utils";

export function ClienteSelect() {
  const [open, setOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const lista = clientes.filter((c) =>
    (c.nome + c.telefone).toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl border bg-field px-3 py-2 text-sm transition",
          open ? "border-accent" : "border-line-strong hover:bg-hover",
        )}
      >
        <span className={cn("truncate", sel ? "text-ink" : "text-ink-4")}>
          {sel ?? "Todos os clientes"}
        </span>
        <span className="flex items-center gap-1">
          {sel && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                setSel(null);
              }}
              className="rounded-full p-0.5 text-ink-3 hover:bg-hover hover:text-ink"
            >
              <X className="size-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn("size-4 text-ink-3 transition-transform", open && "rotate-180")}
          />
        </span>
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-lift)]">
          <div className="flex items-center gap-2 border-b border-line px-3 py-2">
            <Search className="size-4 shrink-0 text-ink-4" />
            <input
              autoFocus
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou telefone…"
              className="w-full bg-transparent text-sm text-ink outline-none"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1">
            {lista.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-ink-4">Nenhum cliente</li>
            )}
            {lista.map((c) => (
              <li key={c.nome}>
                <button
                  type="button"
                  onClick={() => {
                    setSel(c.nome);
                    setOpen(false);
                    setBusca("");
                  }}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-hover"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{c.nome}</span>
                    <span className="block text-xs text-ink-3">
                      {c.telefone} · {c.pedidos} pedidos
                    </span>
                  </span>
                  {sel === c.nome ? (
                    <Check className="size-4 shrink-0 text-accent" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
