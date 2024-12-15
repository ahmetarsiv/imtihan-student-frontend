'use client';

import {
    ArrowTopRightOnSquareIcon,
    CreditCardIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { ReactNode, useEffect, useState } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@codenteq/interfeys';
import Link from 'next/link';

export default function PlanPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const togglePopover = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        dispatch(setTitle('Planlarım'));
    }, [dispatch]);
    return (
        <>
            <div className="space-y-10">
                <Card className="lg:max-w-4xl space-y-5">
                    <CardHeader className="bg-zinc-50 dark:bg-zinc-950 border-b border-brand rounded-t-lg">
                        <CardTitle className="px-10 py-24">
                            Premium Üyelik
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-start justify-between gap-4">
                        <div className="space-y-5">
                            <p>
                                Sınırsız çevrimiçi sınav, eğitim materyalleri ve
                                ilerleme takibi hakkı.
                            </p>
                            <div className="flex items-center">
                                <Button className="lg:max-w-xs">
                                    Planı Değiştir
                                </Button>
                                <Popover>
                                    <PopoverTrigger onClick={togglePopover}>
                                        <Button variant="link" size="icon">
                                            <InformationCircleIcon className="w-5" />
                                        </Button>
                                    </PopoverTrigger>
                                    {isOpen && (
                                        <div className="relative">
                                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 lg:left-auto lg:transform-none lg:mt-0 lg:ml-4">
                                                <PopoverContent>
                                                    <Link
                                                        href="https://support.imtihantech.com/plan-help#premium-planlar%C4%B1"
                                                        target="_blank"
                                                        className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                                        Planın hakkında bilgi
                                                        edin
                                                        <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                                                    </Link>
                                                </PopoverContent>
                                            </div>
                                        </div>
                                    )}
                                </Popover>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <h3 className="text-2xl font-bold">Ödeme</h3>
                            <label>
                                Sonraki faturan 69,99 TL tutarında ve 29.10.2023
                                tarihinde.
                            </label>
                            <div className="flex items-center gap-5">
                                <CreditCardIcon className="h-9 w-9" />
                                <div>
                                    <h4>0000 ile biten Mastercard kartın</h4>
                                    <Label>
                                        Son geçerlilik tarihi: 04/2028
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div>
                    <h3 className="text-zinc-700 dark:text-zinc-400 font-semibold text-xl mb-2.5">
                        Sorularınız mı var?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <Card className="max-w-sm">
                            <CardHeader>
                                <CardDescription>
                                    Premium planımı nasıl iptal edebilirim?
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link
                                    href="https://support.imtihantech.com/plan-help#premium-planlar%C4%B1n%C4%B1-iptal-etme"
                                    target="_blank"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                    Detaylı bilgi
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className="max-w-sm ">
                            <CardHeader>
                                <CardDescription>
                                    Premium planım doğru çalışmıyor. Ne
                                    yapmalıyım?
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link
                                    href="https://support.imtihantech.com/plan-help#premium-%C3%A7al%C4%B1%C5%9Fm%C4%B1yor"
                                    target="_blank"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                    Detaylı bilgi
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className="max-w-sm">
                            <CardHeader>
                                <CardDescription>
                                    Premium fiyatı neden arttı?
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link
                                    href="https://support.imtihantech.com/payment-help#fiyat-g%C3%BCncellemeri"
                                    target="_blank"
                                    className="inline-flex items-center text-blue-500 hover:text-blue-400">
                                    Detaylı bilgi
                                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1.5" />
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
