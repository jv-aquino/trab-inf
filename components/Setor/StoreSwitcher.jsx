"use client"

import { Store as StoreIcon, ChevronsUpDown, Check, PlusCircle } from "lucide-react"
import { PopoverTrigger, Popover, PopoverContent } from "@/components/ui/popover"
import { Command, CommandList, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command"

import { useState } from "react"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useParams, useRouter } from "next/navigation";

export default function StoreSwitcher({ items = [] }) {
  const [open, setOpen] = useState(false);

  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => {
    return {
      label: item.nome,
      value: item.id,
      key: item.id
    }
  })
    
  const currentStore = formattedItems.find((item) => {
    return params.storeId === item.value;
  });

  const onStoreSelect = (store) => {
    setOpen(false);
    router.push(`/${store.value}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button aria-expanded={open} aria-label="Selecione uma loja" 
        suppressHydrationWarning className="flex font-semibold items-center border-[1px] border-neutral-200 rounded-md justify-between w-[220px] px-2.5 py-1.5">
          <div className="flex items-center gap-3">
            <StoreIcon />
            <span>{currentStore?.label}</span>
          </div>
          <ChevronsUpDown className="opacity-50 h-[21px] w-[21px]"/>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px]">
        <Command>
          <CommandList>
            <CommandInput placeholder="Pesquisar Loja..." />
            <CommandEmpty>Nenhuma loja encontrada.</CommandEmpty>

            <CommandGroup heading="Lojas">
              {formattedItems.map(store => {
                return (
                  <CommandItem key={store.value} onSelect={() => onStoreSelect(store)} className="flex gap-2 items-center">
                    <StoreIcon className="w-5 h-5" />
                    {store.label}
                    <Check className={((currentStore?.value === store.value) ? 'opacity-100' : 'opacity-0')} />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
                <CommandItem className="flex gap-2 items-center" onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}>
                  <PlusCircle className="w-5 h-5" />
                  Create Store
                </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

      </PopoverContent>
    </Popover>
  )
}