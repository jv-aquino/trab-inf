import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET( req, { params } ) {
  try {
    if (!params.vidroId) {
      return new NextResponse("O id do vidro é necessário", { status: 400 });
    }

    const vidro = await prismadb.vidro.findUnique({
      where: {
        id: params.vidroId
      },
    });
  
    return NextResponse.json(vidro);
  } catch (error) {
    console.log('[vidro_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE( req, { params } ) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Não autorizado", { status: 403 });
    }

    if (!params.vidroId) {
      return new NextResponse("O id do vidro é necessário", { status: 400 });
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

    const vidro = await prismadb.vidro.delete({
      where: {
        id: params.vidroId,
      }
    });
  
    return NextResponse.json(vidro);
  } catch (error) {
    console.log('[vidro_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH( req, { params } ) {
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

    const vidro = await prismadb.vidro.update({
      where: {
        id: params.vidroId,
        lojaId: params.lojaId
      },
      data: {
        nome,
        area,
        estoque,
        preco,
      },
    })
  
    return NextResponse.json(vidro);
  } catch (error) {
    console.log('[vidro_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};