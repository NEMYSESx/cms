import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request, //we cannont remove it as paramss  only works as a second argument
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse("Billboard is required", { status: 400 });
    }
    const billboard = await db.store.findUnique({
      where: {
        id: params.billboardId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    const userId = session?.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("imageUrl is required", { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse("billboard id is requird", { status: 400 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      //someone is trying to update someone else store
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const billboard = await db.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_PATCH]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request, //we cannont remove it as paramss  only works as a second argument
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      //someone is trying to update someone else store
      return new NextResponse("Unauthorized", { status: 403 });
    }
    if (!params.billboardId) {
      return new NextResponse("BillboardId id is requird", { status: 400 });
    }

    const billboard = await db.store.deleteMany({
      where: {
        id: params.billboardId,
        userId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}
