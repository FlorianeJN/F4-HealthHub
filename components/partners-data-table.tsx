import { DataTable } from "@/components/data-table";
import { partnerColumns } from "@/lib/column-definitions";
import { fetchPartners } from "@/lib/data";

export default async function PartnersDataTable() {
  //Server component, we can directly fetch the partners
  const data = await fetchPartners();
  return (
    <div>
      <DataTable columns={partnerColumns} data={data} type="partner" />
    </div>
  );
}
