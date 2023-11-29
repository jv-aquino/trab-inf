"use client"

export default function Modal({children, title, description, isOpen, onClose}) {

  return (
  <div className={"modal " + ((!isOpen) ? "hidden" : "flex")}>
      <div className={"flex flex-col items-center shadow-lg"}>
        <div className="flex w-full justify-between items-center">
          <h2 className="font-bold text-2xl">{title}</h2>
          <button onClick={onClose}><span className="symbol font-semibold text-xl">close</span></button>
        </div>
        <p className="text-gray-500 font-medium description">{description}</p>
        { children }
      </div>
  </div>
  )
}