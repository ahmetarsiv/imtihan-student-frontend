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

export interface IUserForm {
    full_name: string;
    phone: string;
    address: string;
    avatar?: any | null;
    gender: number;
    country_id: number;
    city_id: number;
    state_id: number;
}
