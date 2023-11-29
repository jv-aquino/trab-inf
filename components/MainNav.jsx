"use client"

import { usePathname, useParams } from 'next/navigation';
  
import Link from 'next/link'

export default function MainNav({ nome }) {
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.lojaId}/`,
      label: 'Início',
      active: pathName === `/${params.lojaId}`
    },
    {
      href: `/${params.lojaId}/vidros`,
      label: 'Vidros',
      active: pathName === `/${params.lojaId}/vidros`
    },
    {
      href: `/${params.lojaId}/reservatorios`,
      label: 'Reservatórios',
      active: pathName === `/${params.lojaId}/reservatorios`
    },
    {
      href: `/${params.lojaId}/config`,
      label: 'Configurações',
      active: pathName === `/${params.lojaId}/config`
    }
  ]

  return (
    <div className="flex items-center gap-[20px]">
      <h1 className="pl-4 pr-10 font-bold text-[20px]">{nome}</h1>

      {routes.map(route => {
        return ( 
          <Link className={"font-semibold text-[17px] " + ((route.active) ? "text-purple-700 font-bold" : "text-zinc-500  hover:text-pink-600")}
          key={route.href} href={route.href} >
            {route.label}
          </Link>
        )
      })}
    </div>
  )
}