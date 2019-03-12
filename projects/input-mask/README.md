# Angular InputMask Directive

This directive enables a controlled text input based on a specific format.

The format is defined by a mask containing a set of rules.
The rules are placeholders for a specific set of cahracters, anything that is not a known rule will be applied as a constant at the specigied position.

### Rules

| Rule | Description
|:----:|------------
| 9    | Accepts any digit between 0 and 9.
| L    | Restricts the input to a-z and A-Z letters. Equivalent to [a-zA-Z] in regular expressions
| A    | Alphanumeric. Accepts letters and digits only.

### Masking

Sample of a social security mask:

    999-99-9999

What to expect as the user types:

| User Input | Field Value
|------------|---
| 123        | 123
| 1234       | 123-4
| 12345678   | 123-45-678

## Usage

To use the InputMask directive import the module:

    import { InputMaskModule } from '@emerbrito/input-mask';

Basica usage:

    <input inputMask mask="999-99-9999">

Tap into the format event to get additional information including the **unformatted** value.

    <input inputMask mask="999-99-9999" (format)="valueFormatted($event)">

In your component:

    valueFormatted(event: MaskEvent) {
        console.log('Formatted value: ', event.value);
        console.log('Clean value: ', event.cleanValue);
    }