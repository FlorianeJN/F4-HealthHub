"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function InvoiceTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-base font-semibold w-[150px]">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="text-base font-semibold w-[200px]">
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead className="text-base font-semibold">
                <Skeleton className="h-4 w-32" />
              </TableHead>
              <TableHead className="text-base font-semibold w-[150px]">
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead className="text-base font-semibold w-[150px]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="text-base font-semibold w-[100px]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="py-4 text-base">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="py-4 text-base">
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="py-4 text-base">
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell className="py-4 text-base">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="py-4 text-base">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell className="py-4 text-base">
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <Skeleton className="h-4 w-32" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
