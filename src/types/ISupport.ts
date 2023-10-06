export interface ISupportResponse {
    id: number;
    subject: string;
    message: string;
    is_active: boolean;
    user_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface ISupportForm {
    subject: string;
    message: string;
    is_active: boolean;
}
