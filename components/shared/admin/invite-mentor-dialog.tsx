"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface InviteMentorFormData {
  name: string;
  email: string;
}

export function InviteMentorDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InviteMentorFormData>({
    name: "",
    email: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Invitation sent",
        description: `Invitation has been sent to ${formData.email}`,
      });

      setFormData({ name: "", email: "" });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <span className="mr-1">+</span> Invite a Mentor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite A mentor</DialogTitle>
          <DialogDescription>
            Send an invitation link through their email
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Insert their name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Insert their email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#0F172A] hover:bg-[#1E293B]"
          >
            Invite
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
