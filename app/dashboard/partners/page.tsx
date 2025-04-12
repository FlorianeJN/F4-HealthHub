import PartnersDataTable from "@/components/partners-data-table";

export default function Page() {
  return (
    <div className="p-4 space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Vue d&apos;ensemble des Partenaires
        </h1>
      </div>

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
  );
}
