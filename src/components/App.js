import React, { useState } from "react";

function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Number of days in the selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  // Change month from dropdown
  const handleMonthChange = (e) => {
    setMonth(Number(e.target.value));
  };

  // Change year from dropdown
  const handleYearChange = (e) => {
    setYear(Number(e.target.value));
  };

  // Previous month
  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prevYear) => prevYear - 1);
    } else {
      setMonth((prevMonth) => prevMonth - 1);
    }
  };

  // Next month
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  };

  // Previous year
  const previousYear = () => {
    setYear((prevYear) => prevYear - 1);
  };

  // Next year
  const nextYear = () => {
    setYear((prevYear) => prevYear + 1);
  };

  return (
    <div>
      <h1>Calendar</h1>

      <div>
        <button onClick={previousYear}>Previous Year</button>

        <select value={month} onChange={handleMonthChange}>
          {months.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>

        <select value={year} onChange={handleYearChange}>
          {Array.from({ length: 21 }, (_, i) => year - 10 + i).map(
            (y) => (
              <option key={y} value={y}>
                {y}
              </option>
            )
          )}
        </select>

        <button onClick={nextYear}>Next Year</button>
      </div>

      <div>
        <button onClick={previousMonth}>Previous Month</button>
        <button onClick={nextMonth}>Next Month</button>
      </div>

      <h2>
        {months[month]} {year}
      </h2>

      <table border="1">
        <thead>
          <tr>
            <th>Day</th>
          </tr>
        </thead>

        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td>{day}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;