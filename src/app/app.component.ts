import { Component, OnInit } from '@angular/core';

import { Post } from './model/post.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  postStored: Post[] = [];

  constructor(private authSercice: AuthService) {}

  onPostAdded(post) {
    this.postStored.push(post);
  }

  ngOnInit() {
    this.authSercice.autoAuthUser();
  }
}
