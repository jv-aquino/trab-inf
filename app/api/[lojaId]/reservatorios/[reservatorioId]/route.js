import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET( req, { params } ) {
  try {
    if (!params.categoriaId) {
      return new NextResponse("O id da categoria é necessário", { status: 400 });
    }

    const categoria = await prismadb.categoria.findUnique({
      where: {
        id: params.categoriaId
      }
    });
  
    return NextResponse.json(categoria);
  } catch (error) {
    console.log('[CATEGORIA_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE( req, { params } ) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Não autorizado", { status: 403 });
    }

    if (!params.categoriaId) {
      return new NextResponse("O id da categoria é necessário", { status: 400 });
    }

    const lojaByUserId = await prismadb.loja.findFirst({
      where: {
        id: params.lojaId,
        userId,
      }
    });

    if (!lojaByUserId) {
      return new NextResponse("Não autorizado", { status: 405 });
    }

    const categoria = await prismadb.categoria.delete({
      where: {
        id: params.categoriaId,
      }
    });
  
    return NextResponse.json(categoria);
  } catch (error) {
    console.log('[CATEGORIA_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH( req, { params } ) {
  try {   
    const { userId } = auth();

    const body = await req.json();
    
    const { nome, descricao, chave, empresaId } = body;
    
    if (!userId) {
      return new NextResponse("Não autorizado", { status: 403 });
    }

    if (!nome) {
      return new NextResponse("O Nome é necessário", { status: 400 });
    }
    if (!descricao) {
      return new NextResponse("O Nome é necessário", { status: 400 });
    }
    if (!chave) {
      return new NextResponse("A palavra chave é necessária", { status: 400 });
    }
    if (!empresaId) {
      return new NextResponse("O id da empresa é necessário", { status: 400 });
    }

    if (!params.categoriaId) {
      return new NextResponse("O id do categoria é necessário", { status: 400 });
    }


    const lojaByUserId = await prismadb.loja.findFirst({
      where: {
        id: params.lojaId,
        userId,
      }
    });

    if (!lojaByUserId) {
      return new NextResponse("Não autorizado", { status: 405 });
    }

    const categoria = await prismadb.categoria.update({
      where: {
        id: params.categoriaId,
      },
      data: {
        nome,
        descricao,
        chave,
        empresaId
      }
    });
  
    return NextResponse.json(categoria);
  } catch (error) {
    console.log('[CATEGORIA_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};