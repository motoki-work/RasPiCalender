// app/routes/calendar.tsx
import { useEffect, useState } from "react";

export default function Calender() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [holidays, setHolidays] = useState<Set<number>>(new Set()); // 休日の日付を格納するセット

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = 日曜
    const weeks: JSX.Element[] = [];
    let days: JSX.Element[] = [];

    // 最初に空白セルを入れる
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<td key={`empty-${i}`} className="w-9 h-9" />);
    }

    // 日付を入れる
    for (let day = 1; day <= daysInMonth; day++) {
      const totalIndex = firstDayOfWeek + day - 1; // 何番目かを計算
      const dayOfWeek = totalIndex % 7; // 0:日曜, 6:土曜

      const isToday =
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
      const underlineClass = isToday ? "underline font-bold" : "";

      let textColor = "text-black"; // 平日デフォルト
      if (dayOfWeek === 0) textColor = "text-[#FF0000]";       // 日曜
      else if (dayOfWeek === 6) textColor = "text-[#0000FF]"; // 土曜
      if (holidays.has(day)) textColor = "text-[#FF0000]";     // 休日なら赤

      days.push(
        <td
          key={day}
          className={`w-9 h-9 items-center justify-center text-right text-2xl ${textColor} ${underlineClass} font-plemo`}
        >
          {day}
        </td>
      );

      // 1週間ごとに<tr>を追加
      if (dayOfWeek === 6 || day === daysInMonth) {
        weeks.push(
          <tr key={`week-${day}`}>
            {days}
          </tr>
        );
        days = []; // 次の週に備えてリセット
      }
    }

    return weeks;
  };

  // 休日データの取得
  useEffect(() => {
    const fetchHolidays = async () => {
      const url = `https://holidays-jp.github.io/api/v1/${currentYear}/date.json`; // 正しいAPIのURL
      const res = await fetch(url);
      const holidaysData = await res.json();

      // 今月の休日日付をセット
      const currentMonthHolidays = Object.keys(holidaysData)
        .filter((date) => {
          const holidayDate = new Date(date);
          return holidayDate.getMonth() === currentMonth; // 今月の休日のみフィルター
        })
        .map((date) => new Date(date).getDate()); // 日付部分のみ取得

      setHolidays(new Set(currentMonthHolidays)); // 休日の日付をセット
    };

    fetchHolidays();
  }, [currentMonth, currentYear]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
  
      {/* 月の表示をカレンダーの上中央に */}
      <h2 className="text-2xl font-bold font-corporate">
        {currentYear}年 {currentMonth + 1}月
      </h2>
  
      {/* カレンダー表 */}
      <table className="table-auto mx-auto mb-4 border-collapse">
        <thead>
          <tr>
            {["日", "月", "火", "水", "木", "金", "土"].map((day, index) => {
              let textColor = "text-black";
              if (index === 0) textColor = "text-[#FF0000]";       // 日曜
              else if (index === 6) textColor = "text-[#0000FF]";  // 土曜
              return (
                <th
                  key={day}
                  className={`w-9 h-9 text-right font-bold text-xl ${textColor} font-corporate`}
                >
                  {day}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
    </div>
  );
  
}
