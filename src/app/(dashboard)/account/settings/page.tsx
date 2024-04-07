'use client';

import React, { ReactNode, useEffect } from 'react';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@tremor/react';
import MembershipInformation from '@/app/(dashboard)/account/settings/_forms/MembershipInformation';
import PasswordEdit from '@/app/(dashboard)/account/settings/_forms/PasswordEdit';
import ContactInformation from '@/app/(dashboard)/account/settings/_forms/ContactInformation';
import { setTitle } from '@/store/slices/root';
import { AppDispatch, useDispatch } from '@/store';

export default function AccountSettingPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Hesap Ayarlarım'));
    }, []);
    return (
        <>
            <main className="lg:max-w-4xl">
                <TabGroup>
                    <TabList className="mt-8">
                        <Tab id="membership-tab">Üyelik bilgilerim</Tab>
                        <Tab id="password-tab">Şifre değişikliği</Tab>
                        <Tab id="contact-tab">İletişim tercihlerim</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <MembershipInformation />
                        </TabPanel>
                        <TabPanel>
                            <PasswordEdit />
                        </TabPanel>
                        <TabPanel>
                            <ContactInformation />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </>
    );
}
