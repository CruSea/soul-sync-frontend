import { formOptions } from "@/data/create-org"
import { FormTwoProps } from "@/types/create-org"
import { Separator } from "@/components/ui/separator"
import { FocusField } from "./FocusField"
import { RoleField } from "./RoleField"


const FormTwo = ({ formTwo }: FormTwoProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1.5">
        <div className="text-sm text-slate-400">Type the name of your company</div>
        <div className="font-bold text-xl m-0">Type the name of your company</div>
      </div>
      <Separator />
      <div className="space-y-4">
        <div className="font-bold text-xl">Area of Focus?</div>
        <FocusField control={formTwo.control} options={formOptions.focusOptions} />
      </div>
      <div className="space-y-4">
        <div className="font-bold text-xl">Your role?</div>
        <RoleField control={formTwo.control} options={formOptions.roleOptions} />
      </div>
    </div>
  )
}

export default FormTwo