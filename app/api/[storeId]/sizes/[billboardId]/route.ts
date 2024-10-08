import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request, //we cannont remove it as paramss  only works as a second argument
  { params }: { params: { sizeId: string } }
) {
  try {
    if (!params.sizeId) {
      return new NextResponse("sizeId is required", { status: 400 });
    }
    const size = await db.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { name, value } = body;
    const userId = session?.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }
    if (!params.sizeId) {
      return new NextResponse("size id is requird", { status: 400 });
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

    const size = await db.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request, //we cannont remove it as paramss  only works as a second argument
  { params }: { params: { storeId: string; sizeId: string } }
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
    if (!params.sizeId) {
      return new NextResponse("SizeId is required id is requird", {
        status: 400,
      });
    }

    const size = await db.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });
    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_DELETE]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}
