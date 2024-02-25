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
import { ReactNode, useState } from 'react';

const ClassScheduleCreateSchema: Yup.ObjectSchema<ISupportForm> = Yup.object().shape({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    start_date: Yup.date().required('Required'),
    end_date: Yup.date().required('Required'),
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
    } = useForm({ resolver: yupResolver(ClassScheduleCreateSchema) });

    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data: ISupportForm) => {
        setIsLoading(true);
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
                            <Button isLoading={isLoading} type="submit">
                                Kaydet
                            </Button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
