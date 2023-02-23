import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";
import { Task } from "@/types/task";
import { Component, OnInit } from "@angular/core";
import { shareReplay } from 'rxjs/operators';


@Component({
  selector: "app-task-management",
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.scss"],
})
export class TaskManagementComponent implements OnInit {
  tasks = this.taskService.tasks().pipe(shareReplay());
  users = this.userService.users();

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  findUserById(id){
    return this.userService.findUserById(id)?.name || ''
  }
  onAssign(task: Task){
    this.taskService.assign(task.id, task.assigneeId).subscribe(response => {
      alert('Assign sucessfully')
    })
  }
  onComplete(task: Task){
    this.taskService.complete(task.id, !task.completed).subscribe(response => {
      alert('completed sucessfully');
    })
  }
  
}
