export interface Hero {
    id: number;
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    gender: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    films: string[];
    starships: string[];
}
  
export interface APIResponse<T> {
    results: T[];
    next: string | null;
    previous: string | null;
}