import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  @ViewChild('postInput') postInput;

  note: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpService) {
    this.focusInput(this.postInput)
  }

  ionViewDidLoad() {
  }

  ionViewDidEnter() {
    this.focusInput(this.postInput);
  }

  focusInput(input) {
    setTimeout(() => {
      this.postInput.setFocus();
    }, 150);
  }

  post() {
    console.log('test')
  }

  // protected adjustTextarea(event: any): void {
  //   let textarea: any = event.target;
  //   textarea.style.overflow = 'hidden';
  //   textarea.style.height = 'auto';
  //   textarea.style.height = textarea.scrollHeight + 'px';
  //   return;
  // }
}
