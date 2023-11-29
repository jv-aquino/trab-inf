import { UserButton, auth } from "@clerk/nextjs"
import MainNav from '@/components/MainNav'
import prismadb from "@/lib/prismadb";
import { redirect } from 'next/navigation';

export default async function Navbar({ loja }) {
  const { userId } = auth();
  if (!userId) { redirect('/sign-in') }

  return (
    <nav className="pl-5 pr-4 py-5 flex items-center">
      <div className="flex gap-[36px]">
        <MainNav nome={loja.nome} />
      </div>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  )
}