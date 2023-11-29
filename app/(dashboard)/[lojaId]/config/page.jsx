import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import prismadb from '@/lib/prismadb'

import SettingsForm from "@/components/Config/SettingsForm";

export default async function SettingsPage({ params }) {
  const { userId } = auth();

  if (!userId) { redirect('/sign-in') }

  let loja = await prismadb.loja.findFirst({
    where: {
      id: params.lojaId,
      userId
    }
  })

  if (!loja) {
    redirect("/")
  }
  

  return (
    <div className="flex flex-col p-4">
      <SettingsForm initialData={loja} />
    </div>
  )
}