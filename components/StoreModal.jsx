import { useState } from "react";
import Modal from "./Modal";
import { useStoreModal } from "@/hooks/use-store-modal";

import axios from "axios";
import { toast } from "react-hot-toast";

export default function StoreModal() {
  const storeModal = useStoreModal();

  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  const submitFunction = () => {
    if (loading) { return }

    try {
      setLoading(true);

      axios.post('/api/lojas', { nome }).then(res => {
        window.location.assign(`/${res.data}`);
      })

      toast.success("Painel criado");
    } 
    catch (error) {
      toast.error("Erro: " + error);
    } finally {
      setLoading(false);
    }
  }

  return(
    <Modal title="Criar Painel" description="Para administrar os vidros e os reservatórios (de hidrogênio)" 
    isOpen={storeModal.isOpen} onClose={storeModal.onClose}>
      <form className="gap-3 pt-3" onSubmit={submitFunction}>
        <div className="flex gap-2 items-center">
          <label htmlFor="nome" className="text-[17px]">Nome: </label>
          <input id="nome" value={nome} required placeholder="Painel CTIG" onChange={(e) => setNome(e.target.value)} 
          className="text-[16px]"/>
        </div>

        <button className={"text-white font-medium rounded-md px-3 py-1.5 " + ((loading) ? "bg-slate-400" : "bg-black")} type="submit">Adicionar</button>
      </form>
    </Modal>
  );
}