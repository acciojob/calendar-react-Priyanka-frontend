
import React, { useState } from "react";
import "./../styles/App.css";

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

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function App() {
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2023);
  const [isEditingYear, setIsEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState("2023");

  // Get the days in the selected month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the starting day of the selected month
  const firstDay = new Date(year, month, 1).getDay();

  // Generate calendar cells
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Divide days into weeks
  const weeks = [];

  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Navigate to a specific month/year
  const navigateMonth = (newMonth, newYear) => {
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  // Previous year
  const previousYear = () => {
    setYear((prev) => prev - 1);
  };

  // Previous month
  const previousMonth = () => {
    navigateMonth(month - 1, year);
  };

  // Next month
  const nextMonth = () => {
    navigateMonth(month + 1, year);
  };

  // Next year
  const nextYear = () => {
    setYear((prev) => prev + 1);
  };

  // Double-click year to edit
  const handleYearDoubleClick = () => {
    setYearInput(String(year));
    setIsEditingYear(true);
  };

  // Save edited year
  const handleYearChange = (e) => {
    setYearInput(e.target.value);
  };

  const saveYear = () => {
    const newYear = Number(yearInput);

    if (
      yearInput.trim() !== "" &&
      Number.isInteger(newYear) &&
      newYear >= 1 &&
      newYear <= 9999
    ) {
      setYear(newYear);
    }

    setIsEditingYear(false);
  };

  const handleYearKeyDown = (e) => {
    if (e.key === "Enter") {
      saveYear();
    }

    if (e.key === "Escape") {
      setIsEditingYear(false);
    }
  };

  return (
    <div className="calendar-container">
      <h1>Calendar</h1>

      <div className="controls">
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
        >
          {months.map((monthName, index) => (
            <option key={monthName} value={index}>
              {monthName}
            </option>
          ))}
        </select>

        {isEditingYear ? (
          <input
            id="year-input"
            type="number"
            value={yearInput}
            onChange={handleYearChange}
            onBlur={saveYear}
            onKeyDown={handleYearKeyDown}
            autoFocus
          />
        ) : (
          <span
            id="year-display"
            onDoubleClick={handleYearDoubleClick}
          >
            {year}
          </span>
        )}
      </div>

      <hr />

      <table id="calendar-table">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => (
                <td key={dayIndex}>
                  {day !== null ? day : ""}
                </td>
              ))}

              {week.length < 7 &&
                Array.from({ length: 7 - week.length }).map(
                  (_, index) => <td key={`empty-${index}`}></td>
                )}
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      <div className="navigation">
        <button id="prev-year" onClick={previousYear}>
          &lt;&lt;
        </button>

        <button id="prev-month" onClick={previousMonth}>
          &lt;
        </button>

        <button id="next-month" onClick={nextMonth}>
          &gt;
        </button>

        <button id="next-year" onClick={nextYear}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}

export default App;