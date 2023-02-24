import { TaskService } from "@/services/task.service";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-add-task-modal",
  templateUrl: "./add-task-modal.component.html",
  styleUrls: ["./add-task-modal.component.scss"],
})
export class AddTaskModalComponent implements OnInit {
  @Input() isVisibleAddModal: boolean = false;
  @Output() toggleAddModal = new EventEmitter();
  @Output() onAdd = new EventEmitter();
  validateForm!: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      description: [null, [Validators.required]],
    });
  }

  closeModal(): void {
    this.validateForm.reset();
    this.toggleAddModal.emit();
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.onAdd.emit(this.validateForm.value);
      this.closeModal()

    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
