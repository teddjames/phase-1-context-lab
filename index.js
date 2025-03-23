// 1. Create an employee record from an Array
function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// 2. Create employee records from an Array of Arrays
function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

// 3. Add a TimeIn event to an employee record
// This function is meant to be invoked with an employee record as its context.
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
}

// 4. Add a TimeOut event to an employee record
// This function is meant to be invoked with an employee record as its context.
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date,
  });
  return this;
}

// 5. Calculate the hours worked on a given date
// Invoked with the employee record as context.
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((event) => event.date === date);
  const timeOut = this.timeOutEvents.find((event) => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// 6. Calculate wages earned on a given date
// Invoked with the employee record as context.
function wagesEarnedOnDate(date) {
  const hours = hoursWorkedOnDate.call(this, date);
  return hours * this.payPerHour;
}

// 7. Calculate all wages for an employee
// This version is provided and uses "this" to refer to the employee record.
const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });
  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  );
  return payable;
};

// 8. Find an employee by first name from a collection of employee records
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((record) => record.firstName === firstName);
}

// 9. Calculate payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce(
    (total, employee) => total + allWagesFor.call(employee),
    0
  );
}
