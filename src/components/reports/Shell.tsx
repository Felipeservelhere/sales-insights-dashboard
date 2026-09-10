import { useEffect, useState, type ReactNode } from "react";
import {
  BarChart3,
  ChefHat,
  ClipboardList,
  Moon,
  Settings,
  ShoppingBag,
  Sun,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Pedidos", icon: ShoppingBag },
  { label: "Cardápio", icon: ChefHat },
  { label: "Caixa", icon: ClipboardList },
  { label: "Clientes", icon: Users },
  { label: "Relatórios", icon: BarChart3, active: true },
  { label: "Ajustes", icon: Settings },
];

export function Shell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-background text-ink">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-paper px-4 py-6 lg:flex">
        <div className="mb-8 px-2">
          <p className="font-display text-xl font-semibold text-ink">
            CS<span className="italic text-accent">Gourmet</span>
          </p>
          <p className="text-xs text-ink-4">Ponto de venda</p>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map((n) => (
            <button
              key={n.label}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                n.active ? "bg-accent-soft text-accent" : "text-ink-2 hover:bg-hover",
              )}
            >
              <n.icon className="size-4" />
              {n.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur sm:px-8">
          <p className="text-sm font-medium text-ink-2">Relatórios</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark((d) => !d)}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1.5 text-xs font-semibold text-ink-2 transition-colors hover:bg-hover"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              {dark ? "Modo claro" : "Modo escuro"}
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-ink-2 sm:inline">Felipe</span>
              <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                FC
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
