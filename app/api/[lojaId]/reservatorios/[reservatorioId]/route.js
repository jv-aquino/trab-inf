import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET( req, { params } ) {
  try {
    if (!params.reservatorioId) {
      return new NextResponse("O id da reservatorio é necessário", { status: 400 });
    }

    const reservatorio = await prismadb.reservatorio.findUnique({
      where: {
        id: params.reservatorioId
      }
    });
  
    return NextResponse.json(reservatorio);
  } catch (error) {
    console.log('[reservatorio_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE( req, { params } ) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Não autorizado", { status: 403 });
    }

    if (!params.reservatorioId) {
      return new NextResponse("O id da reservatorio é necessário", { status: 400 });
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

    const reservatorio = await prismadb.reservatorio.delete({
      where: {
        id: params.reservatorioId,
      }
    });
  
    return NextResponse.json(reservatorio);
  } catch (error) {
    console.log('[reservatorio_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH( req, { params } ) {
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


    if (!params.reservatorioId) {
      return new NextResponse("O id do reservatorio é necessário", { status: 400 });
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

    const reservatorio = await prismadb.reservatorio.update({
      where: {
        id: params.reservatorioId,
      },
      data: {
        nome, volumeTotal, hidrogenio, combustivel
      }
    });
  
    return NextResponse.json(reservatorio);
  } catch (error) {
    console.log('[reservatorio_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};