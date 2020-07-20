import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SingleTextSubmitComponent } from './forms/single-text-submit/single-text-submit.component';
import { DrawDashboardComponent } from './draw/draw-dashboard/draw-dashboard.component';
import { DrawCanvasComponent } from './draw/draw-canvas/draw-canvas.component';
import { DrawCanvasEventComponent } from './draw/draw-canvas-event/draw-canvas-event.component';
import { DrawGridComponent } from './draw/draw-grid/draw-grid.component';
import { DrawingUpdaterComponent } from './draw/draw-grid/drawing-updater/drawing-updater.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SingleTextSubmitComponent,
    DrawDashboardComponent,
    DrawCanvasComponent,
    DrawCanvasEventComponent,
    DrawGridComponent,
    DrawingUpdaterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [DrawingUpdaterComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
