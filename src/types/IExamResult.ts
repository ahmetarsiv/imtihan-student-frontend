import { IExamTypeResponse } from '@/types/IExamType';

export interface IExamResultResponse {
    id: number;
    total_questions: number;
    correct: number;
    in_correct: number;
    blank: number;
    point: number;
    exam: {
        exam_type: IExamTypeResponse;
    };
    student_id: number;
    score: number;
    created_at: Date;
    updated_at: Date;
}

export interface IExamResultDetailResponse extends IExamResultResponse {
    time: number;
    length: number;
    max_score: number;
    penalty_ratio: number;
}
