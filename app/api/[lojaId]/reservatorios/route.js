import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST( req, { params } ) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { nome, volumeTotal, hidrogenio, combustivel } = body;

    if (!userId) {
      return new NextResponse("Não autorizado", { status: 403 });
    }

    if (!nome) {
      return new NextResponse("O nome é necessário", { status: 400 });
    }
    if (!volumeTotal) {
      return new NextResponse("O volume total é necessário", { status: 400 });
    }
    if (!hidrogenio) {
      return new NextResponse("O volume de hidrogênio é necessário", { status: 400 });
    }
    if (!combustivel) {
      return new NextResponse("O volume de combustível é necessária", { status: 400 });
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

    const reservatorio = await prismadb.reservatorio.create({
      data: {
        nome,
        volumeTotal, 
        hidrogenio, 
        combustivel,
        lojaId: params.lojaId,
      }
    });
  
    return NextResponse.json(reservatorio);
  } catch (error) {
    console.log('[reservatorios_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET( req, { params } ) {
  const { searchParams } = new URL(req.url)
  try {
    if (!params.lojaId) {
      return new NextResponse("O id da loja é necessário", { status: 400 });
    }

    const reservatorios = await prismadb.reservatorio.findMany({
      where: {
        lojaId: params.lojaId
      },
    });
  
    return NextResponse.json(reservatorios);
  } catch (error) {
    console.log('[reservatorioS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};