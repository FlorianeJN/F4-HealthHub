import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  date: z.string().min(1, "La date est requise."),
  prestation: z.string().min(1, "La prestation est requise."),
  debutQuart: z.string().min(1, "L'heure de début est requise."),
  finQuart: z.string().min(1, "L'heure de fin est requise."),
  pauseCheck: z.boolean(),
  pause: z.string().optional(),
  tempsDouble: z.boolean(),
  tempsDemi: z.boolean(),
  tempsTotal: z.string().min(1, "Le temps total est requis."),
  tauxHoraire: z.string().min(1, "Le taux horaire est requis."),
  montantHorsTaxes: z.string().min(1, "Le montant HT est requis."),
});

type addShiftFormProps = {
  onClose: () => void;
};

export default function AddShiftForm({ onClose }: addShiftFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: "",
      prestation: "",
      debutQuart: "",
      finQuart: "",
      pauseCheck: false,
      pause: "",
      tempsDouble: false,
      tempsDemi: false,
      tempsTotal: "",
      tauxHoraire: "",
      montantHorsTaxes: "",
    },
  });

  function handleAction() {
    console.log("Form data:", form.getValues());
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
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
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
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <Input type="time" {...field} />
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
                        <Input type="number" step="0.01" {...field} />
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
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-2">
                  <Checkbox id="associer-employe" />
                  <label htmlFor="associer-employe">
                    Associer un employé ?
                  </label>
                </div>
                <div>
                  <FormLabel>Employé</FormLabel>
                  <Input placeholder="Sélectionner..." disabled />
                </div>
                <div>
                  <FormLabel>Notes</FormLabel>
                  <textarea
                    className="w-full border rounded p-2"
                    rows={4}
                    placeholder="..."
                  />
                </div>
              </div>

              {/* Submit */}

              <div className="col-span-1 md:col-span-2 flex justify-center mt-6">
                <Button>Ajouter le quart</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
