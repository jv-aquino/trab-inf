import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST ( req, { params } ) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { nome, area, estoque, preco } = body;

    if (!userId) {
      return new NextResponse("Não autorizado", { status: 403 });
    }
    if (!nome) {
      return new NextResponse("O nome é necessário", { status: 400 });
    }
    if (!area) {
      return new NextResponse("A área é necessária", { status: 400 });
    }
    if (!estoque) {
      return new NextResponse("O estoque é necessário", { status: 400 });
    }
    
    if (!params.lojaId) {
      return new NextResponse("O id da loja é necessário", { status: 400 });
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

    const vidro = await prismadb.vidro.create({
      data: {
        nome,
        area,
        estoque,
        preco,
      },
    });
  
    return NextResponse.json(vidro);
  } catch (error) {
    console.log('[vidroS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET( req, { params } ) {
  try {
    const { searchParams } = new URL(req.url)

    if (!params.lojaId) {
      return new NextResponse("O id da loja é obrigatório", { status: 400 });
    }

    const vidros = await prismadb.vidro.findMany({
      where: {
        lojaId: params.lojaId,
      },
      orderBy: {
        createdAt: 'asc',
      }
    });
  
    return NextResponse.json(vidros);
  } catch (error) {
    console.log('[vidroS_GET]', error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
};