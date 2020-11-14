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
