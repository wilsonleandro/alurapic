import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Alert, AlertType } from './alert';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AlertService {

    subject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange = false;

    constructor(router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    success(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(type: AlertType, message: string, keepAfterRouteChange: boolean): void {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(new Alert(type, message));
    }

    getAlert(): Observable<Alert> {
        return this.subject.asObservable();
    }

    clear(): void {
        this.subject.next(null);
    }
}