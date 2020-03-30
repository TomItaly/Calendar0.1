import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEventModalPage } from './add-event-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddEventModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AddEventModalPageRoutingModule {}
