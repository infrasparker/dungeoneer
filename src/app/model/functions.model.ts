export function randRange(start: number, end: number) {
    return Math.floor(Math.random() * (start - end + 1) + start);
}

export function randElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function probability(val: number): boolean {
    return Math.random() <= val ? true : false;
}