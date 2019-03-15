# InputMask Angular Directive
A mask directive with support for custom rules and Angular forms.  
Provides advanced masking capabilities while working well with (and mostly transparent to) context menu and keyboard operations such as copy and paste.

Basic usage:
````html
<input inputMask mask="999-99-9999">
````

## Rules
The following are the predefined mask rules:

 Rule | Description 
:----:|:------------
 9 | Accepts any digit between 0 and 9.
 0 | Accepts any digit between 0 and 9 or space.
 \# | Same as rule 9. Also allows + (plus) and - (minus) signs.
 L | Accepts any letters (a-z and A-Z).
 ? | Accepts any letter (a-z and A-Z) or space.
 & | Accepts any character except a space. Equivalent to \S in regular expressions.
 C | Accepts any character. Equivalent to . in regular expressions.
 A | Alphanumeric. Accepts letters and digits only.
 a | Alphanumeric or space. Accepts letters, digits and space.

### Escaping Rules
Use the character `|` (pipe) to escape any of the mask rules and use them as literals.

## Using InputMask
Start by importing the `InputMaskModule`:

````javascript
import { InputMaskModule } from '@emerbrito/input-mask';
````

Then apply the directive to an input element and set the mask property:

````html
<input inputMask mask="999-99-9999">
````

### Getting Unformatted Value
As expected the mask will change the input value as it is entered.  
To access the unformatted value (among with additional info) listen to the directive's `format` event:

````html
<input inputMask mask="999-99-9999" (format)="onFormat($event)">
````

````javascript
onFormat(event: MaskEvent) {
    console.log('Formatted value: ', event.value);
    console.log('Clean value: ', event.cleanValue);
}
````

## Angular Forms
By default, when used inside an Angular form the directive will interact with `FormControl` setting its invalid state based on whether or not the input satisfies the mask.

To prevent the mask validation from propagating to the form control (if you is being used) set the `validateMask` property to `false`.

````html
<input inputMask mask="999-99-9999" validateMask="false">
````

### Custom Rules
For a use case not covered by the built in rules, new custom rules can be created and registered with the directive. See [wiki](https://github.com/emerbrito/ng-input-mask/wiki) form more details.