import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { columns } from "@/data/table-definitions";

const data = [
  {
    id: 1,
    header: "Cover page",
    type: "Cover page",
    status: "In Process",
    target: "18",
    limit: "5",
    reviewer: "Eddie Lake",
  },
  {
    id: 2,
    header: "Table of contents",
    type: "Table of contents",
    status: "Done",
    target: "29",
    limit: "24",
    reviewer: "Eddie Lake",
  },
  {
    id: 3,
    header: "Executive Summary",
    type: "Summary",
    status: "In Process",
    target: "17",
    limit: "50",
    reviewer: "Assign reviewer",
  },
  {
    id: 4,
    header: "Business Description",
    type: "Narrative",
    status: "In Process",
    target: "14",
    limit: "30",
    reviewer: "Assign reviewer",
  },
  {
    id: 5,
    header: "Market Analysis",
    type: "Analysis",
    status: "In Process",
    target: "23",
    limit: "20",
    reviewer: "Assign reviewer",
  },
  {
    id: 6,
    header: "Competitive Landscape",
    type: "Analysis",
    status: "Done",
    target: "22",
    limit: "20",
    reviewer: "Eddie Lake",
  },
  {
    id: 7,
    header: "Product / Service Description",
    type: "Narrative",
    status: "Done",
    target: "16",
    limit: "30",
    reviewer: "Eddie Lake",
  },
  {
    id: 8,
    header: "Marketing Plan",
    type: "Plan",
    status: "In Process",
    target: "15",
    limit: "40",
    reviewer: "Assign reviewer",
  },
  {
    id: 9,
    header: "Operations Plan",
    type: "Plan",
    status: "In Process",
    target: "18",
    limit: "35",
    reviewer: "Assign reviewer",
  },
  {
    id: 10,
    header: "Management Team",
    type: "Narrative",
    status: "Done",
    target: "20",
    limit: "25",
    reviewer: "Eddie Lake",
  },
];

export default function DashboardView() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
