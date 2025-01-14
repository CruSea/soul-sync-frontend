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
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
//import handler from '@/app/api/[...params]/route';
import { endPoints, jsonServer } from '@/data/end-points';
import React from 'react';
import { toast } from 'sonner';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface InviteMentorFormData {
  name: string;
  email: string;
}

export function InviteMentorDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<InviteMentorFormData>({
    name: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (user && token) {
        const endPoint = `${BASE_URL}/${endPoints.adminMentors}`; // move base to env
        const userObj = JSON.parse(user);
        const requestBody = {
          accountId: userObj.accounts[0].id,
          name: formData.name,
          email: formData.email,
        };

        fetch(endPoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((text) => {
                throw new Error(`Bad Request: ${text}`);
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log('Response from server:', data);
          })
          .catch((error) => {
            console.error('Error making POST request:', error);
          });
        toast(`Invitation has been sent to ${formData.email}`);

        setFormData({ name: '', email: '' });
        setIsOpen(false);
      } else {
        console.error('user not found');
      }
    } catch (error) {
      toast('Failed to send invitation. Please try again.');
    }
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
