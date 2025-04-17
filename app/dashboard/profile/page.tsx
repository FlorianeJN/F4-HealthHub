import { AddressInput } from "@/components/address-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveEnterpriseInfo } from "@/lib/actions";
import { Building2, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "F4 HealthHub - Profil de l&apos;entreprise",
  description: "Informations sur l&apos;entreprise",
};

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-4 px-4 md:gap-8 md:py-6 lg:px-6">
          <form action={saveEnterpriseInfo}>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h1 className="text-2xl font-bold">
                  Profil de l&apos;entreprise
                </h1>
                <p className="text-muted-foreground mt-1">
                  Gérez les informations de votre entreprise
                </p>
              </div>
              <Button type="submit" size="lg">
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
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="neq">NEQ</Label>
                        <Input
                          id="neq"
                          name="neq"
                          placeholder="Numéro d'entreprise du Québec"
                          className="bg-background"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tps">Numéro TPS</Label>
                        <Input
                          id="tps"
                          name="tps"
                          placeholder="Numéro TPS"
                          className="bg-background"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tvq">Numéro TVQ</Label>
                        <Input
                          id="tvq"
                          name="tvq"
                          placeholder="Numéro TVQ"
                          className="bg-background"
                        />
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4">Adresse</h3>
                      <AddressInput />
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
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
