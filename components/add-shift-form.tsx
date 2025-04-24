import { addShift } from "@/lib/actions";
import { fetchEmployees } from "@/lib/data";
import { Employee } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "./date-picker";
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

export const formSchema = z.object({
  date: z.string().min(1, "La date est requise."),
  prestation: z.string().min(1, "La prestation est requise."),
  debutQuart: z.string().min(1, "L'heure de début est requise."),
  finQuart: z.string().min(1, "L'heure de fin est requise."),
  pauseCheck: z.boolean(),
  pause: z.string(),
  tempsDouble: z.boolean(),
  tempsDemi: z.boolean(),
  tempsTotal: z.string().min(1, "Le temps total est requis."),
  tauxHoraire: z.string().min(1, "Le taux horaire est requis."),
  montantHorsTaxes: z.string().min(1, "Le montant HT est requis."),
  useQuartPredefini: z.boolean().optional(),
  employeId: z.number().optional(),
  associerEmploye: z.boolean().optional(),
  notes: z.string(),
});

type addShiftFormProps = {
  onClose: () => void;
};

export default function AddShiftForm({ onClose }: addShiftFormProps) {
  //Extracting the invoice number from the URL
  const pathName = usePathname();
  const numFacture = pathName.split("/").pop() || ""; // Get the last part of the URL

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
      notes: " ",
      useQuartPredefini: false,
    },
  });

  const [employees, setEmployees] = useState<Employee[]>([]);

  //Extracting the form watchers for use effect dependencies
  const tauxHoraireWatcher = form.watch("tauxHoraire");
  const tempsTotalWatcher = form.watch("tempsTotal");
  const tempsDoubleWatcher = form.watch("tempsDouble");
  const tempsDemiWatcher = form.watch("tempsDemi");
  const pauseCheckWatcher = form.watch("pauseCheck");
  const debutQuartWatcher = form.watch("debutQuart");
  const finQuartWatcher = form.watch("finQuart");
  const pauseWatcher = form.watch("pause");
  const prestationWatcher = form.watch("prestation");

  // Function to fetch employees from the database
  useEffect(() => {
    //Not using async/await here because by the time the user gets to this point, the data is already fetched and set in the state.
    fetchEmployees().then((data: Employee[]) => {
      setEmployees(data);
    });
  }, []);

  // Effect to update the pause time based on the checkbox state
  // This effect will run whenever the pauseCheck checkbox changes
  useEffect(() => {
    if (form.watch("pauseCheck")) {
      form.setValue("pause", "00:45");
    } else {
      form.setValue("pause", "00:00");
    }
  }, [form, pauseCheckWatcher]);

  // Effect to update the notes based on the selected checkboxes
  // This effect will run whenever the tempsDouble or tempsDemi checkboxes change
  useEffect(() => {
    const double = form.getValues("tempsDouble");
    const demi = form.getValues("tempsDemi");

    const noteLines: string[] = [];

    if (double) noteLines.push("Temps double appliqué");
    if (demi) noteLines.push("Temps et demi appliqué");

    form.setValue("notes", noteLines.join("\n"));
  }, [form, tempsDoubleWatcher, tempsDemiWatcher]);

  // Effect to show the calculated total time in the form
  // This effect will run whenever the start time, end time, or pause time changes
  useEffect(() => {
    const debut = form.getValues("debutQuart");
    const fin = form.getValues("finQuart");
    const pauseCheck = form.getValues("pauseCheck");
    const pause = pauseCheck ? form.getValues("pause") || "00:00" : "00:00";

    if (debut && fin) {
      const getTimeInMinutes = (timeStr: string): number => {
        const [h, m] = timeStr.split(":").map(Number);
        return h * 60 + m;
      };

      const start = getTimeInMinutes(debut);
      let end = getTimeInMinutes(fin);

      if (isNaN(start) || isNaN(end)) return;

      if (end <= start) end += 24 * 60;

      const totalMinutes = end - start - getTimeInMinutes(pause);
      const hours = Math.floor(totalMinutes / 60)
        .toString()
        .padStart(2, "0");
      const minutes = (totalMinutes % 60).toString().padStart(2, "0");

      form.setValue("tempsTotal", `${hours}:${minutes}`);
    }
  }, [
    form,
    debutQuartWatcher,
    finQuartWatcher,
    pauseWatcher,
    pauseCheckWatcher,
  ]);

  // Effect to set the hourly rate based on the selected prestation
  // This effect will run whenever the prestation, the double time or half time checkbox changes
  useEffect(() => {
    const prestation = form.getValues("prestation");

    const tauxMap: Record<string, number> = {
      inf_clinicien: 74.36,
      soins_infirmiers: 71.87,
      inf_aux: 47.65,
      pab: 41.96,
    };

    if (prestation in tauxMap) {
      let baseTaux = tauxMap[prestation];
      if (form.getValues("tempsDouble")) {
        baseTaux *= 2;
      } else if (form.getValues("tempsDemi")) {
        baseTaux *= 1.5;
      }

      form.setValue("tauxHoraire", baseTaux.toFixed(2));
    }
  }, [form, prestationWatcher, tempsDoubleWatcher, tempsDemiWatcher]);

  // Effect to calculate the amount based on the hourly rate and total time
  // This effect will run whenever the total time or hourly rate changes
  useEffect(() => {
    const taux = parseFloat(form.getValues("tauxHoraire"));
    const total = form.getValues("tempsTotal");

    if (taux && total && total.includes(":")) {
      const [h, m] = total.split(":").map(Number);
      if (!isNaN(h) && !isNaN(m)) {
        const totalHeures = h + m / 60;
        const montant = totalHeures * taux;
        form.setValue("montantHorsTaxes", montant.toFixed(2));
      }
    }
  }, [form, tauxHoraireWatcher, tempsTotalWatcher]);

  function handleAction(data: z.infer<typeof formSchema>) {
    //  const formData = new FormData(data);

    console.log("data:", data);
    addShift(data, numFacture);
    form.reset();
  }

  return (
    <div className="fixed inset-0 z-50  bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAction)}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
              <h2 className="text-lg  font-semibold text-foreground md:text-2xl">
                Ajouter un Quart de travail
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
                {/* ... All left fields (date, prestation, début, etc.) */}
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
                  Ajouter le quart
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
