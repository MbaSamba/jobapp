import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from './../../model/post.model';
import { mimeType } from './mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  enteredTitle = '';
  enteredContent = '';
  form: FormGroup;
  isLoading = false;
  post: Post;
  imagePreview: any;
  private mode = 'create';
  private postId: string;
  private authStatusSubs: Subscription;

  constructor(
    public postService: PostService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSubs = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
    this.form = new FormGroup({
      fullName: new FormControl(null, {
        validators: [Validators.required],
      }),
      profession: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [Validators.required],
      }),
      phone: new FormControl(null, {
        validators: [Validators.required],
      }),
      country: new FormControl(null, {
        validators: [Validators.required],
      }),
      town: new FormControl(null, {
        validators: [Validators.required],
      }),

      doc: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ doc: file });
    this.form.get('doc').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      console.log(file);
    };
    reader.readAsDataURL(file);
  }

  onAddPost() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postService.addPost(
        this.form.value.fullName,
        this.form.value.profession,
        this.form.value.email,
        this.form.value.phone,
        this.form.value.country,
        this.form.value.town,
        this.form.value.doc
      );
    } else {
      console.log('no');
    }
    this.form.reset();
    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }
}
