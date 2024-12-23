import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SpecializationFieldProps,
  AvailabilityFieldsProps,
  MentorAvailabilityFormValues,
  MentorAvailabilityFormSchema,
} from "@/types/get-started";
import { HourField } from "../hourField";
import { DayPeriodField } from "../DayPeriod";
import { MinuteField } from "../MinuteField";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./TimeDialog";
import { DayField } from "./DayFields";
import { getStartedForm } from "@/data/get-started-data";
import { TimeFields } from "./TimeFields";
import { useForm } from "react-hook-form";
import { AiTwotoneCheckCircle } from "react-icons/ai";

export function AvailabilityFields() {
  const availabilityForm = useForm<MentorAvailabilityFormValues>({
    resolver: zodResolver(MentorAvailabilityFormSchema),
    mode: "onChange",
    defaultValues: {
      availability: {
        monday: undefined,
        tuesday: undefined,
        wednesday: undefined,
        thursday: undefined,
        friday: undefined,
        saturday: undefined,
        sunday: undefined,
      },
    },
  });

  const {
    formState: { errors },
  } = availabilityForm;

  const isDaySelected = () =>
    Object.values(availabilityForm.watch("availability")).some(Boolean); // gets the availabily array and checks if there is atleast one value truthy

  return (
    <div className="space-y-4 flex flex-col justify-center items-center">
      <div className="font-medium text-xl mr-auto">Availability Time</div>
      <Dialog>
        <div className="w-full">
          {/* if the days of work are selected change the add button to edit */}
          {!isDaySelected() ? (
            <DialogTrigger className="w-full">
              <div className="w-4/5 h-14 text-base border border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                <LuPlus className="w-12 h-auto" /> Add Date and Time
              </div>
            </DialogTrigger>
          ) : (
            <div className="flex justify-between items-center px-3">
              <div className="flex gap-2 items-center">
                <AiTwotoneCheckCircle size={20}/>
                <div className="font-medium text-base">Date Added </div>
              </div>
              <DialogTrigger>
                <div className="ml-auto flex justify-end text-blue-600 text-base underline cursor-pointer">
                  Edit
                </div>
              </DialogTrigger>
            </div>
          )}
        </div>
        <DialogContent className="min-w-[680px] p-8 rounded-[8px] space-y-6">
          <DialogHeader className="text-start space-y-2">
            <DialogTitle className="text-2xl font-semibold">
              Add Availability Time
            </DialogTitle>
            <DialogDescription className="text-sm">
              Add your availability Time so we can schedule you with your Mentee
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <DayField
              control={availabilityForm.control}
              options={getStartedForm.DayOptions}
            />
            {isDaySelected() ? (
              <TimeFields
                control={availabilityForm.control}
                errors={errors}
                form={availabilityForm}
                options={getStartedForm.DayOptions}
              />
            ) : null}
          </div>
          <Button className="p-4 w-fit font-medium text-base">Add</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
