export interface IExamResponse {
    exam_id: number;
    time: string;
    questions: IQuestion;
}

export interface IQuestion {
    id: number;
    name: string;
    description: string;
    options: IOption[];
    category: IQuestionCategory;
    is_image_option: boolean;
    src: string | null;
    language_id: number;
    difficulty: number;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface IQuestionCategory {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface IOption {
    id: number;
    description: string;
    question_id: number;
    created_at: string;
    updated_at: string;
}

export interface IExamAnswer {
    question_id: number;
    answer_id: number | null;
}

type examType = 'normal' | 'custom';
export interface IExamForm {
    type: examType;
    id: number;
}
