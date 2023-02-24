import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDetailRoutingModule } from './task-detail-routing.module';
import { TaskDetailComponent } from './task-detail.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { TaskService } from '@/services/task.service';
import { UserService } from '@/services/user.service';


@NgModule({
  declarations: [
    TaskDetailComponent
  ],
  imports: [
    CommonModule,
    TaskDetailRoutingModule,
    NzDescriptionsModule
  ]
})
export class TaskDetailModule { }
