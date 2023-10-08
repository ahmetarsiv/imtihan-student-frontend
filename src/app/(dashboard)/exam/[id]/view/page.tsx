'use client';

import { ReactNode } from 'react';
import {
    AreaChart,
    Card,
    Col,
    DonutChart,
    Grid,
    Metric,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Text,
} from '@tremor/react';

export default function NoteViewPage(): ReactNode {
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
                <Grid numItems={1} numItemsSm={2} className="mb-5 gap-4">
                    <Grid numItems={2} className="gap-4">
                        <Card decoration="top" decorationColor="sky">
                            <Text>Soru</Text>
                            <Metric>50</Metric>
                        </Card>
                        <Card decoration="top" decorationColor="sky">
                            <Text>Puan</Text>
                            <Metric>50 / 100</Metric>
                        </Card>
                        <Card decoration="top" decorationColor="sky">
                            <Text>Sonuç</Text>
                            <Metric>Başarılı</Metric>
                        </Card>
                        <Card decoration="top" decorationColor="sky">
                            <Text>Alan</Text>
                            <Metric>%67 Sayısal</Metric>
                        </Card>
                    </Grid>

                    <Card>
                        <TabGroup>
                            <TabList>
                                <Tab>Sınavlar</Tab>
                            </TabList>
                            <TabPanels className="pt-2.5">
                                <TabPanel>
                                    <Grid
                                        numItems={1}
                                        numItemsSm={2}
                                        numItemsLg={3}
                                        className="mb-5 gap-4">
                                        <Col
                                            numColSpan={1}
                                            numColSpanLg={2}
                                            className="flex items-center">
                                            <ul className="flex flex-col gap-4">
                                                <li>Soru sayısı: 12</li>
                                                <li>Doğru sayısı: 11</li>
                                                <li>Yanlış sayısı: 1</li>
                                                <li>Boş sayısı: 0</li>
                                            </ul>
                                        </Col>
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
                                    </Grid>
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </Card>
                </Grid>

                <Card>
                    <AreaChart
                        data={chartdata}
                        index="date"
                        categories={['Sınav Analizi', 'İlerleme Durumu']}
                        colors={['indigo', 'cyan']}
                        valueFormatter={dataFormatter}
                    />
                </Card>
            </main>
        </>
    );
}
