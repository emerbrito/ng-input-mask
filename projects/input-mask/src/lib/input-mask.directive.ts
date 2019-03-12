import { Directive, Input, ElementRef, OnChanges, SimpleChanges, SimpleChange, HostListener, Self, Optional, Output, EventEmitter } from '@angular/core';
import { FormatHelper } from './core/format-helper';
import { NgControl } from '@angular/forms';
import { MaskEvent } from './models';

@Directive({
  selector: '[inputMask]'
})
export class InputMaskDirective implements OnChanges {

  @Input() mask: string;
  @Input() value: string;  
  @Output() format: EventEmitter<MaskEvent> = new EventEmitter<MaskEvent>();

  helper: FormatHelper;

  constructor(
    private el: ElementRef,
    @Optional() @Self() private ngControl: NgControl
  ) { }

  ngOnChanges(changes: SimpleChanges) {

    let maskValue: string = changes.mask ? changes.mask.currentValue : null;
    let valueChange: SimpleChange = changes.value;

    if(maskValue) {
      this.helper = new FormatHelper(maskValue);
    }

    if(valueChange && valueChange.firstChange) {
      this.formatAndSetValue(valueChange.currentValue);
    }
  } 
  
  @HostListener('input', [ '$event' ])
  OnInput(event: KeyboardEvent) {

    let value = this.getValue();
    this.formatAndSetValue(value);    
  }  
  
  private formatAndSetValue(value: string): void {
    
    let fvalue = this.helper.apply(value.toString());    

    this.setValue(fvalue);   
    this.format.emit({
      mask: this.mask,
      placeHolder: this.helper.placeHolder,
      value: this.helper.value,
      cleanValue: this.helper.cleanValue
    });

  }

  private getValue(): string {
    return this.el.nativeElement.value.toString();
  }

  private setValue(value: string): void {
    this.el.nativeElement.value = value;
  }    
}
