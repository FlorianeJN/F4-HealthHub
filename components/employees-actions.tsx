import { Employee } from "@/lib/definitions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import EditEmployeeForm from "./edit-employee-form";
import Modal from "./modal";
import { Button } from "./ui/button";

interface EmployeeActionProps {
  employee: Employee;
}

export default function EmployeeActions({ employee }: EmployeeActionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    console.log("Deleting employee");
  };

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Ouvrir le menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => setIsEditModalOpen(true)}
            className="hover:cursor-pointer"
          >
            <IconEdit className="mr-2 h-4 w-4" />
            Modifier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-red-600 focus:text-red-600 hover:cursor-pointer"
          >
            <IconTrash className="mr-2 h-4 w-4" />
            Supprimer
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <EditEmployeeForm
          employee={employee}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Confirmer la suppression</h2>
          <p>Êtes-vous sûr de vouloir supprimer cet employé ?</p>
          <p className="font-medium">
            {employee.nom} {employee.prenom}
          </p>
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
