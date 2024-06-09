export interface IClassScheduleResponse {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    created_at: Date;
    updated_at: Date;
}

export interface IClassScheduleForm {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
}
