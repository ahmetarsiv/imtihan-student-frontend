export interface IUserResponse {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    gender: number;
    country_id: number;
    city_id: number;
    state_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface IMembershipInformationForm {
    full_name: string;
    address?: string;
    avatar?: any | null;
    gender: number;
    country_id?: number;
    city_id?: number;
    state_id?: number;
}

export interface IContactInformationForm {
    phone: string;
}

export interface IUpdatePasswordForm {
    password: string;
    password_confirmation: string;
    current_password: string;
}
