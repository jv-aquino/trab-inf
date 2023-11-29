import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home({ children }) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in")
  }

  const store = await prismadb.loja.findFirst({
    where: {
      userId
    }
  })

  if (store) {
    redirect(`/${store.id}`)
  }

  return (
    <>
      {children}
    </>
  )
}