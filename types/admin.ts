// types/admin.ts

export interface LayoutProps {
  children: React.ReactNode;
}

export interface Admin {
  id: string;
  name: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber: string;
  location: string;
  status: string;
  profileImage: string;
  role: string;
  createdAt: string | Date;
}

// ✅ Add these:
export interface InviteAdminFormData {
  name: string;
  email: string;
}

export interface InviteAdminDialogProps {
  userName: string;
  accountId: string;
  role: string;
  roleId: string;
  triggerState: boolean;
  setTriggerState: React.Dispatch<React.SetStateAction<boolean>>;
}
