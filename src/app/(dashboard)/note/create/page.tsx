'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { postNote } from '@/store/slices/note';
import toast from 'react-hot-toast';
import TextEditor from '@/components/TextEditor';
import { INoteForm } from '@/types/INote';
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setTitle } from '@/store/slices/root';
import { Button, Input, Switch } from '@codenteq/interfeys';

const NoteCreateSchema: Yup.ObjectSchema<INoteForm> = Yup.object().shape({
    name: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    is_everyone: Yup.boolean().required('Required'),
});

export default function NoteCreatePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();
    const { push } = useRouter();
    const { isLoading } = useSelector(state => state.note);

    const {
        handleSubmit,
        register,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<INoteForm>({ resolver: yupResolver(NoteCreateSchema) });

    const onSubmit = (data: INoteForm): void => {
        dispatch(postNote(data))
            .then(() => {
                toast.success('Başarıyla oluşturuldu!');
                push('/note');
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
                console.log('err');
            });
    };

    useEffect(() => {
        dispatch(setTitle('Not Oluştur'));
    }, [dispatch]);

    return (
        <>
            <main>
                <div className="grid lg:grid-cols-2">
                    <div className="p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex items-center justify-between my-4">
                                <div className="mt-3">
                                    <Switch
                                        id="is_everyone"
                                        label="Herkesin görmesine izin ver"
                                        {...register('is_everyone')}
                                        defaultValue={1}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 mb-6">
                                <div>
                                    <Input
                                        {...register('name')}
                                        type="text"
                                        id="name"
                                        label="Adı"
                                        className="block mt-1 w-full"
                                        messages={errors.name?.message}
                                    />
                                </div>
                                <div>
                                    <TextEditor
                                        label="İçerik"
                                        value={getValues('content') || ''}
                                        onChange={content => {
                                            setValue('content', content, {
                                                shouldValidate: true,
                                            });
                                        }}
                                        className="block mt-1 w-full"
                                        messages={errors.content?.message}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end w-full">
                                <Button
                                    isLoading={isLoading}
                                    type={'submit'}
                                    label={'Kaydet'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
