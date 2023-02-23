import { User } from "@/app/backend.service";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class UserService {
  storedUsers: User[] = [
    { id: 111, name: "Mike" },
    { id: 222, name: "James" },
  ];

  lastId = 1;

  findUserById = (id) =>
    this.storedUsers.find((user) => user.id === +id);

  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }
}
