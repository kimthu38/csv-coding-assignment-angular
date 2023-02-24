import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";
import { Task } from "@/types/task";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { shareReplay, finalize } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { indicate } from "@/services/utilities.service";

@Component({
  selector: "app-task-management",
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.scss"],
})
export class TaskManagementComponent implements OnInit {
  users = this.userService.users();
  isVisibleAssignModal = false;
  isVisibleAddModal = false;
  selectedUser = null;
  currentTask: Task = { id: null };
  loading = new BehaviorSubject<boolean>(false);
  tasks = this.taskService.tasks();

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {}

  findUserById(id) {
    return this.userService.findUserById(id)?.name || "";
  }

  onComplete(task: Task) {
    this.taskService
      .complete(task.id, !task.completed)
      .subscribe((response) => {
        this.message.success("The task has been completed");
      });
  }

  openAssignModal(task: Task) {
    this.currentTask = task;
    this.isVisibleAssignModal = true;
  }

  onAssign(id: number, assigneeId: number) {
    this.taskService.assign(id, assigneeId).subscribe((response) => {
      this.message.success("The task has been assigned sucessfully");
    });
  }

  handleAssignOk(): void {
    this.onAssign(this.currentTask.id, this.selectedUser);
    this.isVisibleAssignModal = false;
    this.selectedUser = null
  }

  toggleAssignModal(): void {
    this.isVisibleAssignModal = !this.isVisibleAssignModal;
    this.selectedUser = null
  }

  toggleAddModal(): void {
    this.isVisibleAddModal = !this.isVisibleAddModal;
  }

  handleFilter(value) {
    this.tasks = this.taskService.filter({
      ...value,
      assigneeId: value.assigneeId === -1 ? undefined : value.assigneeId,
      completed: value.completed === -1 ? undefined : value.completed,
    }).pipe(
      finalize(()=>{
        console.log('122');
        
      })
    );
  }

  viewDetail(task: Task) {
    this.router.navigate(["/task/" + task.id]);
  }
}
