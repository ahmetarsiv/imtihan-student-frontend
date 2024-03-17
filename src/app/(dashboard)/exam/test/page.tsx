'use client';

import { ReactNode, useEffect, useState } from 'react';
import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { setTitle } from '@/store/slices/root';
import { IExamAnswer, IOption, IQuestion } from '@/types/IExam';
import { useRouter } from 'next/navigation';
import { deleteExam, storeAnswer } from '@/store/slices/exam';
import { Button, Label } from '@codenteq/interfeys';

export default function TestPage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();

    const { exam } = useSelector(state => state.exam);

    const [answer, setAnswer] = useState<IExamAnswer[]>([]);
    const [nextQuestion, setNextQuestion] = useState<number>(0);
    const [time, setTime] = useState(50);

    const optionChangeColor = (option: any) => {
        if (answer.find(ans => ans.answer_id === option)) {
            return 'bg-brand text-white';
        }
        return 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800';
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        function handleContextMenu(e: any) {
            e.preventDefault();
        }

        document.body.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.body.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const handleOptionSelect = (option: IOption) => {
        setAnswer([
            {
                question_id: option.question_id,
                answer_id: option.id,
            },
            ...answer.filter(d => d.question_id !== option.question_id),
        ]);
    };

    const handleCloseExam = () => {
        if (confirm('İmtihandan çıkmak istediğinize emin misiniz?')) {
            dispatch(deleteExam(exam.exam_id)).then(() => router.push('/exam'));
        }
    };

    const handleFinishExam = () => {
        dispatch(storeAnswer(exam.exam_id, answer)).then(() =>
            router.push('/exam/result'),
        );
    };

    useEffect(() => {
        dispatch(setTitle('İmtihan'));
        setTime(parseInt(exam.time) * 60);
    }, []);

    useEffect(() => {
        if (time === 0) return;

        const timerId = setInterval(() => {
            setTime(time => time - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if (time === 0) {
            handleFinishExam();
        }
    }, [time]);

    useEffect(() => {
        exam?.questions?.map((question: IQuestion) => {
            setAnswer([
                {
                    question_id: question.id,
                    answer_id: null,
                },
                ...answer,
            ]);
        });
    }, []);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <>
            <main className="min-h-screen bg-white dark:bg-black lg:px-4 px-5 py-16 select-none">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                <div>
                    <button onClick={handleCloseExam}>
                        <div className="fixed flex flex-1 justify-center items-center top-2 left-4 backdrop-blur-sm bg-white/50 rounded-full w-9 h-9 dark:bg-black/20 z-[11]">
                            <XMarkIcon className="w-6 h-6 z-10 dark:text-white" />
                        </div>
                    </button>

                    <div
                        className="fixed flex justify-center items-center top-2 right-4 backdrop-blur-sm bg-white/50 rounded-full w-9 h-9 dark:bg-black/20 z-[11] cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}>
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
                <div className="flex flex-col gap-5 lg:flex-row justify-around items-center">
                    <div className="lg:w-3/6">
                        <Label className="pb-5">Soru 21/50</Label>
                        {exam?.questions[nextQuestion] && (
                            <div>
                                {exam?.questions[nextQuestion]
                                    .is_image_option && (
                                    <Image
                                        src={exam?.questions[nextQuestion].src}
                                        alt="Placeholder"
                                        className="w-full lg:w-96"
                                    />
                                )}
                                <br />
                                <h3 className="text-2xl">
                                    {exam?.questions[nextQuestion].name}
                                </h3>
                                <br />
                                <p className="text-lg">
                                    {exam?.questions[nextQuestion].description}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-3/6 gap-3 py-5 flex flex-col">
                        <ul className="grid grid-cols-1 gap-4">
                            {exam.questions[nextQuestion]?.options?.map(
                                (option: IOption) => (
                                    <li
                                        key={option.id}
                                        className={`w-full py-6 px-2.5 text-lg rounded-lg cursor-pointer ${optionChangeColor(
                                            option.id,
                                        )}`}
                                        onClick={() =>
                                            handleOptionSelect(option)
                                        }>
                                        <span>{option.description}</span>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>
                </div>
            </main>

            <footer className="p-3 select-none flex justify-around items-center bg-white dark:bg-black fixed bottom-0 border-t border-zinc-100 shadow w-full dark:border-zinc-800">
                <div>
                    <h3 className="text-xl font-bold">
                        {exam.questions[nextQuestion]?.category.name}
                    </h3>
                    <Label>
                        Soru {nextQuestion + 1}/{exam.questions.length}
                    </Label>
                </div>

                <div>
                    {exam?.questions.length - 1 !== nextQuestion ? (
                        <Button
                            onClick={() => setNextQuestion(nextQuestion + 1)}
                            className="px-10 text-xl"
                            type={'button'}
                            label={'Sonraki'}
                        />
                    ) : (
                        <Button
                            onClick={handleFinishExam}
                            className="px-10 text-xl"
                            type={'button'}
                            label={'Sınavı Bitir'}
                        />
                    )}
                </div>
            </footer>
        </>
    );
}
