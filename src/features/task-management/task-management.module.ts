import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskManagementRoutingModule } from './task-management-routing.module';
import { TaskManagementComponent } from './task-management.component';
import { TaskService } from '@/services/task.service';
import { UserService } from '@/services/user.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { NzMessageModule } from 'ng-zorro-antd/message';



@NgModule({
  declarations: [
    TaskManagementComponent,
    AddTaskModalComponent,
    TaskFilterComponent
  ],
  imports: [
    CommonModule,
    TaskManagementRoutingModule,
    NzButtonModule,
    NzTableModule,
    NzSpaceModule,
    NzModalModule,
    NzSelectModule,
    FormsModule, ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzMessageModule

  ]
})
export class TaskManagementModule { }
