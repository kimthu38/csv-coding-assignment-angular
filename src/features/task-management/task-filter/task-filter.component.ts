import { TaskService } from "@/services/task.service";
import { UserService } from "@/services/user.service";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-task-filter",
  templateUrl: "./task-filter.component.html",
  styleUrls: ["./task-filter.component.scss"],
})
export class TaskFilterComponent implements OnInit {
  validateForm!: FormGroup;
  @Output() onFilter = new EventEmitter<Partial<Task>>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private userService: UserService
  ) {}
  users = this.userService.users();

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      description: [null],
      assigneeId: [-1],
      completed: [-1],
    });
  }

  submitForm(): void {
    this.onFilter.emit(this.validateForm.value);
  }
  clearSearch() {
    this.validateForm.reset({
      assigneeId: -1,
      completed: -1,
    });
    
    this.submitForm();
  }
}
