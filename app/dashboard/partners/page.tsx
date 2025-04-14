import PartnersDataTable from "@/components/partners-data-table";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
          <h1 className="text-2xl font-bold">
            Vue d&apos;ensemble des Partenaires
          </h1>

          <PartnersDataTable />

          <div>
            <h2 className="text-xl font-semibold mb-2">Chart 1</h2>
            {/* Add your chart component here */}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Chart 2</h2>
            {/* Add your chart component here */}
          </div>
        </div>
      </div>
    </div>
  );
}
