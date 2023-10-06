'use client';

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import tr from '@fullcalendar/core/locales/tr';

export default function Calendar() {
    const events = [
        {
            title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            start: new Date(),
        },
    ];

    const renderEventContent = (eventInfo: {
        timeText: string;
        event: { title: string };
    }) => (
        <>
            <b>{eventInfo.timeText}</b> /&nbsp;{' '}
            <i className="truncate">{eventInfo.event.title}</i>
        </>
    );

    return (
        <div className="-z-50">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                locale={tr}
                events={events}
                eventContent={renderEventContent}
            />
        </div>
    );
}
