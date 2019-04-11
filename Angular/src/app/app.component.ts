import { Component } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.component.reset.css']
})
export class AppComponent {
  title = 'ToDoList';
}
window.onload = function() {
    class Tasks {
      current: any = [{
        taskId: doId(),
        taskContent: 'Task 1',
        taskState: 'current',
      }, {
        taskId: doId(),
        taskContent: 'Task 2',
        taskState: 'current',
      }];
      done: any = [{
        taskId: doId(),
        taskContent: 'Task 3',
        taskState: 'done',
      }];

      get allTasks(): number {
        return this.current.length + this.done.length;
      };

      get doneTasks(): number {
        return this.done.length;
      };
    }

    let tasks = new Tasks();
    const tasksList: any = document.querySelector('.task__list');
    const allTasks: any = document.querySelector('.all__tasks');
    const doneTasks: any = document.querySelector('.done__tasks');
    const addNewTaskField: any = document.querySelector('.task__new');

    function INIT(): void {
      for (const item of tasks.current) {
        createItem(item);
      }
      for (const item of tasks.done) {
        createItem(item);
      }
      allTasks.innerHTML = tasks.allTasks;
      doneTasks.innerHTML = tasks.doneTasks;
    }

    function createItem(el: any): void {
      const item = document.createElement('li');
      const remove = document.createElement('div');
      const text = document.createElement('span');
      remove.classList.add('task__list-remove');
      remove.addEventListener('click', function () {
        removeTask(this);
      });
      text.classList.add('task__list-text');
      text.addEventListener('click', function () {
        doneTask(this);
      });
      switch (el.taskState) {
        case 'done':
          item.classList.add('task__list-item', 'task__list-item--done');
          break;
        default:
          item.classList.add('task__list-item');
      }
      item.id = el.taskId;
      text.innerHTML = el.taskContent;
      item.appendChild(text);
      item.appendChild(remove);
      tasksList.appendChild(item);
    }

    function doneTask(el: any): void {
      const elem: any = el.parentNode;
      const elemId: number = elem.id;
      const elemState: string = elem.classList.contains('task__list-item--done');

      const [itemsRemove, itemsAdd]: Array<any> = elemState ? [tasks.done, tasks.current] : [tasks.current, tasks.done];
      elem.classList.toggle('task__list-item--done');
      for (const [index, item] of itemsRemove.entries()) {
        if (item.taskId !== elemId) continue;
        itemsAdd.push(item);
        itemsRemove.splice(index, 1);
      }
      doneTasks.innerHTML = tasks.doneTasks;
    }

    function removeTask(el: any): void {
      const removeEl: any = el.parentNode;
      const removeElId: number = removeEl.id;
      const removeElState: string = removeEl.classList.contains('task__list-item--done');

      removeEl.remove();
      const items: any = removeElState ? tasks.done : tasks.current;
      for (const [index, item] of items.entries()) {
        if (item.taskId !== removeElId) continue;
        items.splice(index, 1);
      }
      allTasks.innerHTML = tasks.allTasks;
      doneTasks.innerHTML = tasks.doneTasks;
    }

    function addTasks(str: object): void {
      const elem: object = {
        taskId: doId(),
        taskContent: str,
        taskState: 'current',
      };
      tasks.current.push(elem);
      createItem(elem);
      allTasks.innerHTML = tasks.allTasks;
    }

    function doId(): string {
      return Math.random().toString(36).slice(2);
    }

    INIT();

    addNewTaskField.addEventListener('keyup', function (e: KeyboardEvent): void {
        if (e.keyCode === 13) {
          addTasks(this.value);
          this.value = '';
        }
      }
    );
  }
