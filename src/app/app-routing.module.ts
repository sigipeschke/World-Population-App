import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './graph/graph.component';
import { MapComponent } from './map/map.component';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  { path: 'graph', component: GraphComponent },
  { path: 'world-map', component: MapComponent },
  { path: '', redirectTo: 'world-map', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
