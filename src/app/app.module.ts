import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavDrawerComponent } from './UI-components/nav-drawer/nav-drawer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './core/http-interceptors';
import { SharedModule } from './shared/shared.module';
import { AppBarComponent } from './UI-components/app-bar/app-bar.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FooterComponent } from './UI-components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavDrawerComponent,
    AppBarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
  // adding class so that dark theme can affect overlay components
  constructor(overlayContainer: OverlayContainer) {
      overlayContainer.getContainerElement().classList.add('app-dark-theme');
  }
}
