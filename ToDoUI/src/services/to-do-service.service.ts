import { Injectable } from '@angular/core';
import { HttpModule, Http, RequestOptions, Headers } from '@angular/http';
import { ToDos } from '../models/ToDos';
import { Observable, Observer } from 'rxjs';
import { environment as envDev } from '../environments/environment';
import { environment as envProd } from '../environments/environment.prod';

@Injectable()
export class ToDoServiceService {

  todo;
  env;
  public observable: Observable<ToDos>;
  private observer: Observer<ToDos>;

  constructor(private http: Http) {
    this.todo = new ToDos();
    this.observable = new Observable((observer) => {
      this.observer = observer;
    });
    this.observable.share();
    this.env = envProd.contextPath;
    if (envDev.production) {
      this.env = envDev.contextPath;
    }
  }

  private getOptions(): RequestOptions {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const options = new RequestOptions({
      headers: headers
    });
    return options;
  }

  public getToDosByUserName(userName): Observable<ToDos> {
    return new Observable(observer => {
      this.http.get(this.env + 'getToDos/' + userName, this.getOptions())
        .subscribe((response) => {
          this.todo = JSON.parse(response['_body']);
          console.log(this.todo);
          this.observer.next(JSON.parse(JSON.stringify(this.todo)));
        });
    });
  }
  public addTask(taskName) {
    if (taskName && taskName.trim() !== '') {
      if (!this.todo.tasks) {
        this.todo.tasks = [];
      }
      this.todo.tasks.push({ value: taskName, status: 'PENDING' });
      this.observer.next(JSON.parse(JSON.stringify(this.todo)));
      this.updateToDo(this.callBackForAddTask);

    }
  }

  private callBackForTaskComplete(response, context) {
    console.log(context.todo);
  }

  private callBackForAddTask(response, context) {
    console.log(context.todo);
  }

  private updateToDo(callBackFunction) {
    this.http.put(this.env + 'updateToDos/', this.todo, this.getOptions())
      .subscribe((response) => {
        callBackFunction(response, this);
      });
  }

  public setTaskCompleted(taskNm) {
    this.todo.tasks.forEach(element => {
      if (element.value === taskNm) {
        element.status = 'COMPLETED';
      }
    });
    this.observer.next(JSON.parse(JSON.stringify(this.todo)));
    this.updateToDo(this.callBackForTaskComplete);
  }

  public deleteTask(task) {
    this.todo.tasks.forEach((task1) => {
      if (task.value === task1.value && task1.status === 'PENDING') {
        this.todo.tasks.splice(this.todo.tasks.indexOf(task1), 1);
        this.observer.next(JSON.parse(JSON.stringify(this.todo)));
        this.updateToDo(this.callBackForTaskComplete);
      }
    });
  }
}
