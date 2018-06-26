export enum Size {
    Tiny,
    Small,
    Medium,
    Large,
    Huge,
    Gargantuan
}

export function heightToNum(feet: number, inches: number): number {
    return feet * 12 + inches;
}