import { NgModule } from '@angular/core';

import { entityConfig } from './entity-metadata';
import {EntityDataModule} from '@ngrx/data';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    EntityDataModule.forRoot(entityConfig)
  ],
})
export class DataStoreModule { }
