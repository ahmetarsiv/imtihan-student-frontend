export interface INoteResponse {
    id: number;
    name: string;
    content: string;
    is_everyone: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface INoteForm {
    name: string;
    content: string;
    is_everyone: boolean;
}
