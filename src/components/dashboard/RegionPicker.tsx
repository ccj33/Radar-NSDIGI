import React, { useEffect, useMemo, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
import type { Region } from "@/types/region";

export type RegionPickerProps = {
  mode: "macro" | "micro";
  items: Region[];
  value?: Region | null;
  onChange: (region: Region) => void;
  buttonClassName?: string;
};

export const RegionPicker: React.FC<RegionPickerProps> = ({
  mode,
  items,
  value,
  onChange,
  buttonClassName,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const title = mode === "macro" ? "Selecione uma Macrorregião" : "Selecione uma Microrregião";
  const defaultLabel = mode === "macro" ? "Selecionar Macro" : "Selecionar Micro";
  const label = value?.name ?? defaultLabel;

  const filtered = useMemo(() => {
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      // Focar input ao abrir
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      // Devolver foco ao botão
      triggerRef.current?.focus();
    }
  }, [open]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          ref={triggerRef}
          className={buttonClassName}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          {label}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <SheetHeader className="px-4 pt-4 pb-2">
          <SheetTitle>{title}</SheetTitle>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              placeholder="Buscar"
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </SheetHeader>
        <Separator />
        <ScrollArea className="h-[60vh]">
          <div role="listbox" aria-label={title} className="px-1">
            {filtered.map((item) => {
              const selected = value?.id === item.id;
              return (
                <button
                  key={item.id}
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-left px-4 py-3 focus:outline-none focus-visible:ring-2 rounded-md transition-colors hover:bg-primary/10 ${
                    selected ? "bg-primary/10" : ""
                  }`}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  {selected && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default RegionPicker;


