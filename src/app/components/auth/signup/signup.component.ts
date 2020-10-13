import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSubs: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authStatusSubs = this.authService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.addUser(form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSubs.unsubscribe();
  }
}

// AMABUYE 30K
// GLAVIE 30K
// FER 38K
// LONGER 4 40K
// CIMENT 4 48K
// AMAZI 5K
// UMUCANGA 30K
// MAIN D. 70k
