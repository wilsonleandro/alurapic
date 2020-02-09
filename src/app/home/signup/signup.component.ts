import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit {
    
    signupForm: FormGroup;
    // @ViewChild('emailInput', { static: false }) emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignupService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) {}

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            fullName: ['', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(50)
            ]],
            userName: ['', [
                Validators.required,
                lowerCaseValidator,
                Validators.minLength(5),
                Validators.maxLength(50)],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', [
                Validators.minLength(3),
                Validators.maxLength(14),
                Validators.required
            ]]
        });

        // this.platformDetectorService.ifPlatformBrowser() && 
        //     this.emailInput.nativeElement.focus();
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signupService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => {
                    console.error(err);
                    this.signupForm.reset();
                    // this.platformDetectorService.ifPlatformBrowser() && 
                    //     this.emailInput.nativeElement.focus();
                }
            );
    }
}