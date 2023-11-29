import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST( req, { params } ) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { nome, descricao, chave, empresaId } = body;

    if (!userId) {
      return new NextResponse("Não autorizado", { status: 403 });
    }

    if (!nome) {
      return new NextResponse("O nome é necessário", { status: 400 });
    }
    if (!descricao) {
      return new NextResponse("A descrição é necessária", { status: 400 });
    }
    if (!chave) {
      return new NextResponse("A palavra chave é necessária", { status: 400 });
    }
    if (!empresaId) {
      return new NextResponse("O id da empresa é necessário", { status: 400 });
    }

    if (!params.lojaId) {
      return new NextResponse("ID da Loja é necessário", { status: 400 });
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

    const categoria = await prismadb.categoria.create({
      data: {
        nome,
        descricao,
        chave,
        empresaId,
        lojaId: params.lojaId,
      }
    });
  
    return NextResponse.json(categoria);
  } catch (error) {
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET( req, { params } ) {
  const { searchParams } = new URL(req.url)
  const empresaId = searchParams.get('empresaId') || undefined;
  try {
    if (!params.lojaId) {
      return new NextResponse("O id da loja é necessário", { status: 400 });
    }

    const categorias = await prismadb.categoria.findMany({
      where: {
        lojaId: params.lojaId
      },
      include: {
        empresa: true,
      }
    });
  
    return NextResponse.json(categorias);
  } catch (error) {
    console.log('[CATEGORIAS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};