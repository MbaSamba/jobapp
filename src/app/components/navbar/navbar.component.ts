import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userIsAuthed = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userIsAuthed = this.authService.getIsAuthed();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthed) => {
        this.userIsAuthed = isAuthed;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
