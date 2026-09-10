import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/reports-data";

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section className={cn("surface rounded-2xl text-ink", className)}>{children}</section>
  );
}

export function GlassPanel({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("glass rounded-2xl text-ink", className)}>{children}</section>;
}

const toneClass: Record<Tone, string> = {
  ok: "badge-ok",
  warn: "badge-warn",
  danger: "badge-danger",
  info: "badge-info",
  neutral: "bg-paper-2 text-ink-2",
};

export function Badge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return <span className={cn("badge-base", toneClass[tone])}>{children}</span>;
}

export function Btn({
  variant = "ghost",
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" | "quiet" }) {
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        variant === "solid" && "bg-accent text-accent-foreground hover:opacity-90",
        variant === "ghost" && "border border-line-strong bg-paper text-ink hover:bg-hover",
        variant === "quiet" && "text-ink-2 hover:bg-hover",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-3">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-line-strong bg-field px-3 py-2 text-sm text-ink outline-none transition focus:border-accent";

export function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <th
      className={cn(
        "border-b border-line px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-3",
        right ? "text-right" : "text-left",
      )}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  right,
  className,
}: {
  children: ReactNode;
  right?: boolean;
  className?: string;
}) {
  return (
    <td
      className={cn(
        "border-b border-line px-4 py-3 text-sm text-ink-2",
        right ? "text-right tabular-nums" : "",
        className,
      )}
    >
      {children}
    </td>
  );
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}
