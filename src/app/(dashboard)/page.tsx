'use client';

import {
    Card,
    Grid,
    Col,
    AreaChart,
    DonutChart,
    Text,
    Metric,
    TabGroup,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
} from '@tremor/react';
import LottieAnimation from '@/components/LottieAnimation';
import Exam from '../../../public/lottie/animation_llpjjjsc.json';
import Note from '../../../public/lottie/animation_llpiacni.json';
import Calendar from '../../../public/lottie/animation_llpjqp34.json';
import { AppDispatch, useDispatch } from '@/store';
import React, { useEffect } from 'react';
import { setTitle } from '@/store/slices/root';
import { Button, InfoCard } from '@codenteq/interfeys';
import Link from 'next/link';

export default function DashboardPage() {
    const dispatch: AppDispatch = useDispatch();

    const chartdata = [
        {
            date: 'Haz 22',
            'Sınav Analizi': 0,
            'İlerleme Durumu': 0,
        },
        {
            date: 'Tem 22',
            'Sınav Analizi': 32,
            'İlerleme Durumu': 75,
        },
        {
            date: 'Agu 22',
            'Sınav Analizi': 66,
            'İlerleme Durumu': 83,
        },
    ];

    const dataFormatter = (number: number | bigint) =>
        '% ' + Intl.NumberFormat('tr').format(number).toString();

    const cities = [
        {
            name: 'Genel Sınav',
            sales: 56,
        },
        {
            name: 'Genel İlerleme',
            sales: 83,
        },
    ];

    const valueFormatter = (number: number | bigint) =>
        `% ${Intl.NumberFormat('tr').format(number).toString()}`;

    useEffect(() => {
        dispatch(setTitle('Ana Sayfa'));
    }, [dispatch]);

    return (
        <>
            <main className="p-2 rounded bg-gray-100 dark:bg-gray-900">
                <Grid
                    numItems={1}
                    numItemsSm={2}
                    numItemsLg={3}
                    className="mb-5 gap-4">
                    <Col>
                        <Card decoration="top" decorationColor="sky" className="dark:bg-gray-800">
                            <Text className="dark:text-gray-300">Analiz</Text>
                            <Metric className="dark:text-gray-100">% 32</Metric>
                        </Card>
                    </Col>
                    <Card decoration="top" decorationColor="sky" className="dark:bg-gray-800">
                        <Text className="dark:text-gray-300">İlerleme</Text>
                        <Metric className="dark:text-gray-100">% 75</Metric>
                    </Card>
                    <Card decoration="top" decorationColor="sky" className="dark:bg-gray-800">
                        <Text className="dark:text-gray-300">Ortalama</Text>
                        <Metric className="dark:text-gray-100">% 50</Metric>
                    </Card>
                </Grid>

                <Grid
                    numItems={1}
                    numItemsSm={2}
                    numItemsLg={3}
                    className="mb-5 gap-4">
                    <Col numColSpan={1} numColSpanLg={2}>
                        <Card className="dark:bg-gray-800">
                            <AreaChart
                                data={chartdata}
                                index="date"
                                categories={[
                                    'Sınav Analizi',
                                    'İlerleme Durumu',
                                ]}
                                colors={['indigo', 'cyan']}
                                valueFormatter={dataFormatter}
                                className="h-64"
                            />
                        </Card>
                    </Col>
                    <Card className="dark:bg-gray-800">
                        <DonutChart
                            className="h-64"
                            data={cities}
                            category="sales"
                            index="name"
                            valueFormatter={valueFormatter}
                            colors={[
                                'slate',
                                'violet',
                                'indigo',
                                'rose',
                                'cyan',
                                'amber',
                            ]}
                        />
                    </Card>
                </Grid>

                <TabGroup>
                    <TabList className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <Tab className="p-4 dark:text-gray-300">Sınavlar</Tab>
                        <Tab className="p-4 dark:text-gray-300">Notlar</Tab>
                        <Tab className="p-4 dark:text-gray-300">Takvim</Tab>
                    </TabList>
                    <TabPanels className="pt-5">
                        <TabPanel>
                            <InfoCard className="col-span-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                                <div
                                    className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5">
                                    <div className="order-last lg:order-first">
                                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                                            Hadi sınavınızı oluşturalım.
                                        </h3>
                                        <p className="text-lg text-gray-700 dark:text-gray-400">
                                            Zorluk seviyeleri, soru sayıları ve kayıtlı konulardan oluşan bir sınav oluşturun.
                                        </p>
                                        <div className="pt-10">
                                            <Link href={'/exam'}>
                                                <Button
                                                    type={'button'}
                                                    label={'Sınav Oluştur'}
                                                    className="w-full lg:max-w-xs"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="h-72">
                                        <LottieAnimation
                                            animationData={Exam}
                                        />
                                    </div>
                                </div>
                            </InfoCard>
                        </TabPanel>
                        <TabPanel>
                            <InfoCard className="col-span-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                                <div
                                    className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5">
                                    <div className="order-last lg:order-first">
                                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                                            Hadi notunuzu oluşturalım.
                                        </h3>
                                        <p className="text-lg text-gray-700 dark:text-gray-400">
                                            Sınırsız defter, notlarınızı alın ve arkadaşlarınız ile paylaşın.
                                        </p>
                                        <div className="pt-10">
                                            <Link href={'/note'}>
                                                <Button
                                                    type={'button'}
                                                    label={'Not Oluştur'}
                                                    className="w-full lg:max-w-xs"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="h-72">
                                        <LottieAnimation
                                            animationData={Note}
                                        />
                                    </div>
                                </div>
                            </InfoCard>
                        </TabPanel>
                        <TabPanel>
                            <InfoCard className="col-span-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                                <div
                                    className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5">
                                    <div className="order-last lg:order-first">
                                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-300">
                                            Hadi ders programınızı oluşturalım.
                                        </h3>
                                        <p className="text-lg text-gray-700 dark:text-gray-400">
                                            Ders programınızı oluşturarak tarihi, zamanı ve dersi belirleyin.
                                        </p>
                                        <div className="pt-10">
                                            <Link href={'/class-schedule'}>
                                                <Button
                                                    type={'button'}
                                                    label={'Program Oluştur'}
                                                    className="w-full lg:max-w-xs"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="h-72">
                                        <LottieAnimation
                                            animationData={Calendar}
                                        />
                                    </div>
                                </div>
                            </InfoCard>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
        </>
    );
}