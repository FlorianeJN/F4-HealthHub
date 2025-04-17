import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddressInputProps {
  className?: string;
  defaultAddress?: {
    number: string;
    street: string;
    city: string;
    province: string;
    postal_code: string;
  };
}

const PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "Colombie-Britannique" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "Nouveau-Brunswick" },
  { code: "NL", name: "Terre-Neuve-et-Labrador" },
  { code: "NS", name: "Nouvelle-Écosse" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Île-du-Prince-Édouard" },
  { code: "QC", name: "Québec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "NT", name: "Territoires du Nord-Ouest" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

export function AddressInput({ className, defaultAddress }: AddressInputProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="no-civique">Numéro civique</Label>
          <Input
            id="no-civique"
            name="address_number"
            placeholder="Numéro civique"
            className="bg-background"
            defaultValue={defaultAddress?.number || ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="rue">Rue</Label>
          <Input
            id="rue"
            name="address_street"
            placeholder="Nom de la rue"
            className="bg-background"
            defaultValue={defaultAddress?.street || ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="ville">Ville</Label>
          <Input
            id="ville"
            name="address_city"
            placeholder="Ville"
            className="bg-background"
            defaultValue={defaultAddress?.city || ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="province">Province</Label>
          <Select
            name="address_province"
            defaultValue={defaultAddress?.province || ""}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Sélectionnez une province" />
            </SelectTrigger>
            <SelectContent>
              {PROVINCES.map((province) => (
                <SelectItem key={province.code} value={province.code}>
                  {province.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="code-postal">Code postal</Label>
          <Input
            id="code-postal"
            name="address_postal_code"
            placeholder="Code postal"
            className="bg-background"
            defaultValue={defaultAddress?.postal_code || ""}
          />
        </div>
      </div>
    </div>
  );
}
