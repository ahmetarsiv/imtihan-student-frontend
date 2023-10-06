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
import NoContentCard from '@/components/cards/NoContentCard';
import LottieAnimation from '@/components/LottieAnimation';
import Exam from '../../../public/lottie/animation_llpjjjsc.json';
import Note from '../../../public/lottie/animation_llpiacni.json';
import Calendar from '../../../public/lottie/animation_llpjqp34.json';

export default function DashboardPage() {
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

                <Grid numItems={1} numItemsLg={2} className="mb-5 gap-4">
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
                                <NoContentCard
                                    className="col-span-full"
                                    name="Hadi sınavınızı oluşturalım."
                                    description="Zorluk serviyeleri, soru sayıları ve kayıtlı konulardan oluşan bir sınav oluşturun."
                                    link={{
                                        name: 'Sınav Oluştur',
                                        href: '/exam/test',
                                    }}>
                                    <div className="h-72">
                                        <LottieAnimation animationData={Exam} />
                                    </div>
                                </NoContentCard>
                            </TabPanel>
                            <TabPanel>
                                <NoContentCard
                                    className="col-span-full"
                                    name="Hadi notunuzu oluşturalım."
                                    description="Sınırsız defter, notlarınızı alın ve arkadaşlarınız ile paylaşın."
                                    link={{
                                        name: 'Not Oluştur',
                                        href: '/note',
                                    }}>
                                    <div className="h-72">
                                        <LottieAnimation animationData={Note} />
                                    </div>
                                </NoContentCard>
                            </TabPanel>
                            <TabPanel>
                                <NoContentCard
                                    className="col-span-full"
                                    name="Hadi ders programınızı oluşturalım."
                                    description="Ders prgoramınızı oluşturarak tarihi, zamanı ve dersi belirleyin."
                                    link={{
                                        name: 'Program Oluştur',
                                        href: '/class-schedule',
                                    }}>
                                    <div className="h-72">
                                        <LottieAnimation
                                            animationData={Calendar}
                                        />
                                    </div>
                                </NoContentCard>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </main>
        </>
    );
}
