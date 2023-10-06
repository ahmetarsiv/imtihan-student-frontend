'use client';

import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Label from '@/components/Label';
import Input from '@/components/elements/Input';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch } from '@/store';
import { postSupport } from '@/store/slices/support';
import toast from 'react-hot-toast';
import Textarea from '@/components/elements/Textarea';
import { ISupportForm } from '@/types/ISupport';
import { ReactNode } from 'react';

const SupportCreateSchema: Yup.ObjectSchema<ISupportForm> = Yup.object().shape({
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required'),
    is_active: Yup.boolean().required('Required').default(false),
});

interface ICreateModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
}

export default function CreateModal({
    open,
    setIsOpen,
}: ICreateModalProps): ReactNode {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: yupResolver(SupportCreateSchema) });

    const dispatch: AppDispatch = useDispatch();

    const onSubmit = (data: ISupportForm) => {
        dispatch(postSupport(data))
            .then(() => {
                toast.success('Başarıyla oluşturuldu!');
                setIsOpen(false);
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
                console.log('err');
            });
    };

    return (
        <>
            {open && (
                <Modal title="Oluştur" isOpen={open} setIsOpen={setIsOpen}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 mb-6">
                            <div>
                                <Label>Konu</Label>

                                <Input
                                    {...register('subject')}
                                    type="text"
                                    className="block mt-1 w-full"
                                />
                                {errors.subject?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.subject.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Label>Mesaj</Label>

                                <Textarea
                                    {...register('message')}
                                    className="block mt-1 w-full"
                                />
                                {errors.message?.message && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end w-full">
                            <Button type="submit">Kaydet</Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
