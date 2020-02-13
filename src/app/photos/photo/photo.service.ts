import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http.get<Photo[]>(apiUrl + '/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams().append('page', page.toString());
        return this.http.get<Photo[]>(apiUrl + '/' + userName + '/photos', {params});
    }

    upload(description: string, allowComments: true, file: File) {
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true' : 'false');
        formData.append('imageFile', file);

        return this.http.post(
            apiUrl + '/photos/upload', 
            formData,
            {
                observe: 'events',
                reportProgress: true
            }
        );
    }

    findById(photoId: number) {
        return this.http
            .get<Photo>(apiUrl + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http
            .get<PhotoComment[]>(apiUrl + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string) {
        return this.http
            .post<PhotoComment[]>(apiUrl + '/photos/' + photoId + '/comments', {commentText});
    }

    removePhoto(photoId: number) {
        return this.http
            .delete(apiUrl + '/photos/' + photoId);
    }

    like(photoId: number) {
        return this.http
            .post(apiUrl + '/photos/' + photoId + '/like', {}, { observe: 'response' })
            .pipe(map( res => true))
            .pipe(catchError(err => {
                return err.status == '304' ? of(false) : throwError(err);
            }));
    }

}