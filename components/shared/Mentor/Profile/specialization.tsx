import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { getStartedForm } from '@/data/get-started-data';

const Specialization = () => {
  return (
    <Card className="border-0">
      <CardHeader className="py-0">
        <CardTitle className="font-bold text-2xl border-b p-3">
          Specialization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="pt-6 gap-2 flex flex-col">
          {getStartedForm.specializationOptions.map((option) => (
            <div key={option.value} className="flex items-center">
              <Checkbox className="!bg-white !w-4 !h-4" value={option.value} />
              <div className="ml-3 font-medium text-lg cursor-pointer">
                {option.label}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Specialization;
