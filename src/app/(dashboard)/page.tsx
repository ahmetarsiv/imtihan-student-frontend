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
import { useEffect } from 'react';
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
            <main>
                <Grid
                    numItems={1}
                    numItemsSm={2}
                    numItemsLg={3}
                    className="mb-5 gap-4">
                    <Col>
                        <Card decoration="top" decorationColor="sky">
                            <Text>Analiz</Text>
                            <Metric>% 32</Metric>
                        </Card>
                    </Col>
                    <Card decoration="top" decorationColor="sky">
                        <Text>İlerleme</Text>
                        <Metric>% 75</Metric>
                    </Card>
                    <Card decoration="top" decorationColor="sky">
                        <Text>Ortalama</Text>
                        <Metric>% 50</Metric>
                    </Card>
                </Grid>

                <Grid
                    numItems={1}
                    numItemsSm={2}
                    numItemsLg={3}
                    className="mb-5 gap-4">
                    <Col numColSpan={1} numColSpanLg={2}>
                        <Card>
                            <AreaChart
                                data={chartdata}
                                index="date"
                                categories={[
                                    'Sınav Analizi',
                                    'İlerleme Durumu',
                                ]}
                                colors={['indigo', 'cyan']}
                                valueFormatter={dataFormatter}
                            />
                        </Card>
                    </Col>
                    <Card>
                        <DonutChart
                            className="h-72"
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

                <div>
                    <TabGroup>
                        <TabList>
                            <Tab>Sınavlar</Tab>
                            <Tab>Notlar</Tab>
                            <Tab>Takvim</Tab>
                        </TabList>
                        <TabPanels className="pt-2.5">
                            <TabPanel>
                                <InfoCard className="col-span-full">
                                    <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                                        <div className="order-last lg:order-first">
                                            <h3 className="text-2xl font-bold tracking-tight">
                                                Hadi sınavınızı oluşturalım.
                                            </h3>
                                            <p className="text-lg">
                                                Zorluk serviyeleri, soru
                                                sayıları ve kayıtlı konulardan
                                                oluşan bir sınav oluşturun.
                                            </p>
                                            <div className="pt-10">
                                                <Link href={'/exam'}>
                                                    <Button
                                                        type={'button'}
                                                        label={'Sınav Oluştur'}
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
                                <InfoCard className="col-span-full">
                                    <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                                        <div className="order-last lg:order-first">
                                            <h3 className="text-2xl font-bold tracking-tight">
                                                Hadi notunuzu oluşturalım.
                                            </h3>
                                            <p className="text-lg">
                                                Sınırsız defter, notlarınızı
                                                alın ve arkadaşlarınız ile
                                                paylaşın.
                                            </p>
                                            <div className="pt-10">
                                                <Link href={'/note'}>
                                                    <Button
                                                        type={'button'}
                                                        label={'Not Oluştur'}
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
                                <InfoCard className="col-span-full">
                                    <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                                        <div className="order-last lg:order-first">
                                            <h3 className="text-2xl font-bold tracking-tight">
                                                Hadi ders programınızı
                                                oluşturalım.
                                            </h3>
                                            <p className="text-lg">
                                                Ders prgoramınızı oluşturarak
                                                tarihi, zamanı ve dersi
                                                belirleyin.
                                            </p>
                                            <div className="pt-10">
                                                <Link href={'/class-schedule'}>
                                                    <Button
                                                        type={'button'}
                                                        label={
                                                            'Program Oluştur'
                                                        }
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
                </div>
            </main>
        </>
    );
}
