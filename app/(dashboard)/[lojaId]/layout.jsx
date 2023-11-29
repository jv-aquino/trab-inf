import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation";

import Navbar from "@/components/Navbar"

export default async function DashboardLayout({ children, params }) {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in')
  }

  const store = await prismadb.loja.findFirst({
    where: {
      id: params.lojaId,
      userId
    }
  })

  if (!store) {
    redirect('/')
  }

  return (
    <>
      <Navbar loja={store} />
      {children}
    </>
  )
}