export interface IUserResponse {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    address: string;
    avatar: string;
    gender: string;
    education_level: string;
    birth_date: Date;
    country_id: number;
    city_id: number;
    state_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface IMembershipInformationForm {
    full_name: string;
    address?: string;
    /*avatar?: any | null;*/
    gender: string;
    country_id?: number;
    city_id?: number;
    state_id?: number;
    education_level: string;
    birth_date: string;
}

export interface IContactInformationForm {
    phone: string;
    email: string;
}

export interface IUpdatePasswordForm {
    password: string;
    password_confirmation: string;
    current_password: string;
}
