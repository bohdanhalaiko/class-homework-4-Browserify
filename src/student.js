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

