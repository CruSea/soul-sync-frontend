'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import React from 'react';

import { inviteMentore } from '@/actions/admin/admin';
import { User_Info } from '@/types/users';

interface InviteMentorFormData {
  name: string;
  email: string;
}
interface InviteMentorDialogProps {
  userName: string;
  accountId: string;
  roleId: string;
  roleName: string;
  triggerState: boolean;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function InviteMentorDialog({
  userName,
  accountId,
  roleId,
  roleName,
  triggerState,
  setTriggerState,
}: InviteMentorDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InviteMentorFormData>({
    name: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      accountId: accountId as string,
      name: formData.name,
      email: formData.email,
    };

    try {
      const response = await inviteMentore(requestBody);
      if (response.error) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: response.error.message,
        });
        return;
      }
      toast({
        variant: 'success',
        title: 'Success!',
        description: `Invitation sent to ${formData.email}`,
      });
      setFormData({ name: '', email: '' });
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Failed to send invitation.',
      });
    }
    setTriggerState(!triggerState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>
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
