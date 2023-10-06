'usSupporte client';

import { ReactNode } from 'react';
import Calendar from '@/components/Calendar';

export default function ClassSchedulePage(): ReactNode {
    return (
        <>
            <main>
                <div className="pb-7 -z-50">
                    <Calendar />
                </div>
            </main>
        </>
    );
}
