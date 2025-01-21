import {
  LuLayoutDashboard,
  LuUser,
  LuMessagesSquare,
  LuUserCog,
  LuLibrary,
} from 'react-icons/lu';
import { RxLinkNone2 } from 'react-icons/rx';
import { FiHelpCircle } from 'react-icons/fi';
import { CiSettings } from 'react-icons/ci';

const menuItems = [
  { icon: LuLayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: LuUser, label: 'Mentors', href: '/admin/mentors' },
  { icon: LuMessagesSquare, label: 'Messages', href: '/admin/messages' },
  { icon: RxLinkNone2, label: 'Channels', href: '/admin/channels' },
  { icon: LuUserCog, label: 'Admins', href: '/admin/admins' },
  { icon: LuLibrary, label: 'Agents', href: '/admin/agents' },
];

const footerItems = [
  { icon: FiHelpCircle, label: 'Help and Support', href: '/support' },
  { icon: CiSettings, label: 'Setting', href: '/settings' },
];

export { menuItems, footerItems };
