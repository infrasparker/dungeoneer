import { Item } from "./item.model";

export class Armor extends Item {
    public ac: number;
    public maxDex: number;
    public stealthPenalty: boolean;

    constructor(name: string, ac: number, maxDex: number = -1, stealthPenalty: boolean = false, cost?: number, weight?: number) {
        super(name, cost, weight);
        this.ac = ac;
        this.maxDex = maxDex;
        this.stealthPenalty = stealthPenalty;
    }

    public static padded(): Armor {
        return new Armor("Padded", 11, -1, true, 500, 8);
    }

    public static leather(): Armor {
        return new Armor("Leather", 11, -1, false, 1000, 10);
    }

    public static studded_leather(): Armor {
        return new Armor("Studded Leather", 12, -1, false, 4500, 13);
    }

    public static hide(): Armor {
        return new Armor("Hide", 12, 2, false, 1000, 12);
    }

    public static chain_shirt(): Armor {
        return new Armor("Chain Shirt", 13, 2, false, 5000, 20);
    }

    public static scale_mail(): Armor {
        return new Armor("Scale Mail", 14, 2, true, 5000, 45);
    }

    public static breastplate(): Armor {
        return new Armor("Breastplate", 14, 2, false, 40000, 20);
    }

    public static half_plate(): Armor {
        return new Armor("Half Plate", 15, 2, true, 75000, 40);
    }

    public static ring_mail(): Armor {
        return new Armor("Ring Mail", 14, 0, true, 3000, 40);
    }

    public static chain_mail(): Armor {
        return new Armor("Chain Mail", 16, 0, true, 7500, 55);
    }

    public static splint(): Armor {
        return new Armor("Splint", 17, 0, true, 20000, 60);
    }

    public static plate(): Armor {
        return new Armor("Plate", 18, 0, true, 150000, 65);
    }
}