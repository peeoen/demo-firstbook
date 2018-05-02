import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ENV } from '@app/env';
import { map } from 'rxjs/operators/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient,
        private transfer: FileTransfer) {
 
    }

    getPosts() {
        return this.http.get(ENV.API_URL + "api/feeds/").pipe(
            map((res:any[]) => {
                for(let r of res){
                    r.sourcePath= ENV.API_URL + r.sourcePath
                }
                return res;
            })
        )
    }

uploadImage(image:any,options:any) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    return fileTransfer.upload(image, ENV.API_URL + 'api/images/', options)
}

}