import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class GetApiDataService {

  guid: string = "";
  document: any = "";
  searchSubject = new Subject();
  searchDocument = new Subject();
  bytes: any;
  
  constructor(private http: HttpClient) { }

  findDocument(inputParameter: string): boolean{
    this.searchDocument
    .subscribe(guid => {
      this.http
      .get(`https://free-nba.p.rapidapi.com/players`)
      .subscribe((response: any) => {
        console.log(response)
        const obj = JSON.parse(JSON.stringify(response));
        console.log(obj)
        // const byteArray = new Uint8Array(atob(obj.docContent).split('').map(char.charCodeAt(0)));
        // this.bytes = byteArray;
        // var blob = new Blob([byteArray], {type: 'application/pdf'});
        // const url = window.URL.createObjectURL(blob);
      })
    })
    return true;
  }
}
