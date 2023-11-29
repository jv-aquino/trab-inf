import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(req, { params }) {
  try {
    const { userId } = auth();
    if (!userId) { return new NextResponse("Usuário não autenticado", { status: 401 })}

    const body = await req.json();
    const { nome } = body;

    if (!nome) {
      return new NextResponse("O Nome é obrigatório", { status: 400 })
    } 
    if (!params.lojaId) {
      return new NextResponse("O id da Loja é obrigatório", { status: 400 })
    }

    const loja = await prismadb.loja.updateMany({
      where: {
        userId,
        id: params.lojaId
      },
      data: {
        nome
      }
    })

    return new NextResponse(loja, { status: 200})
  }
  catch (error) {
    console.log('[LOJA_PATCH]: ', error);
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const { userId } = auth();
    if (!userId) { return new NextResponse("Usuário não autenticado", { status: 401 })}

    if (!params.lojaId) {
      return new NextResponse("O id da Loja é obrigatório", { status: 400 })
    }

    const loja = await prismadb.loja.deleteMany({
      where: {
        id: params.lojaId,
        userId
      }
    })

    return new NextResponse(loja, { status: 200})
  }
  catch (error) {
    console.log('[LOJA_PATCH]: ', error);
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}