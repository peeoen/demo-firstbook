import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ENV } from '@app/env';
import { map } from 'rxjs/operators/map';
import { concatMap } from 'rxjs/operators/concatMap';
import { from } from 'rxjs/observable/from';
@Injectable()
export class HttpService {

    constructor(private http: HttpClient) {
 
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
    
}