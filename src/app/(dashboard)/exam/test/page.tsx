'use client';

import { ReactNode, useEffect, useState } from 'react';
import Button from '@/components/Button';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Label from '@/components/Label';
import Avatar from '@/components/Avatar';
import Image from 'next/image';
import Logo from '/public/imtihan.svg';
import { AppDispatch, useDispatch } from '@/store';
import { setTitle } from '@/store/slices/root';

export default function TestPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const options = [
        'Topladığımız meyvelerin henüz yenecek durumda olmadığını görünce üzüldük. ',
        'Ne kadar ağırbaşlı, görgülü, nazik bir insan olduğunu hepimiz biliyoruz.',
        'Yazıyı iyice işleyip tamamladıktan sonra teslim etmek daha iyi olacak',
        'Toplumda uzun süredir, özellikle medyanın altını çizdiği bir kusursuz beden imgesi var.',
        'Bu romanda ustaca örülmüş olaylar içinde, kudretli ruh tahlillerine yer verilmiştir',
    ];
    const optionChangeColor = (option: any) =>
        selectedOption === option
            ? 'bg-brand text-white'
            : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800';

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        function handleContextMenu(e: any) {
            e.preventDefault();
        }

        document.body.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.body.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        dispatch(setTitle('İmtihan'));
    }, []);

    const startTime = new Date().getTime() + 45 * 60 * 1000;
    const [remainingTime, setRemainingTime] = useState(
        startTime - new Date().getTime(),
    );
    useEffect(() => {
        const timerInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeDifference = startTime - currentTime;

            if (timeDifference <= 0) {
                clearInterval(timerInterval);
                setRemainingTime(0);
            } else {
                setRemainingTime(timeDifference);
            }
        }, 1000);

        return () => {
            clearInterval(timerInterval);
        };
    }, []);
    const remainingSeconds = Math.ceil(remainingTime / 1000);
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    return (
        <>
            <main className="min-h-screen bg-white dark:bg-black lg:px-4 px-5 py-16 select-none">
                <div>
                    <button>
                        <div className="fixed flex flex-1 justify-center items-center top-2 left-4 backdrop-blur-sm bg-white/50 rounded-full w-9 h-9 dark:bg-black/20 z-[11]">
                            <XMarkIcon className="w-6 h-6 z-10 dark:text-white" />
                        </div>
                    </button>

                    <div
                        className="fixed flex justify-center items-center top-2 right-4 backdrop-blur-sm bg-white/50 rounded-full w-9 h-9 dark:bg-black/20 z-[11] cursor-pointer"
                        onClick={toggleMenu}>
                        <EllipsisVerticalIcon className="w-6 h-6 z-10 dark:text-white" />
                    </div>

                    {isOpen && (
                        <div className="fixed top-14 right-2 bg-white rounded-lg shadow-md backdrop-blur-sm bg-white/50 dark:bg-black/50">
                            <ul className="py-2 px-4">
                                <li className="text-zinc-900 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-400 cursor-pointer">
                                    Hatalı soru bildir
                                </li>
                            </ul>
                        </div>
                    )}
                </div>

                {/*<aside className="max-w-6xl mb-5 md:mb-0 mx-auto bg-white dark:bg-black">
                    <Avatar />

                    <ul className="grid grid-cols-3 gap-4 text-zinc-900 dark:text-zinc-300">
                        <li className="bg-blue-300 rounded-lg py-4 flex flex-col items-center justify-center">
                            <dt className="w-12 h-12 rounded-full bg-zinc-600 text-white font-medium flex items-center justify-center mb-1">
                                20
                            </dt>
                            <dd className="text-zinc-600 text-sm font-medium">
                                Yanıtlandı
                            </dd>
                        </li>
                        <li className="bg-orange-300 rounded-lg py-4 flex flex-col items-center justify-center">
                            <dt className="w-12 h-12 rounded-full bg-zinc-600 text-white font-medium flex items-center justify-center mb-1">
                                06
                            </dt>
                            <dd className="text-zinc-600 text-sm font-medium">
                                Atlandı
                            </dd>
                        </li>
                        <li className="bg-red-300 rounded-lg py-4 flex flex-col items-center justify-center">
                            <dt className="w-12 h-12 rounded-full bg-zinc-600 text-white font-medium flex items-center justify-center mb-1">
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                            </dt>
                            <dd className="text-zinc-600 text-sm font-medium">
                                Zaman
                            </dd>
                        </li>
                    </ul>
                </aside>*/}

                <div className="flex flex-col lg:flex-row justify-around items-center md:p-5">
                    <div className="lg:w-3/6">
                        <Label className="pb-5">Soru 21/50</Label>
                        <div>
                            <Image
                                src={Logo}
                                alt="Question"
                                className="w-full lg:w-96"
                            />
                            <br />
                            <h3 className="text-2xl">
                                Bu cümledeki altı çizili sözcüğü anlamca
                                karşılayabilecek bir kullanım aşağıdakilerin
                                hangisinde vardır?
                            </h3>
                            <br />
                            <p className="text-lg">
                                Yalnızız; Peyami Safa’nın, roman tekniğini en
                                mükemmel şekliyle gerçekleştirdiği, en son ve
                                insanlığa sunduğu teklifleri bakımından da en
                                olgun eseridir
                            </p>
                        </div>
                    </div>

                    <form className="lg:w-3/6 gap-3 py-5 flex flex-col">
                        <ul className="grid grid-cols-1 gap-4">
                            {options.map(option => (
                                <li
                                    key={option}
                                    className={`w-full py-6 px-2.5 text-lg rounded-lg cursor-pointer ${optionChangeColor(
                                        option,
                                    )}`}
                                    onClick={() => setSelectedOption(option)}>
                                    <span>{option}</span>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
            </main>

            <footer className="p-3 select-none flex justify-around items-center bg-white dark:bg-black fixed bottom-0 border-t border-zinc-100 shadow w-full dark:border-zinc-800">
                <div>
                    <h3 className="text-xl font-bold">
                        Türk Dili ve Edebiyatı
                    </h3>
                    <Label>Soru 21/50</Label>
                </div>

                <div>
                    <Button isLoading={false} className="px-10 text-xl">
                        Sonraki
                    </Button>
                </div>
            </footer>
        </>
    );
}
