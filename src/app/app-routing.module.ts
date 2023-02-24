import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () =>
      import('@/features/task-management/task-management.module').then(
        (m) => m.TaskManagementModule
      ),
  },
  {
    path: 'task/:id',
    loadChildren: () =>
      import('@/features/task-detail/task-detail.module').then(
        (m) => m.TaskDetailModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: '/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
