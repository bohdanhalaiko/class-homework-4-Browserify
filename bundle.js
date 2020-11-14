(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
window.students = [];
window.workersWithOutJob = [];

const Student = require('./src/student.js')
const Worker = require('./src/worker.js');
const Company = require('./src/company.js');

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(el => {
      students.push(new Student(
        el.firstName,
        el.lastName,
        el.university,
        +el.scoreAverage
      ));
    });
  });

document.querySelector('.button').addEventListener('click', () => {
  window.company01 = new Company('Програмування');
  window.company02 = new Company('Тестування');
  console.log(company01);
  console.log(company02);

  company01.hireNumStudentsCompany(5, 'Фронтенд');
  company02.hireNumStudentsCompany(5, 'Бекенд');
  console.log(company01);
  console.log(company02);

  company01.fire('Стефа', 'Артимець');
  company01.fire('Надія', 'Остапець');
  company02.hireWorker('Фронтенд');

  company01.close();

  console.log(students);
  console.log(workersWithOutJob);

  console.log(company01);
  console.log(company02);

  console.log(workersWithOutJob);

  workersWithOutJob.forEach((worker) => {
    worker.getWorkingInfo();
  });
  company02.workers.forEach((worker) => {
    worker.getWorkingInfo();
  });
});

},{"./src/company.js":2,"./src/student.js":3,"./src/worker.js":4}],2:[function(require,module,exports){
const Worker = require('./worker.js');

const Company = function (activity) {
  this.activity = activity;
  this.workers = [];
  this.numWorkers = 0;
};

Company.prototype.setSalaryForWorker = function (
  firstName,
  lastName,
  salarySet
) {
  const workerIndex = this.workers.findIndex(
    (el) => el.firstName === firstName && el.lastName === lastName
  );
  if (workerIndex + 1) {
    const coef = +this.workers[workerIndex].university.slice(-2) + this.workers[workerIndex].scoreAverage;
    this.workers[workerIndex].salary = salarySet * (1 + coef / 100);
  }
};

Company.prototype.hire = function (instanceStudent, profession) {
  const worker = new Worker(...Object.values(instanceStudent), profession);
  const job = {
    startTime: new Date(),
    profession: profession,
    company: this.activity,
  };
  worker.history.push(job);
  this.workers.push(worker);
  this.numWorkers = this.workers.length;
  worker.workingStatus = true;
  this.setSalaryForWorker(worker.firstName, worker.lastName, 10000);
};

Company.prototype.hireWorker = function (profession) {
  const worker = workersWithOutJob.pop();
  const job = {
    startTime: new Date(),
    profession: profession,
    company: this.activity,
  };
  worker.profession = profession;
  worker.history.push(job);
  this.workers.push(worker);
  this.numWorkers = this.workers.length;
  worker.workingStatus = true;
  this.setSalaryForWorker(worker.firstName, worker.lastName, 10000);
};

Company.prototype.fire = function (firstName, lastName) {
  const workerIndex = this.workers.findIndex(
    (el) => el.firstName === firstName && el.lastName === lastName
  );
  if (workerIndex + 1) {
    this.workers[workerIndex].history.slice(-1)[0].finishTime = new Date();
    this.workers[workerIndex].profession = 'непрацюючий(ча)';
    this.workers[workerIndex].salary = 0;
    this.workers[workerIndex].workingStatus = false;
    workersWithOutJob.push(this.workers[workerIndex]);
    this.workers.splice(workerIndex, 1);
    this.numWorkers = this.workers.length;
  }
};

Company.prototype.close = function () {
  this.workers.forEach((worker) => {
    worker.history.slice(-1)[0].finishTime = new Date();
    worker.profession = 'непрацюючий(ча)';
    worker.salary = 0;
    worker.workingStatus = false;
  });
  workersWithOutJob.push(...this.workers);
  this.workers = [];
  this.close = new Date();
  this.numWorkers = this.workers.length;
};

Company.prototype.hireNumStudentsCompany = function (num, profession) {
  students.sort((a, b) => b.scoreAverage - a.scoreAverage);
  students.splice(0, num).forEach((student) => {
    this.hire(student, profession);
  });
};

module.exports = Company;

},{"./worker.js":4}],3:[function(require,module,exports){
const Student = function (firstName, lastName, university, scoreAverage) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.university = university;
  this.scoreAverage = scoreAverage;
};

Student.prototype.getBaseInfo = function () {
  console.log(
    `${this.firstName} ${this.lastName} закінчив(ла) ${this.university}, середній бал: ${this.scoreAverage}`
  );
};

module.exports = Student;


},{}],4:[function(require,module,exports){
const Student = require('./student.js');

const Worker = function (
  firstName,
  lastName,
  university,
  scoreAverage,
  profession
) {
  Student.apply(this, arguments);
  this.profession = profession;
  this.salary = 0;
  this.history = [];
};

Worker.prototype = Object.create(Student.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.getWorkingInfo = function () {
  const history = this.history.map((job, i) => {
    const start = job.startTime.toLocaleDateString();
    const finish = job.finishTime
      ? job.finishTime.toLocaleDateString()
      : 'ще працює';
    return `${i + 1}: ${job.profession
      }, Початок: ${start}, Закінчення: ${finish}`;
  });
  console.log(`---------------------------------------`);
  console.log(`${this.firstName} ${this.lastName}`);
  console.log(`Професія: ${this.profession}`);
  console.log(`Історія праці:\n ${history.join('\n ')}`);
};

module.exports = Worker;

},{"./student.js":3}]},{},[1]);
