import Spinner from "@/components/ui/spinner";

export default function LoadingPage() {
  return (
    <div
      className="
          fixed inset-0 
          flex flex-col items-center justify-center 
          bg-opacity-75 
          backdrop-blur-sm 
          animate-fade-in
          p-4
        "
    >
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">
        Loading employees...
      </h1>
      <Spinner />
    </div>
  );
}
