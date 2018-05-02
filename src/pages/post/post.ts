import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  base64Imag: any;
  imageFileName: any;
  content: string;

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

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Imag = 'data:image/jpeg;base64,' + imageData;
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

  uploadImage() {
    //Show loading
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    //create file transfer object
    const fileTransfer: FileTransferObject = this.transfer.create();

    //random int
    var random = Math.floor(Math.random() * 100);
    const filename = "myImage_" + random + ".jpg";
    //option transfer
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      httpMethod: 'post',
      mimeType: "image/jpeg",
      headers: {}
    }

    const params = {
      description: this.content,
      email: 'theerawat.pon@gmail.com'
    }

    options.params = params;

    //file transfer action
    fileTransfer.upload(this.base64Imag, 'http://192.168.9.199:54823/api/images/', options)
      .then((data) => {
        alert("Success");
        loader.dismiss();
      }, (err) => {
        console.log(err);
        alert(JSON.stringify(err));
        loader.dismiss();
      });
  }
}
