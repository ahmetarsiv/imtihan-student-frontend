'use client';

import { setTitle } from '@/store/slices/root';
import React, { ReactNode, useEffect } from 'react';
import { AppDispatch, useDispatch } from '@/store';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import tr from '@fullcalendar/core/locales/tr';

export default function ClassSchedulePage(): ReactNode {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(setTitle('Ders Programları'));
    }, [dispatch]);

    const events = [
        {
            title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            start: new Date(),
        },
        {
            title: '4540 Merkez',
            start: '2024-02-01',
        },
        {
            title: 'Evet merkez dinlemede',
            start: '2024-02-02',
        },
    ];

    const dayOnClick = (data: any) => {
        console.log(data);
    };

    const renderEventContent = (eventInfo: {
        timeText: string;
        event: { title: string };
    }) => (
        <>
            <label>{eventInfo.event.title}</label>
        </>
    );

    return (
        <>
            <main>
                <div className="pb-7 -z-50">
                    <div className="custom-calendar -z-50">
                        <FullCalendar
                            plugins={[
                                dayGridPlugin,
                                timelinePlugin,
                                timeGridPlugin,
                                listPlugin,
                                interactionPlugin,
                            ]}
                            initialView="dayGridMonth"
                            weekends={true}
                            locale={tr}
                            events={events}
                            dateClick={dayOnClick}
                            eventContent={renderEventContent}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}
