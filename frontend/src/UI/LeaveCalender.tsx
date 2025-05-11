import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/css/calender.css"

interface LeaveCalendarProps {
  leaveData: { [date: string]: number };
}

export const LeaveCalendar: React.FC<LeaveCalendarProps> = ({ leaveData }) => {
  const renderDayContents = (day: number, date: Date) => {
    const dateString = date.toLocaleDateString('en-CA');
    const leaveCount = leaveData[dateString] || 0;

    return (
      <div >
        {day}
        {leaveCount > 0 && (
          <div className="leave-count"
          >
            {leaveCount}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-wrapper">
      <div className="calender-label"></div>
      <DatePicker
        inline
        renderDayContents={renderDayContents}
        calendarClassName="custom-calendar"
      />
    </div>
  );

};

