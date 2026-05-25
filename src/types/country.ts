export interface Country {
    name: {common: string};
    population: number;
    area: number;
    region: string;
    flag: {svg: string};
    currencies?: {[key: string]: {name: string, symbol?: string}};
    languages?: {[key: string]: string};
}