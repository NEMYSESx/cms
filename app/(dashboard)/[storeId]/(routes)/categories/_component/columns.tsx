"use client";

type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const billboardData: BillboardColumn = {
        id: row.original.id,
        label: row.original.billboardLabel,
        createdAt: row.original.createdAt,
      };
      return <CellAction data={billboardData} />;
    },
  },
];
