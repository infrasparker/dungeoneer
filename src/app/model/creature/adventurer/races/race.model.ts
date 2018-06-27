import { Size, heightToNum } from "../../../mechanics/size.model";
import { randRange, randElement, probability } from "../../../functions.model";

export class Race {
    public name: string;
    public description: string;

    public bonuses: [number, number, number, number, number, number];

    protected firstNames: string[];
    protected lastNames: string[];

    protected ageRange: [number, number];

    public size: Size;
    protected heightRange: [number, number];

    protected languages: [string, number][];

    constructor(name: string, description: string,
        str: number = 0, dex: number = 0, con: number = 0, int: number = 0, wis: number = 0, cha: number = 0,
        firstNames: string[], lastNames: string[],
        ageRange: [number, number],
        size: Size, heightRange: [number, number],
        languages: [string, number][]
    ) {
        this.name = name;
        this.description = description;
        this.bonuses = [str, dex, con, int, wis, cha];
        this.firstNames = firstNames;
        this.lastNames = lastNames;
        this.ageRange = ageRange;
        this.size = size;
        this.heightRange = heightRange;
        this.languages = languages;
    }

    public generateName(): string {
        return randElement(this.firstNames) + " " + randElement(this.lastNames);
    }

    public generateAge(): number {
        return randRange(this.ageRange[0], this.ageRange[1]);
    }

    public generateHeight(): number {
        return randRange(this.heightRange[0], this.heightRange[1]);
    }

    public generateLanguages(): string[] {
        let ret = [];
        this.languages.forEach(pair => {
            if (probability(pair[1]))
                ret.push(pair[0]);
        });
        return ret;
    }


    public static dwarf: Race = new Race(
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
        [heightToNum(4, 0), heightToNum(5, 0)],
        [
            ["Common", 1],
            ["Dwarvish", 1]
        ]
    );

    public static elf: Race = new Race(
        "Elf",
        "A creature of wild emotion, held back by only by a mortal body",
        0, 1, 0, 0, 1, 0,
        [
            "Adran",
            "Heian",
            "Varis"
        ],
        [
            "Berevan",
            "Iathrana",
            "Yaeldrin"
        ],
        [80, 750],
        Size.Medium,
        [heightToNum(4, 6), heightToNum(6, 6)],
        [
            ["Common", 1],
            ["Elvish", 1]
        ]
    );

    public static halfling: Race = new Race(
        "Halfling",
        "Affable, cheerful, and generally lucky",
        0, 1, 0, 0, 0, 1,
        [
            "Alton",
            "Cade",
            "Corrin"
        ],
        [
            "Brushgather",
            "Goodbarrel",
            "Greenbottle"
        ],
        [18, 250],
        Size.Small,
        [heightToNum(2, 6), heightToNum(3, 6)],
        [
            ["Common", 1],
            ["Halfling", 1]
        ]
    );

    public static human: Race = new Race(
        "Human",
        "How very plain",
        1, 1, 1, 1, 1, 1,
        [
            "Anton",
            "Malcer"
        ],
        [
            "Johnson",
            "Mercer",
            "Riegel"
        ],
        [18, 80],
        Size.Medium,
        [heightToNum(4, 10), heightToNum(6, 6)],
        [
            ["Common", 1],
            ["Dwarvish", .6],
            ["Elvish", .5],
            ["Giant", .2],
            ["Gnomish", .5],
            ["Goblin", .2],
            ["Halfling", .3],
            ["Orc", .4],
            ["Abyssal", .05],
            ["Celestial", .05],
            ["Draconic", .2],
            ["Deep Speech", .05],
            ["Infernal", .1],
            ["Primmordial", .05],
            ["Sylvan", .1],
            ["Undercommon", .1]
        ]
    );

    public static dragonborn: Race = new Race(
        "Dragonborn",
        "The proud dragon kin, shaped by draconic gods or dragons themselves",
        1, 0, 0, 0, 0, 1,
        [
            "Arjhan",
            "Balasar",
            "Barash"
        ],
        [
            "Clethtinthiallor",
            "Daardendrian"
        ],
        [12, 80],
        Size.Medium,
        [heightToNum(6, 0), heightToNum(7, 0)],
        [
            ["Common", 1],
            ["Draconic", 1]
        ]
    );

    public static gnome: Race = new Race(
        "Gnome",
        "Their small forms are compensated by their fast and energetic personalities",
        0, 1, 0, 1, 0, 0,
        [
            "Alston",
            "Donella",
            "Lorilla"
        ],
        [
            "Beren",
            "Daergel"
        ],
        [30, 500],
        Size.Small,
        [heightToNum(3, 0), heightToNum(4, 0)],
        [
            ["Common", 1],
            ["Gnomish", 1]
        ]
    );

    public static halfElf: Race = new Race(
        "Half Elf",
        "Walks in two worlds and lives in neither",
        0, 1, 0, 0, 1, 1,
        [
            "Human"
        ],
        [
            "Elf"
        ],
        [18, 200],
        Size.Medium,
        [heightToNum(5, 0), heightToNum(6, 0)],
        [
            ["Common", 1],
            ["Dwarvish", .4],
            ["Elvish", 1],
            ["Giant", .05],
            ["Gnomish", .3],
            ["Goblin", .05],
            ["Halfling", .2],
            ["Orc", .1],
            ["Abyssal", .05],
            ["Celestial", .05],
            ["Draconic", .1],
            ["Deep Speech", .05],
            ["Infernal", .05],
            ["Primmordial", .05],
            ["Sylvan", .2],
            ["Undercommon", .1]
        ]
    );

    public static races: Race[] = [
        Race.dwarf, Race.elf, Race.halfling, Race.human, Race.dragonborn, Race.gnome, Race.halfElf
    ];

    public static randRace(): Race {
        return Race.races[Math.floor(Math.random() * Race.races.length)];
    }
}

