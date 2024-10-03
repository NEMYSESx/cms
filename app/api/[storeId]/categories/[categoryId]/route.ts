import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request, //we cannont remove it as paramss  only works as a second argument
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }
    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { name, billboardId } = body;
    const userId = session?.user.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboard id is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse("category id is requird", { status: 400 });
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

    const categories = await db.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request, //we cannont remove it as paramss  only works as a second argument
  { params }: { params: { storeId: string; categoryId: string } }
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
    if (!params.categoryId) {
      return new NextResponse("Category Id id is requird", { status: 400 });
    }

    const category = await db.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Inte4rnal error", { status: 500 });
  }
}
