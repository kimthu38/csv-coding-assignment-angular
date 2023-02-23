import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { TaskManagementComponent } from './task-management.component';
import { TaskService } from '@/services/task.service';
import { UserService } from '@/services/user.service';



@NgModule({
  declarations: [
    TaskManagementComponent
  ],
  providers: [TaskService, UserService],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
  ]
})
export class TaskManagementModule { }
