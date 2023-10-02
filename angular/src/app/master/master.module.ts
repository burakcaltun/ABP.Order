import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { MasterComponent } from './master.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    MasterComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    NgbDatepickerModule
  ]
})
export class MasterModule { }
