'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import tr from '@fullcalendar/core/locales/tr';
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';

export default function Calendar() {
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
    }

    const renderEventContent = (eventInfo: {
        timeText: string;
        event: { title: string };
    }) => (
        <>
            <label>{eventInfo.event.title}</label>
        </>
    );

    return (
        <div className="custom-calendar -z-50">
            <FullCalendar
                plugins={[dayGridPlugin, timelinePlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                initialView="listWeek"
                weekends={true}
                locale={tr}
                events={events}
                dateClick={dayOnClick}
                eventContent={renderEventContent}
            />
        </div>
    );
}
