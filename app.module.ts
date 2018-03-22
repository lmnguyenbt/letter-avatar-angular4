import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastModule } from 'ng2-toastr';
import { ToastrModule } from 'toastr-ng2';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AppComponent } from './app.component';
import { BsDropdownModule, TabsModule, BsDatepickerModule, TooltipModule } from 'ngx-bootstrap';

import { ROW_DROPDOWN_DIRECTIVES } from './shared/directives/row-dropdown.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagInputModule } from 'ngx-chips';
import { LoadingModule } from 'ngx-loading';
import { NgxGalleryModule } from 'ngx-gallery';
// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { LayoutComponent } from './layouts/layout.component';
import { SingleLayoutComponent } from './layouts/single-layout.component';

// Common
import { LoaderService } from './commons/loader.service';
import {SharedModule} from './commons/module.service';
import { GoogleAnalyticsEventsService } from "./commons/google-analytics-events.service";

// Shared Component
import { HeaderComponent } from './shared/header/header.component';
import { SideBarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ConfirmModalComponent } from './shared/modals/_confirm/comfirm-modal.component';

//Services
import { ApiService } from './commons/api.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { JwtService } from './authenticate/jwt.service';
import { SocketIOService } from './commons/socket.io.service';

// Guard Login
import { AuthGuard } from './authenticate/auth.guard';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate: true
        }),
        AppRoutingModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule.forRoot(),
	    ToastrModule.forRoot(),
        MomentModule,
        NgIdleKeepaliveModule.forRoot(),
        BsDatepickerModule.forRoot(),
        NgxPaginationModule,
        NgxGalleryModule,
        LoadingModule,
        TagInputModule,
        TooltipModule.forRoot(),
        BootstrapModalModule.forRoot({ container: document.body }),
        SharedModule
    ],
    declarations: [
        AppComponent,
        LayoutComponent,
        SingleLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        ROW_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        HeaderComponent,
        SideBarComponent,
        BreadcrumbComponent,
        FooterComponent,
        ConfirmModalComponent
    ],
    entryComponents: [
        ConfirmModalComponent
    ],
    providers: [
        AuthGuard,
        ApiService,
        SocketIOService,
        GoogleAnalyticsEventsService,
        JwtService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        LoaderService
    ],

    bootstrap: [AppComponent]
})
export class AppModule {}
