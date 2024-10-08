import { db } from "@/lib/db";
import React from "react";

interface DashBoardProps {
  params: { storeId: string };
}

const SizesPage = async ({ params }: DashBoardProps) => {
  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Active Store: {store?.name}</div>;
};

export default SizesPage;
