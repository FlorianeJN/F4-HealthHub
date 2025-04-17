"use client";

import { AddressInput } from "@/components/address-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveEnterpriseInfo } from "@/lib/actions";
import { Building2, CheckCircle2, Phone } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface ProfileFormProps {
  enterprise: {
    id?: number;
    nom?: string;
    neq?: string;
    tps?: string;
    tvq?: string;
    telephone?: string;
    email?: string;
    website?: string;
  } | null;
  address: {
    no_civique?: string;
    rue?: string;
    ville?: string;
    province?: string;
    code_postal?: string;
  } | null;
}

export function ProfileForm({ enterprise, address }: ProfileFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    try {
      await saveEnterpriseInfo(formData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    }
  }

  return (
    <>
      <form action={handleSubmit}>
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold">Profil de l&apos;entreprise</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les informations de votre entreprise
            </p>
          </div>
          <Button type="submit" size="lg" className="hover:cursor-pointer">
            Enregistrer
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Informations de l'entreprise */}
          <Card className="bg-card shadow-sm">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">
                  Informations de l&apos;entreprise
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nom-entreprise">
                      Nom de l&apos;entreprise
                    </Label>
                    <Input
                      id="nom-entreprise"
                      name="company"
                      placeholder="F4 HealthHub"
                      className="bg-background"
                      defaultValue={enterprise?.nom || ""}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="neq">NEQ</Label>
                    <Input
                      id="neq"
                      name="neq"
                      placeholder="Numéro d'entreprise du Québec"
                      className="bg-background"
                      defaultValue={enterprise?.neq || ""}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tps">Numéro TPS</Label>
                    <Input
                      id="tps"
                      name="tps"
                      placeholder="Numéro TPS"
                      className="bg-background"
                      defaultValue={enterprise?.tps || ""}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tvq">Numéro TVQ</Label>
                    <Input
                      id="tvq"
                      name="tvq"
                      placeholder="Numéro TVQ"
                      className="bg-background"
                      defaultValue={enterprise?.tvq || ""}
                    />
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Adresse</h3>
                  <AddressInput
                    defaultAddress={{
                      number: address?.no_civique || "",
                      street: address?.rue || "",
                      city: address?.ville || "",
                      province: address?.province || "",
                      postal_code: address?.code_postal || "",
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coordonnées de l'entreprise */}
          <Card className="bg-card shadow-sm">
            <CardHeader className="border-b bg-muted/50">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Coordonnées</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="telephone-entreprise">Téléphone</Label>
                  <Input
                    id="telephone-entreprise"
                    name="phone"
                    type="tel"
                    placeholder="(514) 123-4567"
                    className="bg-background"
                    defaultValue={enterprise?.telephone || ""}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email-entreprise">Email</Label>
                  <Input
                    id="email-entreprise"
                    name="email"
                    type="email"
                    placeholder="contact@f4healthhub.com"
                    className="bg-background"
                    defaultValue={enterprise?.email || ""}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="site-web">Site web</Label>
                  <Input
                    id="site-web"
                    name="website"
                    type="url"
                    placeholder="https://www.f4healthhub.com"
                    className="bg-background"
                    defaultValue={enterprise?.website || ""}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <DialogTitle>Informations sauvegardées</DialogTitle>
            </div>
            <DialogDescription>
              Les informations de votre entreprise ont été sauvegardées avec
              succès.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="default"
              onClick={() => setIsModalOpen(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
