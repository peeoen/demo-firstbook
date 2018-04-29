import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostPage } from '../post/post';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posts: any[] = [];

  constructor(public navCtrl: NavController,
    private httpService: HttpService) {
    this.httpService.getPosts().subscribe((posts : any) => {
      for(let p of posts){
        this.posts.push({
          img: p.sourcePath,
          desc: p.content,
          title: p.title,
          id: p.postId,
          createDatetime: p.createDatetime
        })
      }
    })
  }

  ionViewDidLoad() {

  }

  goPostPage() {
    this.navCtrl.push(PostPage);
  }
}

