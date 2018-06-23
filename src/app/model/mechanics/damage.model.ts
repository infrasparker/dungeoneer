export class DamageResistance {
    constructor(
        public arcane:      number, // Pure magical energy
        public bludgeoning: number, // Raw physical force
        public corrosion:   number, // Chemical deconstruction or alteration
        public divine:      number, // Borrowed from the heavens
        public fire:        number, // Intense heat
        public frost:       number, // Intense cold
        public laceration:  number, // Stabs and slashes
        public lightning:   number, // The power of electricity
        public necrotic:    number, // Corrupting ones identity
        public toxic:       number, // Biotoxins, radiation, and synthetic poison alike
    ) { }

    public static generateDefaultDamageResistances(): DamageResistance {
        return new DamageResistance(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}