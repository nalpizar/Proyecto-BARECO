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
        this.obj = [{ name: 'C' }];
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
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = '';
        });
    };
    TasksComponent.prototype.onClick = function (event) {
        var _this = this;
        console.log(event);
        console.log(event.srcElement.attributes.value);
        var valueAttr = event.srcElement.attributes.value;
        var value = valueAttr.nodeValue;
        console.log(value);
        var newTask = {
            title: value,
            isDone: false
        };
        this.taskService.addTask(newTask)
            .subscribe(function (task) {
            _this.tasks.push(task);
            _this.title = '';
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
        var _task = {
            _id: task._id,
            title: task.title,
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

// Chronometer
$(function(){
  var $startTime = $('#startTime');
  var $relative = $('#relative');
  var $stopTime = $('#stopTime');
  var $start = $('#start');
  var $pause = $('#pause');
  var $stop = $('#stop');
  var $step = $('#step');
  var $steps = $('#steps');
  var timeFormat = 'MMMM Do YYYY, h:mm:ss a';

  var dateZero = new Date();
  dateZero.setHours(0);
  dateZero.setMinutes(0);
  dateZero.setSeconds(0);
  dateZero.setMilliseconds(0);
  dateZero = dateZero.getTime();

  // Create my chronometer instance
  var chronometer = new Chronometer();

  // When start, update the DOM startTime
  chronometer.addEventListener('started', function(){
    var humanTime = moment(this.startTime).format(timeFormat);
    $startTime.text(humanTime);
    $stopTime.text('');
    $relative.text('');
    if (!this.steps.length){
      $steps.empty();
    }
  });

  function updateButtons(){
    // Update buttons according to the chronometer state
    var state = this.state;
    $start.prop('disabled', state === Chronometer.prototype.RUNNING);
    $pause.prop('disabled', state !== Chronometer.prototype.RUNNING);
    $stop.prop('disabled', state === Chronometer.prototype.STOPPED);
    $step.prop('disabled', state !== Chronometer.prototype.RUNNING);
  }
  updateButtons.apply(chronometer);

  // When state change, update the buttons
  chronometer.addEventListener('state', updateButtons);

  // When stopped, update the DOM stopTime
  chronometer.addEventListener('stopped', function(){
    var humanTime = moment(this.stopTime).format(timeFormat);
    $stopTime.text(humanTime);
    $relative.text(moment(dateZero + this.elapsedTime).format('HH:mm:ss.SSS'));
  });

  // When update delegate to relative DOM element
  chronometer.addEventListener('updated', function (){
    $relative.text(moment(dateZero + this.elapsedTime).format('HH:mm:ss.SSS'));
  });

  // Show steps on the DOM
  chronometer.addEventListener('stepinserted', function (){
    var $currentStep = $('<li></li>');

    var elapsed = moment( dateZero + this.elapsedTime ).format('HH:mm:ss.SSS');
    var date = moment( this.steps[this.steps.length - 1].pauseTime ).format(timeFormat);
    $currentStep.text(elapsed + ' at ' + date);
    $steps.append($currentStep);
  });


  // Buttons actions
  $start.on('click', function(){
    chronometer.start();
  });
  $pause.on('click', function(){
    chronometer.pause();
  });
  $stop.on('click', function(){
    chronometer.stop();
  });
  $step.on('click', function(){
    chronometer.step();
  });
  window.chronometer = chronometer;
});
