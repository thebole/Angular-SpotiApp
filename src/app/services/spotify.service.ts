import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCc_ftZ2Xu9KUG72cfhNjVTV8ch7_jPP8JXuTqvCrSNLRXDYc5uWcDKDHHDceG3SUumQ-HPAJaxBGOLIB0'
    });

    return this.http.get(url,{ headers });
  }

  getNewReleases() {

    return this.getQuery('browse/new-releases')
      .pipe( map( data => data['albums'].items ));
  }

  getArtists( terms: string){

    return this.getQuery(`search?q=${ terms }&type=artist&limit=15`)
        .pipe( map( data => data['artists'].items ));
  }

  getArtistById (id: string) {
    return this.getQuery(`artists/${ id}`);
        // .pipe( map( data => data['artists'].items ));

  }

}
