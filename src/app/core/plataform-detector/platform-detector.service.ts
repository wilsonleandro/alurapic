import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class PlatformDetectorService {

    constructor(
        @Inject(PLATFORM_ID) private plataformId: string
    ) {}

    ifPlatformBrowser() {
        return isPlatformBrowser(this.plataformId);
    }

}