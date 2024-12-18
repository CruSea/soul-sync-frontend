import { SizeField } from "../SizeField"
import { CompanyNameField } from "./CompanyNameField"
import { CompanyDomainField } from "./CompanyDomainField"
import { HiOutlineExclamationCircle } from "react-icons/hi2"
import { formOptions } from "@/data/create-org"
import { FormOneProps } from "@/types/create-org"


const FormOne = ({ formOne }: FormOneProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-4">
        <div className="font-bold text-xl">Type the name of your company</div>
        <CompanyNameField control={formOne.control} />
        <div className="relative flex gap-2.5 ">
          <CompanyDomainField control={formOne.control} />
          <div className="absolute top-8 right-0 h-14 w-36 flex-1 flex items-center justify-center box-border border border-slate-300 font-semibold text-sm rounded-lg bg-gray-100">
            .Turumba.com
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-500 font-medium text-xs">
          <HiOutlineExclamationCircle size={20} /> We will create a unique company URL for you to log into Turumba
        </div>
      </div>
      <div className="space-y-4">
        <div className="font-bold text-xl">What is the size of Mentors of your company</div>
        <SizeField control={formOne.control} options={formOptions.sizeOptions} />
      </div>
    </div>
  )
}

export default FormOne