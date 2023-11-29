"use client"

import { useEffect, useState } from "react"
import Modal from './Modal'

export default function AlertModal({ isOpen, onClose, onConfirm, loading }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, [])
  
  if (!isMounted) {
    return null;
  }
  else {
    return (
      <Modal
        title="Tem certeza?"
        description="Isso não poderá ser desfeito."
        isOpen={isOpen}
        onClose={onClose}
      > 
        <div className="pt-2 pr-3 flex gap-2 self-end">
          <button className="bg-white text-black border-2 border-black px-2 py-1" onClick={onClose}>Cancelar</button>
          <button className="bg-red-600 text-white px-2 py-1" onClick={onConfirm}>Confirmar</button>
        </div>
      </Modal>
    )
  }
}