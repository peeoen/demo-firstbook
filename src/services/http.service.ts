import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ENV } from '@app/env';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) {
 
    }

    getSampleData() {
        console.log(ENV);
        return 'sample';
    }
    
}