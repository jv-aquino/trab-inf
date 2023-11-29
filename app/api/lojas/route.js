import { NextResponse } from 'next/server'
import { auth } from "@clerk/nextjs"

import prismadb from '@/lib/prismadb';

export async function POST (req) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { nome } = body;

    if (!userId) {
      return new NextResponse("Unauthorized Route", { status: 401 });
    }
    if (!nome) {
      return new NextResponse("O Nome é obrigatório", { status: 400 });
    }

    const store = await prismadb.loja.create({
      data: {
        nome,
        userId
      }
    });

    return new NextResponse(store.id, { status: 200 });
  } 
  catch (error) {
    console.log("LOJAS_POST: ", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}