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
