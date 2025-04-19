// ConfirmationModal.tsx
import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/70">
      <div className=" bg-background text-foreground rounded-xl p-8 shadow-xl w-full max-w-lg">
        <h2 className="text-lg text-center font-semibold mb-4 pb-4">
          {message}
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:cursor-pointer"
          >
            Supprimer
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 hover:cursor-pointer"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
