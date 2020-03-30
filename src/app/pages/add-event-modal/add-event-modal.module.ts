import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEventModalPageRoutingModule } from './add-event-modal-routing.module';

import { AddEventModalPage } from './add-event-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEventModalPageRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AddEventModalPage]
})
export class AddEventModalPageModule {}
