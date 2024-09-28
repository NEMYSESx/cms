import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const session = await auth();
    const id = session?.user.id;
    if (!id) return new NextResponse("User ID is missing", { status: 400 });
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name } = body;
    if (!name) return new NextResponse("Name is required", { status: 400 });

    const store = await db.store.create({
      data: {
        name,
        userId: id,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("StorePost", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



