import { Task } from "@/types/task";
import { Injectable } from "@angular/core";
import {
  Observable,
  of,
  throwError,
  BehaviorSubject,
  Subscription,
} from "rxjs";
import { delay, tap } from "rxjs/operators";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

function randomDelay() {
  return Math.random() * 1000;
}

const initialTasks = [
  {
    id: 0,
    description: "Install a monitor arm",
    assigneeId: 111,
    completed: false,
  },
  {
    id: 1,
    description: "Move the desk to the new location",
    assigneeId: 111,
    completed: false,
  },
];

@Injectable()
export class TaskService {
  // storedTasks: Task[] = [
  //   {
  //     id: 0,
  //     description: "Install a monitor arm",
  //     assigneeId: 111,
  //     completed: false,
  //   },
  //   {
  //     id: 1,
  //     description: "Move the desk to the new location",
  //     assigneeId: 111,
  //     completed: false,
  //   },
  // ];

  storedTasksSubject = new BehaviorSubject<Task[]>(initialTasks);
  storedTasks: Task[] = [];

  lastId = 1;

  subscribe: Subscription;

  constructor() {
    this.subscribe = this.storedTasksSubject
      .asObservable()
      .subscribe((data) => {
        this.storedTasks = data;
      });
  }

  private findTaskById = (id) =>
    this.storedTasks.find((task) => task.id === +id);

  tasks() {
    return this.storedTasksSubject.asObservable().pipe(delay(randomDelay()));
  }

  task(id: number): Observable<Task> {
    return of(this.findTaskById(id)).pipe(delay(randomDelay()));
  }

  newTask(payload: { description: string }) {
    const newTask: Task = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
    };

    this.storedTasksSubject.next(this.storedTasks.concat(newTask));

    return of(newTask).pipe(delay(randomDelay()));
  }

  assign(taskId: number, userId: number) {
    return this.update(taskId, { assigneeId: userId });
  }

  complete(taskId: number, completed: boolean) {
    return this.update(taskId, { completed });
  }

  update(taskId: number, updates: Partial<Omit<Task, "id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    const _tasks = this.storedTasks.map((t) =>
      t.id === taskId ? updatedTask : t
    );

    this.storedTasksSubject.next(_tasks);

    return of(updatedTask).pipe(delay(randomDelay()));
  }

  unsubscribe() {
    this.subscribe && this.subscribe.unsubscribe();
  }
}
