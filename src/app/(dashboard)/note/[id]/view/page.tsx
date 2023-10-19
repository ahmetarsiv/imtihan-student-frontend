'use client';

import { ReactNode, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { getNote } from '@/store/slices/note';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function NoteViewPage(): ReactNode {
    const { id } = useParams();
    const noteId: number = parseInt(id.toString(), 10);
    const dispatch: AppDispatch = useDispatch();
    const { note, isLoading } = useSelector(state => state.note);

    useEffect(() => {
        if (id) {
            dispatch(getNote(noteId));
        }
    }, [dispatch, id]);

    return (
        <>
            <main>
                {isLoading ? (
                    <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                    </div>
                ) : (
                    <div className="max-w-4xl">
                        <div>
                            <div className="flex items-center justify-between mb-2.5">
                                <div>
                                    <span className="bg-gray-100 text-gray-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300">
                                        {new Date(
                                            note?.created_at,
                                        ).toLocaleString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        })}
                                    </span>
                                    <span className="bg-blue-700 text-white text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                                        {note?.is_everyone == 1
                                            ? 'Herkes'
                                            : 'Sadece Ben'}
                                    </span>
                                </div>

                                <Link href={`/note/${note?.id}/edit`}>
                                    <PencilSquareIcon className="text-brand w-8 h-8" />
                                </Link>
                            </div>

                            <div className="md:flex items-center justify-between">
                                <h1 className="mb-4 text-3xl font-extrabold md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-200">
                                    {note?.name}
                                </h1>
                            </div>
                            <span
                                className="font-light text-zinc-500 dark:text-zinc-400"
                                dangerouslySetInnerHTML={{
                                    __html: note?.content,
                                }}
                            />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
