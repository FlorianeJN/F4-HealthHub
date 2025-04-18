"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Shift } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";

interface InvoiceShiftsTableProps {
  shifts: Shift[];
}

export function InvoiceShiftsTable({ shifts }: InvoiceShiftsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des quarts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Début</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Pause</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Prestation</TableHead>
                <TableHead>Taux</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Double</TableHead>
                <TableHead>Demi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shifts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">
                    Aucun quart trouvé
                  </TableCell>
                </TableRow>
              ) : (
                shifts.map((shift) => (
                  <TableRow key={shift.id}>
                    <TableCell>{formatDate(shift.date_quart)}</TableCell>
                    <TableCell>{shift.debut_quart}</TableCell>
                    <TableCell>{shift.fin_quart}</TableCell>
                    <TableCell>{shift.pause}</TableCell>
                    <TableCell>{shift.temps_total}</TableCell>
                    <TableCell>{shift.prestation}</TableCell>
                    <TableCell>{shift.taux_horaire} $</TableCell>
                    <TableCell>{shift.montant_total} $</TableCell>
                    <TableCell>{shift.temps_double ? "Oui" : "Non"}</TableCell>
                    <TableCell>{shift.temps_demi ? "Oui" : "Non"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
