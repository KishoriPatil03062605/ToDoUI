import { Pipe, PipeTransform } from '@angular/core';
import { Task } from "../models/Task";

@Pipe({
    name: 'StringPipe'
})
export class StringPipe implements PipeTransform {

    transform(tasks: Task[], filter: string) {
        let selectedTasks = [];
        if (tasks) {
            tasks.forEach((task) => {
                if (task.status === filter) {
                    selectedTasks.push(task);
                }
            });
        }

        return selectedTasks;
    }

}