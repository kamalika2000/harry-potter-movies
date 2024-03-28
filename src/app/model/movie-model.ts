export interface movies{
    id: string;
    title: string;
    duration: string;
    budget: string;
    release_date: string;
    box_office: string;
    cinematographers: Array<string>[];
    poster: string;
    producers: Array<string>[];
    summary: string;
}