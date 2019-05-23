import { Component, OnInit, HostListener, HostBinding, ElementRef } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { SignupService } from './signup.service';
import user from './model/user';
import { Logout_success } from './sb-container/sb-container.component';
import { MatSnackBar } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private sv: SignupService, private snackBar: MatSnackBar
    ,public overlayContainer: OverlayContainer, private elementRef: ElementRef) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }


  user = null;
  durationInSeconds: number = 5;

  public innerWidth: any;
  public isSmall: boolean = true;
  
  width = 600;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < this.width) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
  }

  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    if (theme == 'dark-theme') {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#545454';
    } else {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
    }
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < this.width) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
    //if (this.user) {
    console.log("User\n");
    this.sv
      .loged_in_user()
      .subscribe((data: user) => {
        this.user = data;
        console.log(this.user);
    },
    error => {
      console.log("No one logged in yet");
    });
   // }
  }

  title = 'repter-foglalo';
  
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  log_out(isSnack) {
    console.log("log_out")
    this.sv.log_out().subscribe(res => {
      console.log('Done')
      this.user = null;
      this._router.navigate(['/login']);
      if (isSnack) {
        this.snackBar.openFromComponent(Logout_success, {
          duration: this.durationInSeconds * 1000
        });
      }
    });
  }

  loged_in_user() {
    console.log("User\n");
    this.sv
      .loged_in_user()
      .subscribe((data: user) => {
        this.user = data;
        console.log(this.user);
      });
  }
  get_loged_in_user(){
    return this.user;
  }

}