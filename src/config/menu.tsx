import {
    BellIcon,
    BookmarkIcon,
    CalendarDaysIcon,
    ChartPieIcon,
    CreditCardIcon,
    HomeIcon,
    InformationCircleIcon,
    RectangleGroupIcon, UserCircleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

export interface IMenuItem {
    name: string;
    icon: ReactNode;
    path: string;
}

interface IMenuConfig {
    desktop: IMenuItem[];
    mobile: IMenuItem[];
    account: IMenuItem[];
}

const menuConfig: IMenuConfig = {
    desktop: [
        {
            name: 'Ana Sayfa',
            icon: <HomeIcon className="inline-block w-6 h-6" />,
            path: '/',
        },
        {
            name: 'Sınavlar',
            icon: <ChartPieIcon className="inline-block w-6 h-6" />,
            path: '/exam',
        },
        {
            name: 'Not',
            icon: <RectangleGroupIcon className="inline-block w-6 h-6" />,
            path: '/note',
        },
        {
            name: 'Ders Programı',
            icon: <CalendarDaysIcon className="inline-block w-6 h-6" />,
            path: '/class-schedule',
        },
        {
            name: 'Duyurular',
            icon: <BookmarkIcon className="inline-block w-6 h-6" />,
            path: '/announcement',
        },
        {
            name: 'Destek',
            icon: <InformationCircleIcon className="inline-block w-6 h-6" />,
            path: '/support',
        },
        {
            name: 'Mevcut Planlar',
            icon: <CreditCardIcon className="inline-block w-6 h-6" />,
            path: '/plan',
        },
        {
            name: 'Hesap',
            icon: <UserIcon className="inline-block w-6 h-6" />,
            path: '/account',
        },
    ],
    mobile: [
        {
            name: 'Ana Sayfa',
            icon: <HomeIcon className="inline-block w-7 h-7" />,
            path: '/',
        },
        {
            name: 'Not',
            icon: <RectangleGroupIcon className="inline-block w-7 h-7" />,
            path: '/note',
        },
        {
            name: 'Bildirimler',
            icon: <BellIcon className="inline-block w-7 h-7" />,
            path: '/notification',
        },
        {
            name: 'Hesap',
            icon: <UserIcon className="inline-block w-7 h-7" />,
            path: '/account',
        },
    ],
    account: [
        {
            name: 'Hesap Ayarlarım',
            icon: (
                <UserCircleIcon className="text-brand w-6 h-6 mr-2 float-left" />
            ),
            path: '/account/settings',
        },
        {
            name: 'Sınavlar',
            icon: (
                <ChartPieIcon className="text-brand w-6 h-6 mr-2 float-left" />
            ),
            path: '/exam',
        },
        {
            name: 'Ders Programı',
            icon: (
                <CalendarDaysIcon className="text-brand w-6 h-6 mr-2 float-left" />
            ),
            path: '/class-schedule',
        },
        {
            name: 'Duyurular',
            icon: (
                <BookmarkIcon className="text-brand w-6 h-6 mr-2 float-left" />
            ),
            path: '/announcement',
        },
        {
            name: 'Destek',
            icon: (
                <InformationCircleIcon className="text-brand w-6 h-6 mr-2 float-left" />
            ),
            path: '/support',
        },
        {
            name: 'Mevcut Planlar',
            icon: (
                <CreditCardIcon className="text-brand w-6 h-6 mr-2 float-left" />
            ),
            path: '/plan',
        },
    ],
};

export default menuConfig;
