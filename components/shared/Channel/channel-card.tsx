import React, { useState } from 'react';
import Image from 'next/image';
import type { Channel } from '@/types/channel';
import { AiOutlineDelete } from 'react-icons/ai';
import TelegramBot from './configuration/telegram-bot';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import NegaritSMS from './configuration/negarit-sms';
import { useToast } from '@/hooks/use-toast';
import { handleDeleting, handleConnect, handleDisconnect } from '@/actions/admin/channel';

interface ChannelCardProps {
    channel: Channel;
    setChannels: React.Dispatch<React.SetStateAction<Channel[]>>;
    setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
    triggerState: boolean;
}

const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export function ChannelCard({
    channel,
    setChannels,
    setTriggerState,
}: ChannelCardProps) {
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [connectedId, setConnectedId] = useState<string | null>(null);
    const [id, setid] = useState<string | null>(null);
    const { toast } = useToast();

    let iconURL = '';
    switch (channel.type) {
        case 'TELEGRAM':
            iconURL = '/telegram.png';
            break;
        case 'NEGARIT':
            iconURL = '/negarit.png';
            break;
        case 'WHATSAPP':
            iconURL = '/Whatsapp.png';
            break;
        case 'FACEBOOK':
            iconURL = '/Facebook.svg';
            break;
        case 'TWILIO':
            iconURL = '/Twilio.png';
            break;
        default:
            iconURL = '';
            break;
    }

    const handleDelete = (channel: Channel) => {
        if (channel.id) {
            setDeleteId(channel.id);
        }
    };

    const confirmDelete = async () => {
        if (deleteId !== null) {
            setChannels((prevItems) => prevItems.filter((item) => item.id !== deleteId));
        }
        const response = await handleDeleting(deleteId as string);
        if (response.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: response.error.description,
                duration: 3000,
            });
        }
        setTriggerState((prev) => !prev);
        toast({
            variant: 'success',
            title: 'Success',
            description: `Channel ${channel.name} deleted successfully`,
            duration: 3000,
        });
        setDeleteId(null);
    };
    const channelChange = (channel: Channel) => {
        switch (channel.type) {
            case 'TELEGRAM':
                return <TelegramBot channel={channel} />;
            case 'NEGARIT':
                return <NegaritSMS channel={channel} />;
            default:
                return <div>Has not been set yet</div>;
        }
    };

    const cancelDelete = () => {
        setDeleteId(null);
    };

    const handleToggle = (channelId: string) => {
        if (channelId) {
            setConnectedId(channelId);
            setid(channelId);
        }
        if (connectedId !== null) {
            if (channel.isOn === false) {
                setChannels((prevItems) =>
                    prevItems.map((item) => (item.id === connectedId ? { ...item, isOn: true } : item))
                );
                handleConnect(connectedId);
                toast({
                    variant: 'success',
                    title: 'Success',
                    description: `Channel ${channel.name} connected successfully`,
                    duration: 3000,
                });
            } else {
                setChannels((prevItems) =>
                    prevItems.map((item) => (item.id === connectedId ? { ...item, isOn: false } : item))
                );
                handleDisconnect(connectedId);
                toast({
                    variant: 'success',
                    title: 'Success',
                    description: `Channel ${channel.name} disconnected successfully`,
                    duration: 3000,
                });
            }
        } else {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'try again',
                duration: 500,
            });
        }
        setTriggerState((prev) => !prev);
    };

    return (
        <div className="w-full gap-4 pb-5 flex flex-col items-center justify-between px-4 pt-2 border rounded-xl bg-white hover:shadow-md hover:rounded-xl transition-shadow">
            <div className="px-2 py-2 rounded-tl-lg rounded-tr-lg justify-between items-center inline-flex w-full">
                <div className="px-2 py-1 rounded-xl justify-center items-center gap-3 flex" />
                <div
                    onClick={() => handleDelete(channel)}
                    className="w-10 h-10 px-[3px] py-[2.62px] justify-center rounded-xl hover:bg-[#f1f2f4] items-center cursor-pointer flex"
                >
                    <AiOutlineDelete className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
                </div>
            </div>
            <div className="w-auto mb-3 h-auto flex justify-center">
                <Image
                    src={iconURL}
                    alt={channel.type as string}
                    width={70}
                    height={70}
                    className="object-contain sm:w-96 sm:h-64"
                />
            </div>
            <div className="w-full flex-col justify-start items-start inline-flex">
                <div className="w-full justify-between items-start flex text-wrap gap-1">
                    <div className="justify-between items-center gap-2 flex">
                        <div className="w-3 h-3 bg-[#27a376] rounded-[50px]" />
                        <div className="text-[#677488] text-sm font-medium font-['Manrope'] leading-tight">
                            Name
                        </div>
                    </div>
                    <div className="text-gray-900 text-sm sm:text-base font-bold font-['Manrope'] ">
                        {channel.name}
                    </div>
                </div>
                <div className="w-full justify-between items-start flex text-wrap">
                    <div className="justify-between items-center gap-2 flex">
                        <div className="w-3 h-3 bg-[#27a376] rounded-[50px]" />
                        <div className="text-[#677488] text-sm font-medium font-['Manrope'] leading-tight">
                            Type
                        </div>
                    </div>
                    <div className="text-gray-900 text-sm sm:text-base font-bold font-['Manrope'] ">
                        {channel.type}
                    </div>
                </div>
                <div className="w-full justify-between items-start flex text-wrap">
                    <div className="justify-between items-center gap-2 flex">
                        <div className="w-3 h-3 bg-[#27a376] rounded-[50px]" />
                        <div className="text-[#677488] text-sm font-medium font-['Manrope'] leading-tight">
                            Date
                        </div>
                    </div>
                    <div className="text-gray-900 text-sm sm:text-base font-bold font-['Manrope'] ">
                        {formatDate(channel.createdAt as string)}
                    </div>
                </div>
                {channelChange(channel)}
                <div className="w-full mt-3">
                    <div className="flex items-center justify-between space-x-3 w-full ">
                        <Switch
                            id="connect"
                            checked={channel.isOn}
                            onCheckedChange={() => handleToggle(channel.id as string)}
                        />
                        <Label htmlFor="connect" className="text-sm sm:text-base">
                            {channel.isOn ? 'Connected' : 'Not Connected'}
                        </Label>
                    </div>
                </div>
            </div>
            <Dialog open={deleteId !== null} onOpenChange={cancelDelete}>
                <DialogContent className="max-w-md flex flex-col gap-y-5 p-5 sm:p-7">
                    <DialogHeader>
                        <DialogTitle className="text-xl mb-3">Confirm Deletion</DialogTitle>
                        <DialogDescription className="text-sm sm:text-base">
                            Are you sure you want to delete?{' '}
                            <span className="font-bold text-black inline">
                                {channel.name} | {channel.type}
                            </span>{' '}
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:flex-row-reverse sm:justify-start gap-3">
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            className="hover:bg-[#c83a3a] text-sm sm:text-base"
                        >
                            Confirm
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={cancelDelete}
                            className="hover:bg-slate-200 text-sm sm:text-base"
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

