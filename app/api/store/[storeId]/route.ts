import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { name } = body;
    const userId = session?.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is requird", { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request, //we cannont remove it as paramss  only works as a second argument
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!session?.user.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is requird", { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}
