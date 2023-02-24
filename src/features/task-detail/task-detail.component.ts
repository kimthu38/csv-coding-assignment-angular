import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, shareReplay } from "rxjs/operators";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {

  task = this.route.params.pipe(
    map((param) => param["id"]),
    switchMap((id) => this.taskService.task(id))
  );

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
  }

  findUserById(id) {
    return this.userService.findUserById(id)?.name || "";
  }
}
