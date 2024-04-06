'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { updateNote, getNote } from '@/store/slices/note';
import toast from 'react-hot-toast';
import { ReactNode, useEffect } from 'react';
import { INoteForm } from '@/types/INote';
import { useParams } from 'next/navigation';
import TextEditor from '@/components/TextEditor';
import { setTitle } from '@/store/slices/root';
import { Button, Input, Label, Switch } from '@codenteq/interfeys';

const NoteUpdateSchema: Yup.ObjectSchema<INoteForm> = Yup.object().shape({
    name: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    is_everyone: Yup.boolean().required('Required'),
});
export default function NoteEditPage(): ReactNode {
    const { id } = useParams();
    const noteId: number = parseInt(id.toString(), 10);
    const dispatch: AppDispatch = useDispatch();
    const { isLoading, note } = useSelector(state => state.note);

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<INoteForm>({
        resolver: yupResolver(NoteUpdateSchema),
        defaultValues: {
            ...note,
        },
        values: {
            name: note?.name || '',
            content: note?.content || '',
            is_everyone: note?.is_everyone || false,
        },
    });

    const onSubmit = (data: INoteForm): void => {
        dispatch(updateNote(noteId, data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
            });
    };

    useEffect(() => {
        dispatch(setTitle('Not Düzenle'));
        if (id) {
            dispatch(getNote(noteId));
        }
    }, [id]);

    return (
        <>
            <main>
                <div className="grid lg:grid-cols-2">
                    <div className="p-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex items-center justify-between my-4">
                                <div className="mt-3">
                                    <label className="inline-flex items-center">
                                        <Switch
                                            type={'checkbox'}
                                            {...register('is_everyone')}
                                            defaultValue={1}
                                        />

                                        <span className="ml-2 text-sm text-zinc-600">
                                            Herkesin görmesine izin ver
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid gap-4 mb-6">
                                <div>
                                    <Label htmlFor="mame">Adı</Label>
                                    <Input
                                        {...register('name')}
                                        type="text"
                                        id="name"
                                        className="block mt-1 w-full"
                                        messages={errors.name?.message}
                                    />
                                </div>
                                <div>
                                    <Label>İçerik</Label>

                                    <TextEditor
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
