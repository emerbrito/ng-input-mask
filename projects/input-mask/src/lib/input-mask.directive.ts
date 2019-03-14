import { Directive, Input, ElementRef, OnChanges, SimpleChanges, SimpleChange, HostListener, Self, Optional, Output, EventEmitter } from '@angular/core';

import { NgControl } from '@angular/forms';
import { MaskEvent } from './models';
import { MaskHelper } from './core/mask-helper';

@Directive({
  selector: '[inputMask]'
})
export class InputMaskDirective implements OnChanges {

  @Input() mask: string;
  @Input() value: string;  
  @Output() format: EventEmitter<MaskEvent> = new EventEmitter<MaskEvent>();

  command: boolean;
  paste: boolean;

  util: MaskHelper;

  constructor(
    private el: ElementRef,
    @Optional() @Self() private ngControl: NgControl
  ) { }

  ngOnChanges(changes: SimpleChanges) {

    let maskValue: string = changes.mask ? changes.mask.currentValue : null;
    let valueChange: SimpleChange = changes.value;

    if(maskValue) {
      this.util = new MaskHelper(maskValue);
    }

    if(valueChange && valueChange.firstChange) {
      this.apply(valueChange.currentValue);
    }
  } 
  
  @HostListener('keydown.backspace', [ '$event' ])
  OnBackspace(event: KeyboardEvent) {

    let newValue: string;
    let pos = this.getPos();

    if(pos === 0) {
      return; // removing all content, no intervention needed
    }

    // when using backspace after literal(s), we need to manually
    // get rid of the literals so backspace can be applied 
    // to the next valid caracther.
    pos = pos - 1; 
    if(this.util.literalAt(pos)) {
      
      while(this.util.literalAt(pos) && pos >= 0) {
          pos--;
      }

      newValue = this.util.cleanValue.substr(0, pos);  
      this.setValue(newValue);
    }
  }

  @HostListener('input', [ '$event' ])
  OnInput(event: KeyboardEvent) {

    let apply: boolean = false;

    if(this.command || this.paste){
      apply = true;
    } 
    else {
      if(this.util.formattedValue.length != this.getValue().length){
        apply = true;
      }
    }  

    if(apply) {
      this.apply(this.getValue());    
    }    

    this.clearFlags();
  } 
  
  @HostListener('keydown', [ '$event' ])
  OnKeyDown(event: KeyboardEvent) {  

    if(this.commandKey(event)) {
      this.command = true;
      return;
    }
   
    if(this.util.valid && this.getPos() > (this.getValue().length - 1)) {  
      event.preventDefault();
    }

    if(!this.util.validChar(event.key)){
      event.preventDefault();
    }
  }

  @HostListener('paste', [ '$event' ])
  OnPaste(event: KeyboardEvent) {
    this.paste = true;
  }    
  
  private apply(value: string): void {
    
    this.util.set(value.toString())
    this.setValue(this.util.formattedValue);   
    this.format.emit({
      mask: this.mask,
      placeHolder: this.util.placeHolder,
      value: this.util.formattedValue,
      cleanValue: this.util.cleanValue
    });
  }

  private clearFlags(): void {
    this.command = false;
    this.paste = false;
  }

  private commandKey(event: KeyboardEvent): boolean {

    let key: string = event.key.toLowerCase();

    if(key.length > 1) {
      return true;
    }    

    if(event.ctrlKey || event.metaKey) {
      if(key === 'a' || key === 'c' || key === 'v' || key === 'x') {
        return true;
      }
    }
    
    return false;
  }

  private getPos(): number {
    return this.el.nativeElement.selectionStart;
  }  

  private getValue(): string {
    return this.el.nativeElement.value.toString();
  }

  private setValue(value: string): void {
    this.el.nativeElement.value = value;
  }    
}
