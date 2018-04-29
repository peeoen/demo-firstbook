import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  imageURI:any;
  imageFileName:any;
  note: string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpService,
    private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
  }

  post() {
    // console.log('test')
  }

  // protected adjustTextarea(event: any): void {
  //   let textarea: any = event.target;
  //   textarea.style.overflow = 'hidden';
  //   textarea.style.height = 'auto';
  //   textarea.style.height = textarea.scrollHeight + 'px';
  //   return;
  // }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = 'data:image/jpeg;base64,' +imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  uploadImage(){
    //Show loading
    // let loader = this.loadingCtrl.create({
    //   content: "Uploading..."
    // });
    // loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);

    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: "myImage_" + random + ".jpg",
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    //file transfer action
    fileTransfer.upload(this.imageURI, 'http://192.168.1.12:54823/api/images/', options)
      .then((data) => {
        alert("Success");
        // loader.dismiss();
      }, (err) => {
        console.log(err);
        alert(JSON.stringify(err));
        // loader.dismiss();
      });
  }
}
