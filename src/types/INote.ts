export interface INoteResponse {
    id: number;
    name: string;
    content: string;
    is_everyone: boolean;
    created_at: Date | any;
    updated_at: Date;
}

export interface INoteForm {
    name: string;
    content: string;
    is_everyone: boolean;
}
