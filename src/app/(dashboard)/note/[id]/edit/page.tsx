'use client';

import Toggle from '@/components/elements/Toggle';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/elements/Input';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { updateNote, getNote } from '@/store/slices/note';
import toast from 'react-hot-toast';
import { ReactNode, useEffect } from 'react';
import { INoteForm } from '@/types/INote';
import { useParams, useRouter } from 'next/navigation';
import TextEditor from '@/components/elements/TextEditor';
import { setTitle } from '@/store/slices/root';

const NoteUpdateSchema: Yup.ObjectSchema<INoteForm> = Yup.object().shape({
    name: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    is_everyone: Yup.boolean().required('Required'),
});
export default function NoteEditPage(): ReactNode {
    const { id } = useParams();
    const { push } = useRouter();
    const noteId: number = parseInt(id.toString(), 10);
    const dispatch: AppDispatch = useDispatch();
    const { note } = useSelector(state => state.note);

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
            ...note,
        },
    });

    const onSubmit = (data: INoteForm): void => {
        dispatch(updateNote(noteId, data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
                push('/note');
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
                console.log(err);
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
                                        <Toggle
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
                                    <Label>Adı</Label>

                                    <Input
                                        {...register('name')}
                                        type="text"
                                        className="block mt-1 w-full"
                                    />
                                    {errors.name?.message && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.name.message}
                                        </p>
                                    )}
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
                                    />

                                    {errors.content?.message && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            {errors.content.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end w-full">
                                <Button type="submit">Kaydet</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
