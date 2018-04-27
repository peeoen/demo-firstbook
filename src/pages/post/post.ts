import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput } from 'ionic-angular';
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
    this.http.getSampleData();
  }


  // protected adjustTextarea(event: any): void {
  //   let textarea: any = event.target;
  //   textarea.style.overflow = 'hidden';
  //   textarea.style.height = 'auto';
  //   textarea.style.height = textarea.scrollHeight + 'px';
  //   return;
  // }
}
