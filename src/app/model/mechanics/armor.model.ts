export class Armor {
    public ac: number;
    public maxDex: number;
    public stealthPenalty: boolean;
    constructor(ac: number, maxDex?: number, stealthPenalty?: boolean) {
        this.ac = ac;
        this.maxDex = maxDex || -1;
        this.stealthPenalty = stealthPenalty || false;
    }
}