"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var task_service_1 = require('../../services/task.service');
var TasksComponent = (function () {
    function TasksComponent(taskService) {
        var _this = this;
        this.taskService = taskService;
        this.obj = [{ name: 'Hello 1' }];
        this.taskService.getTasks()
            .subscribe(function (tasks) {
            _this.tasks = tasks;
        });
    }
    TasksComponent.prototype.increment = function (item) {
        item.count++;
    };
    TasksComponent.prototype.addTask = function (event) {
        var _this = this;
        event.preventDefault();
        var newTask = {
            title: this.title,
            type: this.type,
            date: this.date,
            timer: this.timer,
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = '';
            _this.type = '';
            _this.date = '';
            _this.timer = '';
        });
    };
    TasksComponent.prototype.onClick = function (event) {
        var _this = this;
        console.log(event);
        console.log(event.srcElement.attributes.value);
        var valueAttr = event.srcElement.attributes.value;
        var value = valueAttr.nodeValue;
        var nameAttr = event.srcElement.attributes.name;
        var name = nameAttr.nodeValue;
        console.log(value);
        var newTask = {
            title: value,
            type: name,
            date: '',
            timer: '',
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = '';
            _this.type = '';
            _this.date = '';
            _this.timer = '';
        });
    };
    TasksComponent.prototype.deleteTask = function (id) {
        var tasks = this.tasks;
        this.taskService.deleteTask(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i]._id == id) {
                        tasks.splice(i, 1);
                    }
                }
            }
        });
    };
    TasksComponent.prototype.updateStatus = function (task) {
        var _this = this;
         
        var _task = {
            _id: task._id,
            title: task.title,
            type: task.type,
            date: task.date,
            timer: task.timer,
            isDone: !task.isDone
        };
        this.taskService.updateStatus(_task).subscribe(function (data) {
            task.isDone = !task.isDone;
        });
    };
    TasksComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tasks',
            templateUrl: 'tasks.component.html'
        }), 
        __metadata('design:paramtypes', [task_service_1.TaskService])
    ], TasksComponent);
    return TasksComponent;
}());
exports.TasksComponent = TasksComponent;
//# sourceMappingURL=tasks.component.js.map



