'use client';

import React, { ReactNode, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { getNote } from '@/store/slices/note';
import { Badge } from '@codenteq/interfeys';

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
                            <div className="flex items-center mb-2.5">
                                <Badge className="bg-indigo-100 text-indigo-800 text-xs">
                                    {new Date(note?.created_at).toLocaleString(
                                        'tr-TR',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                        },
                                    )}
                                </Badge>
                                <Badge className="bg-red-100 text-red-800 text-xs">
                                    {note?.is_everyone == true
                                        ? 'Herkes'
                                        : 'Sadece Ben'}
                                </Badge>
                            </div>

                            <div>
                                <h1 className="mb-4 text-zinc-900 dark:text-zinc-200">
                                    {note?.name}
                                </h1>
                                <p
                                    className="font-light text-zinc-500 dark:text-zinc-400"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            typeof note?.content === 'string'
                                                ? note.content
                                                : '',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
