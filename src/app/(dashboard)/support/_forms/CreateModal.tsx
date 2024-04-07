'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import { postSupport } from '@/store/slices/support';
import toast from 'react-hot-toast';
import { ISupportForm } from '@/types/ISupport';
import { ReactNode } from 'react';
import { Button, Input, Modal, Textarea } from '@codenteq/interfeys';

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
    const { isLoading } = useSelector(state => state.support);

    const onSubmit = (data: ISupportForm) => {
        dispatch(postSupport(data))
            .then(() => {
                toast.success('Başarıyla oluşturuldu!');
                setIsOpen(false);
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
            });
    };

    return (
        <>
            {open && (
                <Modal title="Oluştur" isOpen={open} setIsOpen={setIsOpen}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 mb-6">
                            <div>
                                <Input
                                    {...register('subject')}
                                    type="text"
                                    id="subject"
                                    label="Konu"
                                    className="block mt-1 w-full"
                                    messages={errors.subject?.message}
                                />
                            </div>
                            <div>
                                <Textarea
                                    {...register('message')}
                                    id="message"
                                    label="Mesaj"
                                    className="block mt-1 w-full"
                                    messages={errors.message?.message}
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
                </Modal>
            )}
        </>
    );
}
