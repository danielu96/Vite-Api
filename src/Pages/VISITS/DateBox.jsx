
import React from 'react';
import dayjs from 'dayjs';

// const formatDate = (date) => {
//   return dayjs(date).format('DD.MM.YYYY');
// };

const isToday = (day) => {
  // Create a Dayjs object for the current date
  const today = dayjs();
  // Compare the day object with the current date by year, month, and day
  return today.isSame(day, 'date');
};

const DateBox = ({ date, isSunday,monthYear }) => {
  const isTodayOfDate = isToday(dayjs(`${monthYear.year}-${monthYear.month}-${date}`)); // Use full date object

  return (
    <div
      className={
        isTodayOfDate
          ? 'shadow-lg hover:shadow-md bg-accent' // Current day style
          : isSunday ? 'shadow-lg hover:shadow-md bg-red-500' // Sunday style
            : 'bg-gray-100 shadow-lg hover:shadow-sm hover:bg-white' // Default
      }
    >
      <div className="text-center pt-4 pb-4 grid">
        {date}
        {/* {isToday ? <span>We have : {dayjs().format('DD.MM.YYYY')}</span> : <span>fuck we have nothing</span>} */}
        {isTodayOfDate && <span>we have : {dayjs().format('DD.MM.YYYY')}</span>}
      </div>
    </div>
  );
};

export default DateBox;





