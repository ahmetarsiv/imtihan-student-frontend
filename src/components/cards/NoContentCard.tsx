'use client';

import NavLink from '@/components/NavLink';
import Button from '@/components/Button';
import { ReactNode } from 'react';

interface NoContentCardProps {
    children: ReactNode;
    className?: string;
    name: string;
    description: string;
    button?: {
        onClick: () => void;
        name: string;
    };
    link?: {
        name: string;
        href: string;
    };
}

export default function NoContentCard({
    children,
    className,
    name,
    description,
    button,
    link,
}: NoContentCardProps) {
    return (
        <>
            <div className={`${className}`}>
                <div className="flex flex-col lg:flex-row items-center lg:max-w-4xl h-auto border border-brand rounded-2xl p-5 ">
                    <div className="order-last lg:order-first">
                        <h3 className="text-2xl font-bold tracking-tight">
                            {name}
                        </h3>
                        <p className="text-lg">{description}</p>
                        <div className="pt-10">
                            {link && (
                                <NavLink
                                    name={link?.name}
                                    href={link?.href}
                                    className="p-2.5"
                                />
                            )}
                            {button && (
                                <Button
                                    isLoading={false}
                                    onClick={button.onClick}
                                    className="p-2.5">
                                    {button.name}
                                </Button>
                            )}
                        </div>
                    </div>
                    <div>{children}</div>
                </div>
            </div>
        </>
    );
}
