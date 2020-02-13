import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';
import { Title } from '@angular/platform-browser';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

    fromUrl: string;
    loginForm: FormGroup;
    @ViewChild('userNameInput', { static: false }) userNameInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams
            .subscribe(params => 
                this.fromUrl = params.fromUrl);

        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.setFocus();
    }

    private setFocus() {
        if ( this.platformDetectorService.ifPlatformBrowser() && this.userNameInput ) {
            this.userNameInput.nativeElement.focus();
        }
    }

    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        this.authService.authenticate(userName, password)
            .subscribe(() => {
                if (this.fromUrl) {
                    this.router.navigateByUrl(this.fromUrl);
                } else {
                    this.router.navigate(['user', userName]);
                }
            },
            err => {
                console.error(err);
                this.loginForm.reset();
                this.setFocus();
            });
    }

}