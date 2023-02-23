import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";
import { Task } from "@/types/task";
import { Component, OnInit } from "@angular/core";
import { shareReplay } from "rxjs/operators";

@Component({
  selector: "app-task-management",
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.scss"],
})
export class TaskManagementComponent implements OnInit {
  tasks = this.taskService.tasks().pipe(shareReplay());
  users = this.userService.users();
  isVisibleAssignModal = false;
  isVisibleAddModal = false;
  selectedUser = null;
  currentTask: Task = { id: null };

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  findUserById(id) {
    return this.userService.findUserById(id)?.name || "";
  }

  onComplete(task: Task) {
    this.taskService
      .complete(task.id, !task.completed)
      .subscribe((response) => {
        alert("completed sucessfully");
      });
  }

  openAssignModal(task: Task) {
    this.currentTask = task;
    this.isVisibleAssignModal = true;
  }

  onAssign(id: number, assigneeId: number) {
    this.taskService.assign(id, assigneeId).subscribe((response) => {
      alert("Assign sucessfully");
    });
  }

  handleAssignOk(): void {
    this.onAssign(this.currentTask.id, this.selectedUser);
    this.isVisibleAssignModal = false;
  }

  toggleAssignModal(): void {
    this.isVisibleAssignModal = !this.isVisibleAssignModal;
  }

  toggleAddModal(): void {
    this.isVisibleAddModal = !this.isVisibleAddModal;
  }

}
