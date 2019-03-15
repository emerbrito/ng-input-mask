import { RuleBase, RegExpRuleBase } from '../common-models';

/**
 * Uses the charather defined in the constructor as its literal value.
 */
export class LiteralRule extends RuleBase {
  
    get literal(): boolean {
        return true;
    }    

    constructor(private literalValue: string) { 
        super(literalValue);
        super.trySet(literalValue);
    }

    test(value: string): boolean {      
        return value === this.specifier;
    }

    trySet(value: string): boolean {
        return value === this.specifier;
    }      
}

/**
 * Accepts any digit between 0 and 9.
 */
export class DigitRule extends RegExpRuleBase {

    constructor() {
        super('9', new RegExp(/^\d$/));
    }
}

/**
 * Accepts any digit between 0 and 9 or space.
 */
export class DigitOrSpaceRule extends RegExpRuleBase {

    constructor() {
        super('0', new RegExp(/^[\d|\s]$/));
    }
}

/**
 * Same as rule 9. Also allows + (plus) and - (minus) signs.
 */
export class DigitSpaceOrSignRule extends RegExpRuleBase {

    constructor() {
        super('#', new RegExp(/^[\d|\s|+|-]$/));
    }
}

/**
 * Accepts any letters (a-z and A-Z).
 */
export class LettersRule extends RegExpRuleBase {

    constructor() {
        super('L', new RegExp(/^[a-zA-Z]$/));
    }
}

/**
 * Accepts any letter (a-z and A-Z) or space.
 */
export class LettersOrSpacesRule extends RegExpRuleBase {

    constructor() {
        super('?', new RegExp(/^[a-zA-Z|\s]$/));
    }
}

/**
 *  Accepts any character except a space. Equivalent to \S in regular expressions.
 */
export class CharacterRule extends RegExpRuleBase {

    constructor() {
        super('&', new RegExp(/^\S$/));
    }
}

/**
 *  Accepts any character. Equivalent to . in regular expressions.
 */
export class CharacterOrSpaceRule extends RegExpRuleBase {

    constructor() {
        super('C', new RegExp(/^.$/));
    }
}

/**
 *  Alphanumeric. Accepts letters and digits only.
 */
export class AlphanumericRule extends RegExpRuleBase {

    constructor() {
        super('A', new RegExp(/^[a-zA-Z0-9]$/));
    }
}

/**
 *  Alphanumeric or space. Accepts letters, digits and space.
 */
export class AlphanumericOrSpaceRule extends RegExpRuleBase {

    constructor() {
        super('a', new RegExp(/^[a-zA-Z0-9\s]$/));
    }
}