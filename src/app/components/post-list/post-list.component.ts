import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { Post } from './../../model/post.model';
import { PostService } from './../../services/post.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postPerPage = 10;
  currentPage = 2;
  pageSizeOptions = [5, 10, 20];
  userIsAuthed = false;
  userId: string;
  private postSub: Subscription;
  private authSubs: Subscription;

  constructor(
    public postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPost(this.postPerPage, 1);
    this.userId = this.authService.getUserId();
    this.postSub = this.postService
      .getPostUpdatedListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });

    this.userIsAuthed = this.authService.getIsAuthed();
    this.authSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthed) => {
        this.userIsAuthed = isAuthed;
        this.userId = this.authService.getUserId();
      });
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postService.getPost(this.postPerPage, this.currentPage);
  }

  onRead(post) {
    this.router.navigate(['/view', post.id]);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authSubs.unsubscribe();
  }
}
