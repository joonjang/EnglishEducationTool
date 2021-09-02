import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpeechEntryComponent } from './speech-entry/speech-entry.component';
import { HomeComponent } from './home/home.component';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'speech-entry',
    component: SpeechEntryComponent,
    canActivate: [AuthorizeGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
