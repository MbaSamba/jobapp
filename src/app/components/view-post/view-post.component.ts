import { Component, OnInit } from '@angular/core';
import { PostService } from './../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from './../../model/post.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css'],
})
export class ViewPostComponent implements OnInit {
  isLoading = false;
  post: any;
  imagePreview: any;
  postId: string;

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      let id = paramMap.get('postId');
      this.postId = id;
    });
    this.postService.getPosts(this.postId).subscribe((data) => {
      this.post = data;
      console.log(this.post);
    });
  }
}
