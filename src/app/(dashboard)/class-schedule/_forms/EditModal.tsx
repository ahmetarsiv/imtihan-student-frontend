'use client';

import { Button, Input, Modal, Textarea } from '@codenteq/interfeys';
import * as Yup from 'yup';
import { IClassScheduleForm } from '@/types/IClassSchedule';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, useDispatch, useSelector } from '@/store';
import toast from 'react-hot-toast';
import {
    getClassSchedule,
    updateClassSchedule,
} from '@/store/slices/class-schedule';
import { useEffect } from 'react';
import moment from 'moment';

const ClassScheduleUpdateSchema: Yup.ObjectSchema<IClassScheduleForm> =
    Yup.object().shape({
        name: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        start_date: Yup.string().required('Required'),
        end_date: Yup.string().required('Required'),
    });

interface IUpdateModalProps {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setIsOpen(value: boolean): void;
    id: number;
}

export default function EditModal({ open, setIsOpen, id }: IUpdateModalProps) {
    const dispatch: AppDispatch = useDispatch();
    const { classSchedule, isLoading } = useSelector(
        state => state.classSchedule,
    );

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IClassScheduleForm>({
        resolver: yupResolver(ClassScheduleUpdateSchema),
        defaultValues: {
            ...classSchedule,
        },
        values: {
            name: classSchedule?.name || '',
            description: classSchedule?.description || '',
            start_date:
                moment(classSchedule?.start_date).format('YYYY-MM-DDTHH:mm') ||
                '',
            end_date:
                moment(classSchedule?.end_date).format('YYYY-MM-DDTHH:mm') ||
                '',
        },
    });

    const onSubmit = (data: IClassScheduleForm): void => {
        dispatch(updateClassSchedule(id, data))
            .then(() => {
                toast.success('Başarıyla güncellendi!');
                setIsOpen(false);
            })
            .catch(err => {
                toast.error(err?.response?.data?.message);
            });
    };

    useEffect(() => {
        if (id) {
            dispatch(getClassSchedule(id));
        }
    }, [id]);

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
