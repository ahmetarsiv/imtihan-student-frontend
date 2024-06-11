'use client';

import { Button, Input, Modal, Textarea } from '@codenteq/interfeys';
import * as Yup from 'yup';
import { IClassScheduleForm } from '@/types/IClassSchedule';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import toast from 'react-hot-toast';
import { postClassSchedule } from '@/store/slices/class-schedule';

const ClassScheduleCreateSchema: Yup.ObjectSchema<IClassScheduleForm> =
    Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        start_date: Yup.string().required('Required'),
        end_date: Yup.string().required('Required'),
    });

interface ICreateModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
}

export default function CreateModal({ open, setIsOpen }: ICreateModalProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: yupResolver(ClassScheduleCreateSchema) });
    const dispatch: AppDispatch = useDispatch();
    const { isLoading } = useSelector(state => state.classSchedule);

    const onSubmit = (data: IClassScheduleForm) => {
        dispatch(postClassSchedule(data))
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
                                    {...register('name')}
                                    type="text"
                                    id="name"
                                    label="Adı"
                                    className="block mt-1 w-full"
                                    messages={errors.name?.message}
                                />
                            </div>
                            <div>
                                <Textarea
                                    {...register('description')}
                                    id="description"
                                    label="Açıklama"
                                    className="block mt-1 w-full"
                                    messages={errors.description?.message}
                                />
                            </div>
                        </div>
                        <div className="grid gap-4 mb-6 lg:grid-cols-2">
                            <div>
                                <Input
                                    {...register('start_date')}
                                    type="datetime-local"
                                    id="start_date"
                                    label="Başlangıç tarihi"
                                    className="block mt-1 w-full"
                                    messages={errors.start_date?.message}
                                />
                            </div>
                            <div>
                                <Input
                                    {...register('end_date')}
                                    type="datetime-local"
                                    id="end_date"
                                    label="Bitiş tarihi"
                                    className="block mt-1 w-full"
                                    messages={errors.end_date?.message}
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
