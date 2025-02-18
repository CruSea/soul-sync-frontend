import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmExitType } from '@/types/get-started';

export default function ConfirmExit({
  isConfirmExit,
  setIsConfirmExit,
  setIsOpen,
  prevAvailability,
  form,
  setIsErrorStatesAction,
}: ConfirmExitType) {
  const resetTime = () => {
    // if we choose discgard changes, we will exit both the exit dialog and availability dialog and set the availability to the prev data
    setIsConfirmExit(false);
    setIsOpen(false);
    setIsErrorStatesAction((prevIsErrorStates) =>
      prevIsErrorStates.map((isError, i) => false)
    );
    form.setValue('availability', prevAvailability);
  };

  return (
    <Dialog open={isConfirmExit} onOpenChange={() => setIsConfirmExit(false)}>
      <DialogContent className="w-[400px] flex flex-col gap-y-6 rounded-xl">
        <DialogHeader className="">
          <DialogTitle className="text-2xl font-semibold">
            Confirm Exit
          </DialogTitle>
          <DialogDescription className="!m-0">
            Are you sure you want to discard changes?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-center gap-7">
            <Button
              variant="secondary"
              className="hover:bg-slate-200 w-28"
              onClick={() => setIsConfirmExit(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="w-28 hover:bg-[#c83a3a]"
              onClick={resetTime}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
