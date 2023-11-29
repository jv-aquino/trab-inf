"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import AlertModal from "@/components/AlertModal";

export default function CellAction ({ data }) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.lojaId}/produtos/${data.id}`);
      window.location.reload(true);
      toast.success('Produto deletado.');
    } catch (error) {
      toast.error('Remova todas as categorias que usam esse produto antes.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success('ID copiado.');
  }

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={() => onConfirm()}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 p-0 flex items-center justify-center">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-[18px] w-[18px]" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer font-medium"
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer font-medium"
            onClick={() => router.push(`/${params.lojaId}/produtos/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Atualizar
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-600 focus:text-red-600 cursor-pointer font-medium"
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};