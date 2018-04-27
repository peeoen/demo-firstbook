import { ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjustTextarea(textArea);
  }

  constructor(public element:ElementRef) {
  }

  adjustTextarea(textarea): void {
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }
}