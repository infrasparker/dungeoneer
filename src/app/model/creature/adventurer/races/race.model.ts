import { Size, heightToNum } from "../../../mechanics/size.model";

export class Race {
    public name: string;
    public description: string;

    public bonuses: [number, number, number, number, number, number];

    protected firstNames: string[];
    protected lastNames: string[];

    protected ageRange: [number, number];

    protected size: Size;
    protected heightRange: [number, number];

    constructor(name: string, description: string,
        str: number = 0, dex: number = 0, con: number = 0, int: number = 0, wis: number = 0, cha: number = 0,
        firstNames: string[], lastNames: string[],
        ageRange: [number, number],
        size: Size, heightRange: [number, number]
    ) {
        this.name = name;
        this.description = description;
        this.bonuses = [str, dex, con, int, wis, cha];
        this.firstNames = firstNames;
        this.lastNames = lastNames;
        this.ageRange = ageRange;
        this.size = size;
        this.heightRange = heightRange;
    }

    public static dwarf = new Race(
        "Dwarf",
        "Give them picks, hammers, and ale and they'll forge you an armory",
        1, 0, 1, 0, 0, 0,
        [
            "Adrick",
            "Dain",
            "Vonbin"
        ],
        [
            "Balderk",
            "Durthane",
            "Thrahak"
        ],
        [50, 350],
        Size.Medium,
        [heightToNum(4, 0), heightToNum(5, 0)]
    );

    public static elf = new Race(
        "Elf",
        
    )
}

