import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    const id = session?.user.id;
    if (!id) return new NextResponse("User ID is missing", { status: 400 });
    if (!session) return new NextResponse("Unauthenticated", { status: 401 });

    const body = await req.json();
    const { name, billboardId } = body;
    if (!name) return new NextResponse("name is required", { status: 400 });
    if (!billboardId)
      return new NextResponse("billboardId is required", { status: 400 });
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }
    const storeByUserId = await db.store.findFirst({
      where: {
        id: params.storeId,
        userId: id,
      },
    });
    if (!storeByUserId) {
      //someone is trying to update someone else store
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const category = await db.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[Categories.POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth();
    // const id = session?.user.id;
    // if (!id) return new NextResponse("User ID is missing", { status: 400 });
    // if (!session) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const categories = await db.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[Categories.GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
