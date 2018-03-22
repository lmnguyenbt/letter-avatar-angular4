<h2>
	For the latest Angular, added letter-avatar directive, use for the latest angular2 or above versions
</h2>

AngularJS directive for simple data avatar like gmail/inbox. 
<a href="https://github.com/lmnguyenbt/letter-avatar-angular4">demo</a>

preview snaps :
 
![demo](https://raw.github.com/lmnguyenbt/letter-avatar-angular4/master/demo/demo1.png)
![demo](https://raw.github.com/lmnguyenbt/letter-avatar-angular4/master/demo/demo2.png)
![demo](https://raw.github.com/lmnguyenbt/letter-avatar-angular4/master/demo/numbers.png)

* [Directive](#directive)
* [SharedModule](#shared-modules)
* [Usage](#usage)
* [UseHTMLtags] (#use HTML tags)

#### 1. Directive

First you need to create letter-avatar with directive module:

```ts
import {Component, ElementRef, Input, OnInit, ChangeDetectionStrategy, OnChanges} from '@angular/core';

@Component({
    selector: 'avatar',
    template: `
            <div [style.background-color]="props.background" [style.width] = "props.size" [style.line-height]='props.lineheight' [style.height] = 'props.size' [style.font-size] = 'props.fontSize' [style.border] = 'props.border' [style.border-radius] = 'props.borderradius' [style.text-align] ="props.textalign">
				<div [style.color]='fontColor'>{{props.letter}}</div>
            </div>
            `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LetterAvatarDirective implements OnInit, OnChanges {
    @Input('avatarData') avatarData:any;
    @Input('nameData') nameData:any;
    letterSrc:string;
    background:string = 'red';
    fontSize:number = 49;
    padding:number = 28;
    letter:string = "?";
    size:number = 100;
    fontColor:string = '#FFFFFF';
    border:string;
    props:Object = null;
    private _el:HTMLElement;

    constructor(el:ElementRef) {
        this._el = el.nativeElement;
    }

    test() {
        this.generateLetter();
    }

    generateLetter() {
        if (!this.avatarData) {
            throw Error("LetterAvatarDirective configdata not provides");
        }

        if (!this.avatarData.text) {
            this.avatarData.text = '?';
        }

        if(this.nameData) {
            this.avatarData.text = this.nameData;
        }

        var size = this.avatarData && this.avatarData.size ? this.avatarData.size : 100;
        this.fontColor = this.avatarData.fontColor ? this.avatarData.fontColor : "#FFFFFF";
        var isSquare = this.avatarData && this.avatarData.isSquare ? true : false;
        var border = this.avatarData && this.avatarData.border ? this.avatarData.border : "1px solid #d3d3d3";
        var background = this.avatarData && this.avatarData.background ? this.avatarData.background : null;
        var text = this.avatarData && this.avatarData.text ? this.avatarData.text : null;
        this.background = background;
        var textArray = text.split(' ');
        var letter = textArray[0].substr(0, 1) + '' + (textArray.length > 1 ? textArray[1].substr(0, 1) : '');
        letter = letter.toUpperCase();
        this.fontSize = (39 * size) / 100;
        this.padding = (28 * size) / 100;
        this.letter = letter;
        this.size = size;
        this.props = new Object();
        this.props['size'] = size + 'px';
        this.props['lineheight'] = this.size + 'px';
        this.props['letter'] = letter;
        this.props['fontSize'] = this.fontSize + 'px';

        if (isSquare) {
            this.props['borderradius'] = '0%';
        } else {
            this.props['borderradius'] = '50%';
        }

        this.props['textalign'] = 'center';
        this.props['border'] = border;
        this.props['background'] = background;
        if (this.avatarData.fixedColor && !background) {
            this.props['background'] = background || this.colorize(letter);
        } else {
            this.props['background'] = background || this.getRandomColor();
        }
        return true;
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    colorize(str) {
        for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
        var color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
        return '#' + Array(6 - color.length + 1).join('0') + color;
    }

    ngOnInit() {
        this.generateLetter();
    }

    ngOnChanges(...args:any[]) {
        this.generateLetter();
    }
}
```

##### 2. SharedModule

If you use a [`SharedModule`](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-modules) that you import in multiple other feature modules,
you can export the `TranslateModule` to make sure you don't have to import it in every module.

```ts
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

export class SharedModule { }
```

> Note: Never call a `forRoot` static method in the `SharedModule`. You might end up with different instances of the service in your injector tree. But you can use `forChild` if necessary.

##### 3. Usage

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AppComponent } from './app.component';
import { BsDropdownModule, TabsModule, BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';

// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { LayoutComponent } from './layouts/layout.component';
import { SingleLayoutComponent } from './layouts/single-layout.component';

// Shared Component
import {SharedModule} from './commons/module.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    declarations: [

    ],
    entryComponents: [
        
    ],
    providers: [
        
    ],

    bootstrap: [AppComponent]
})
export class AppModule {}

```

#### 4. Use HTML tags:

To render them, simply use the `innerHTML` attribute with the pipe on any element.

```html
<avatar style="display: inline-block;" [avatarData]="avatarCircle" [nameData]="Luan Nguyen"></avatar>
```
