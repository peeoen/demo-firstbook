import { ElementRef, HostListener, Directive } from '@angular/core';

import { Keyboard } from 'ionic-angular';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class Autosize {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjustTextarea(textArea);
  }

  constructor(public element:ElementRef,
    private keyboard: Keyboard) {
  }

  adjustTextarea(textarea): void {
    textarea.style.overflow = 'hidden';
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    return;
  }
}