export interface Hero {
    id: string;
    name: string;
    height: string;
    mass: string;
    films: string[];
    starships: string[];
}
  
export interface APIResponse<T> {
    results: T[];
    next: string | null;
    previous: string | null;
}