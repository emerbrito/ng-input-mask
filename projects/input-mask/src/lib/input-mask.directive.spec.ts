import { InputMaskDirective } from './input-mask.directive';
import { TestBed, async } from '@angular/core/testing';
import { ElementRef, Injectable } from '@angular/core';

@Injectable()
class MockElementRef extends ElementRef {
  nativeElement: {}
}

describe('InputMaskDirective', () => {

  let directive: InputMaskDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        InputMaskDirective,
        { provide: ElementRef, useValue: new ElementRef('input') }
      ]
    })
    .compileComponents();
  }));  

  beforeEach(() => {
    directive = TestBed.get(InputMaskDirective);
   });


  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
