import React from "react";
import { useState, useEffect } from "react";
import {
  getYesterday,
  getToday,
  getFirstDayInMonth,
  getLastDayInMonth,
  getFirstDayInLastMonth,
  getLastDayInLastMonth,
  getFirstDayInYear,
  getLastDayInYear,
  getFirstDayInLastYear,
  getLastDayInLastYear,
} from "@/lib/DateLib";

const TimeSelector = ({ setTimeRange }) => {
  const [show, setShow] = useState(false);
  const [period, setPeriod] = useState(0);
  const [title, setTitle] = useState("First");

  useEffect(() => {
    getTitle(period, dayArr);
  }, [period]);

  const getTitle = (day, dayArr) => {
    dayArr.map((item) => {
      if (item.day === day) {
        setTitle(item.title);
        return;
      }
    });
  };

  const dayArr = [
    {
      day: 0,
      title: "Hari Ini",
      startDate: getToday(),
      endDate: getToday(),
      dayStr: getToday(),
    },
    {
      day: 1,
      title: "Hari Kemarin",
      startDate: getYesterday(),
      endDate: getYesterday(),
      dayStr: getYesterday(),
    },
    {
      day: 30,
      title: "Bulan Ini",
      startDate: getFirstDayInMonth(),
      endDate: getLastDayInMonth(),
      dayStr: getFirstDayInMonth() + " To " + getLastDayInMonth(),
    },
    {
      day: 60,
      title: "Bulan Lalu",
      startDate: getFirstDayInLastMonth(),
      endDate: getLastDayInLastMonth(),
      dayStr: getFirstDayInLastMonth() + " To " + getLastDayInLastMonth(),
    },
    {
      day: 365,
      title: "Tahun Ini",
      startDate: getFirstDayInYear(),
      endDate: getLastDayInYear(),
      dayStr: getFirstDayInYear() + " To " + getLastDayInYear(),
    },
    {
      day: 730,
      title: "Tahun Lalu",
      startDate: getFirstDayInLastYear(),
      endDate: getLastDayInLastYear(),
      dayStr: getFirstDayInLastYear() + " To " + getLastDayInLastYear(),
    },
  ];

  const pickPeriod = (item) => {
    setPeriod(item.day);
    setTimeRange({ startDate: item.startDate, endDate: item.endDate });
    setShow(false);
  };

  return (
    <div className="py-2 relative">
      <div
        className="w-[200px] p-2 bg-white text-center cursor-pointer"
        onMouseEnter={() => {
          setShow(true);
        }}
        onMouseLeave={() => {
          setShow(false);
        }}
      >
        {title}
      </div>
      <div>
        <ul
          className={`w-[200px] bg-slate-300 text-center absolute ${
            show ? "flex flex-col" : "hidden"
          }`}
          onMouseEnter={() => {
            setShow(true);
          }}
          onMouseLeave={() => {
            setShow(false);
          }}
        >
          {dayArr.map((item, idx) => {
            return (
              <li
                key={idx}
                className="hover:bg-slate-100 p-3
             cursor-pointer"
                onClick={() => {
                  pickPeriod(item);
                }}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TimeSelector;
