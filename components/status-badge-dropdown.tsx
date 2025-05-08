"use client";

import { Badge } from "@/components/ui/badge";
import { updateStatus } from "@/lib/actions";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type StatusBadgeDropdownProps = {
  currentStatus: string;
};

const statuses = ["Payée", "Envoyée", "Prête", "À compléter"] as const;

export default function StatusBadgeDropdown({
  currentStatus,
}: StatusBadgeDropdownProps) {
  const [status, setStatus] = useState<string>(currentStatus);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const numFacture = pathname.split("/").pop(); // Extracts the last segment of the path

  // Sync internal state with prop changes
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getBadgeClasses = (status: string) => {
    return (
      "cursor-pointer px-3 py-1 rounded-md text-white text-sm font-medium " +
      (status === "Payée"
        ? "bg-green-600 hover:bg-green-700"
        : status === "Envoyée"
        ? "bg-indigo-600 hover:bg-indigo-700"
        : status === "Prête"
        ? "bg-blue-500 hover:bg-blue-600"
        : status === "À compléter"
        ? "bg-red-500 hover:bg-red-600"
        : "bg-gray-500 hover:bg-gray-600")
    );
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!numFacture) return;

    const previousStatus = status; // Save old status for rollback
    setStatus(newStatus); // Optimistic UI
    setOpen(false);

    try {
      await updateStatus(newStatus, numFacture);
      console.log("Status updated on server");
      toast.success("Status mis à jour!");
    } catch (error) {
      console.error("Failed to update status:", error);
      setStatus(previousStatus); // Roll back
      toast.error("Problème avec la mise à jour du statut");
    }
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setOpen((prev) => !prev)}>
        <Badge variant="default" className={getBadgeClasses(status)}>
          {status}
        </Badge>
      </div>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-38 bg-background p-2 rounded-lg shadow-lg border border-gray-200 space-y-2">
          {statuses.map((s) => {
            const colorClasses =
              s === "Payée"
                ? "bg-green-600 hover:bg-green-700"
                : s === "Envoyée"
                ? "bg-indigo-600 hover:bg-indigo-700"
                : s === "Prête"
                ? "bg-blue-500 hover:bg-blue-600"
                : s === "À compléter"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-500 hover:bg-gray-600";

            return (
              <div
                key={s}
                onClick={() => handleStatusChange(s)}
                className={`text-white text-sm font-medium text-center cursor-pointer px-3 py-1 rounded-md transition-colors duration-150 ${colorClasses}`}
              >
                {s}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
