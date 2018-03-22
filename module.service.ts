import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LetterAvatarDirective} from './directives/letter-avatar.directive';

@NgModule({
    imports: [
        CommonModule
    ],
	declarations: [ LetterAvatarDirective ],
	exports: [
		LetterAvatarDirective
	]
})

export class SharedModule {
    constructor() {

    }
}

