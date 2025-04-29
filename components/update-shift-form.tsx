import { fetchEmployees } from "@/lib/data";
import { Employee } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { DatePicker } from "./date-picker";
import { formSchema } from "./shift-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type updateShiftFormProps = {
  shiftId: number;
  onClose: () => void;
};

export default function UpdateShiftForm({
  shiftId,
  onClose,
}: updateShiftFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      prestation: "",
      debutQuart: "",
      finQuart: "",
      pauseCheck: false,
      pause: "00:00",
      tempsDouble: false,
      tempsDemi: false,
      tempsTotal: "",
      tauxHoraire: "",
      montantHorsTaxes: "",
      notes: "",
      useQuartPredefini: false,
      associerEmploye: false,
    },
  });

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchEmployees().then(setEmployees);
  }, []);

  const handleUpdate = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    console.log(shiftId);
    toast.success("Quart mis à jour avec succès!");
    //onClose();
  };

  return (
    <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
              <h2 className="text-lg  font-semibold text-foreground md:text-2xl">
                Mise à jour Quart de travail
              </h2>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-3xl font-bold leading-none hover:cursor-pointer"
                onClick={onClose}
              >
                &times;
              </button>
            </div>

            {/* Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem aria-required>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="prestation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prestation</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Choisir une prestation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inf_clinicien">
                              Inf Clinicien(ne)
                            </SelectItem>
                            <SelectItem value="soins_infirmiers">
                              Soins Infirmiers
                            </SelectItem>
                            <SelectItem value="inf_aux">
                              Inf Auxiliaire
                            </SelectItem>
                            <SelectItem value="pab">PAB</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="useQuartPredefini"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          id="use-quart-predefini"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel htmlFor="use-quart-predefini">
                        Utiliser un quart prédéfini ?
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {form.watch("useQuartPredefini") && (
                  <FormItem>
                    <FormLabel>Quart prédéfini</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          const quarts = {
                            "7-15": { debut: "07:00", fin: "15:00" },
                            "15-23": { debut: "15:00", fin: "23:00" },
                            "23-7": { debut: "23:00", fin: "07:00" },
                            "7-19": { debut: "07:00", fin: "19:00" },
                            "19-7": { debut: "19:00", fin: "07:00" },
                          };

                          const { debut, fin } =
                            quarts[value as keyof typeof quarts];

                          form.setValue("debutQuart", debut);
                          form.setValue("finQuart", fin);
                        }}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Choisir un quart" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7-15">7h00 - 15h00</SelectItem>
                          <SelectItem value="15-23">15h00 - 23h00</SelectItem>
                          <SelectItem value="23-7">23h00 - 7h00</SelectItem>
                          <SelectItem value="7-19">7h00 - 19h00</SelectItem>
                          <SelectItem value="19-7">19h00 - 7h00</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}

                <FormField
                  control={form.control}
                  name="debutQuart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Début du quart</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="finQuart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fin du quart</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pauseCheck"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Pause ?</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pause"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temps de pause</FormLabel>
                      <FormControl>
                        <Input
                          type="time"
                          {...field}
                          disabled={!form.watch("pauseCheck")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tempsDouble"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Temps double</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tempsDemi"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Temps et demi</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="tempsTotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temps total</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Généré automatiquement"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tauxHoraire"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taux horaire</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          step="0.01"
                          {...field}
                          placeholder="Généré automatiquement"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="montantHorsTaxes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Montant HT</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          placeholder="Généré automatiquement"
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="associerEmploye"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          id="associer-employe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel htmlFor="associer-employe">
                        Associer un employé ?
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {form.watch("associerEmploye") && (
                  <FormField
                    control={form.control}
                    name="employeId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employé</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value?.toString() ?? ""}
                            onValueChange={(val) =>
                              field.onChange(parseInt(val))
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Sélectionner un employé" />
                            </SelectTrigger>
                            <SelectContent>
                              {employees.map((emp) => (
                                <SelectItem
                                  key={emp.id}
                                  value={emp.id.toString()}
                                >
                                  {emp.prenom} {emp.nom}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full border rounded p-2"
                          rows={4}
                          placeholder="..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit */}

              <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
                <Button className="hover:cursor-pointer">
                  Mettre a jour le quart
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
