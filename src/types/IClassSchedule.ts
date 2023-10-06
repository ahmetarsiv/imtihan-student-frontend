export interface IClassScheduleResponse {
    id: number;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface IClassScheduleForm {
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
}
