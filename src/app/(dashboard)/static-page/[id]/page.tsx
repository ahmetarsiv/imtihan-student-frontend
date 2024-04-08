'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { getStaticPage } from '@/store/slices/static-page';
import { setTitle } from '@/store/slices/root';
import { Badge } from '@codenteq/interfeys';

export default function StaticPageViewPage() {
    const { id } = useParams();
    const staticPageId: number = parseInt(id.toString(), 10);
    const dispatch: AppDispatch = useDispatch();
    const { staticPage, isLoading } = useSelector(state => state.staticPage);

    useEffect(() => {
        if (id) {
            dispatch(getStaticPage(staticPageId));
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(setTitle(staticPage?.name as string));
    }, [staticPage]);

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
                            <div className="mb-2.5">
                                <div>
                                    <Badge className="bg-indigo-100 text-indigo-800 text-xs">
                                        {new Date(
                                            staticPage?.created_at,
                                        ).toLocaleString('tr-TR', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </Badge>
                                </div>
                            </div>

                            <div className="md:flex items-center justify-between">
                                <h1 className="mb-4 text-3xl font-extrabold md:text-3xl lg:text-4xl text-zinc-900 dark:text-zinc-200">
                                    {staticPage?.name}
                                </h1>
                            </div>
                            <p
                                className="font-light text-zinc-500 dark:text-zinc-400"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        typeof staticPage?.content === 'string'
                                            ? staticPage.content
                                            : '',
                                }}
                            />
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
