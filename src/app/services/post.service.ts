import { Injectable } from '@angular/core';
import { Post } from './../model/post.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

const BACKEND_URL = environment.apiUrl + 'profile/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getPost(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; profiles: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map((postData) => {
          return {
            posts: postData.profiles.map((post) => {
              return {
                fullName: post.fullName,
                profession: post.profession,
                email: post.email,
                phone: post.phone,
                country: post.country,
                town: post.town,
                id: post._id,
                filePath: post.filePath,
                creator: post.creator,
              };
            }),
            maxPosts: postData.maxPosts,
          };
        })
      )
      .subscribe((transDataPosts) => {
        console.log(transDataPosts);
        this.posts = transDataPosts.posts;
        this.postUpdated.next({
          posts: [...this.posts],
          postCount: transDataPosts.maxPosts,
        });
      });
  }

  getPostUpdatedListener() {
    return this.postUpdated.asObservable();
  }

  getPosts(id: string) {
    return this.http.get(BACKEND_URL + '/' + id);
  }

  addPost(
    fullName: string,
    profession: string,
    email: string,
    phone: string,
    country: string,
    town: string,
    doc: File
  ) {
    const postData = new FormData();
    postData.append('fullName', fullName);
    postData.append('profession', profession);
    postData.append('email', email);
    postData.append('phone', phone);
    postData.append('country', country);
    postData.append('town', town);
    postData.append('doc', doc, fullName);

    this.http
      .post<{ message: string; post: Post }>(BACKEND_URL, postData)
      .subscribe((responseData) => {
        this.router.navigate(['/']);
      });
  }
}
