
import dayjs from 'dayjs';

// for storing current month / year details
class MonthYear {
  constructor(startDate, firstDOW, lastDate, monthName, month, year, days,day) {
    this.startDate = startDate;
    this.firstDOW = firstDOW;
    this.lastDate = lastDate;
    this.monthName = monthName;
    this.month = month;
    this.year = year;
    this.days = days;
    this.day = day;
  }
}

// for incrementing MonthYear
function getUpdatedMonthYear(monthYear, monthIncrement) {
  // clone is necessary to prevent mutation
  return monthYear.startDate.clone().add(monthIncrement, 'months');
}


function getMonthYearDetails(initialDate) {
  const month = initialDate.format('MM');
  const year = initialDate.format('YYYY');
  const startDate = dayjs(`${year}${month}01`);
  const firstDOW = startDate.day();
  const lastDate = startDate.clone().endOf('month').date();
  const monthName = startDate.format('MMMM');

  const days = [];
  for (let i = 1; i <= lastDate; i++) {
    const day = startDate.clone().add(i - 1, 'days'); // Create Dayjs object for each day
    days.push({
      date: day.date(), // Day of the month
      // isCurrent: day.isSame(dayjs(), 'day'), // Check if current day
      // ... other day properties
    });
  }

  return new MonthYear(startDate, firstDOW, lastDate, monthName, month, year, days);
}




function getNewMonthYear(prevData, monthIncrement) {
  // update the monthYear by the specified increment
  const newMonthYear = getUpdatedMonthYear(prevData, monthIncrement);

  // return object with the details for the new monthYear
  return getMonthYearDetails(newMonthYear);
}

export { MonthYear, getUpdatedMonthYear, getMonthYearDetails, getNewMonthYear }; // Export functions