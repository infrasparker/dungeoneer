import { Adventurer } from "../adventurer.model";
import { DamageResistance } from "../../../mechanics/damage.model";
import { ConditionResistance } from "../../../mechanics/condition.model";
import { AttackRoll, Buff } from "../../ability.model";
import { Creature } from "../../creature.model";
import { DiceRoll } from "../../../mechanics/roll.model";
import { Armor } from "../../../item/armor.model";
import { Bonus } from "../../bonus.model";

export class Footman extends Adventurer {
    constructor(name: string,
        str?: number, dex?: number, con?: number, int?: number, wis?: number, cha?: number,
        level?: number
    ) {
        super(name, str, dex, con, int, wis, cha, level);
    }

    protected generateClassInformation(): void {
        this.className = "Footman";
        this.classDescription = "They like swords and shields, helmets and chestpieces, broccoli and beef";
    }

    protected generateHitDice(): void {
        this.hitDice = new DiceRoll(this.level, 10);
    }

    protected generateArmor(): void {
        this.ac_natural = 10;
        this.armor = Armor.chain_shirt();
    }

    protected generateSavingThrows(): void {
        this.saves = [true, false, true, false, false, false];
    }

    protected generateAbilities(): void {
        this.abilities = [new Slash(), new HoldFast(), new Charge(), new Rally()];
    }

    protected generateDamageResistances(): void {
        this.damageResistances = DamageResistance.generateDefaultDamageResistances();
    }

    protected generateConditionResistances(): void {
        this.conditionResistances = ConditionResistance.generateDefaultConditionResistances();
    }
}

class Slash extends AttackRoll {
    private damageDice: DiceRoll;

    constructor() {
        super("Slash", "Swing and pray", false, false, true);
        this.damageDice = new DiceRoll(1, 6);
    }

    protected attackBonus(user: Footman, target: Creature): number {
        return user.strength() + user.proficiencyBonus + user.bonuses.bonus("attack");
    }

    protected attackFlavor(user: Footman, target: Creature, roll: number): string {
        return user.name + " lashes out at " + target.name + " with their sword (" + roll + ").";
    }

    protected applyEffect(user: Footman, target: Creature): string {
        let damage: number = this.damageDice.roll() + user.strength();
        damage *= target.getDamageResistance("laceration");
        return user.name + " slashes into " + target.name + " for " + damage + " laceration damage.";
    }

    public display(): string {
        return "Swing forward at a target, dealing 1d6+STR laceration damage.";
    }
}

class HoldFast extends Buff {
    constructor() {
        super("Hold Fast", "Live to fight another turn... maybe", false, true, false);
    }

    public use(user: Footman, target: Footman): string {
        user.bonuses.addBonus("ac", new Bonus(5, 1));
        return user.name + " puts forth their shield.";
    }

    public display(): string {
        return "Lower your sword and raise your shield, gaining +5 AC for a turn."
    }
}

class Charge extends AttackRoll {
    private damageDice: DiceRoll;

    constructor() {
        super("Reckless Charge", "BREAKTHEIRRANKS!", false, false, true);
        this.damageDice = new DiceRoll(1, 10);
    }

    protected attackBonus(user: Footman, target: Creature): number {
        return user.strength() + user.proficiencyBonus + user.bonuses.bonus("attack");
    }

    protected attackFlavor(user: Footman, target: Creature, roll: number): string {
        return name + " lunges forward with a wild swing (" + roll + ").";
    }

    protected applyEffect(user: Footman, target: Creature): string {
        let damage: number = this.damageDice.roll() + user.strength();
        damage *= target.getDamageResistance("laceration");
        user.bonuses.addBonus("ac", new Bonus(-2, 1));
        return user.name + " charges into " + target.name + " and swings, cutting " + target.name + " for " + damage + " laceration damage.";
    }

    public display(): string {
        return "Charge, dealing 1d10+STR laceration damage and lowering your AC by 2 for a turn.";
    }
}

class Rally extends Buff {
    constructor() {
        super("Rally", "Invoke your inner bard", true, false, false);
    }

    public use(user: Footman, target: Creature): string {
        target.bonuses.addBonus("attack", new Bonus(5, 1));
        return user.name + " calls out confidently to " + target.name + ".";
    }

    public display(): string {
        return "Shout words of encouragement to an ally, giving them +5 to attack for a turn.";
    }
}