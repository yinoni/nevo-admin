'use client';

import React, { useEffect, useState } from "react";
import CustomDatePicker from "../../../public/components/CustomDatePicker";
import DropDown from "../../../public/components/DropDown";
import '../../../public/styles/HoursPage.css';
import { updateLineHours } from "@/socket/events";
import dayjs from "dayjs";


function generateTimeSlots() {
    let times = [];
    let startHour = 8;
    let endHour = 21;


    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minutes of [0, 15, 30, 45]) {
            if (hour === endHour && minutes !== 0) break; // Prevent adding 21:30
            let formattedHour = hour.toString().padStart(2, '0');
            let formattedMinutes = minutes.toString().padStart(2, '0');
            times.push(`${formattedHour}:${formattedMinutes}`);
        }
    }
    
    return times;
}

const HoursPage = () => {
    const [currentSelection, setCurrentSelection] = useState(0);
    const [endSelection, setEnd] = useState(-1);
    const [active, setActive] = useState(false);
    const [selectedDate, setDate] = useState(null);
    const hours = generateTimeSlots();

    useEffect(() => {
        let currentDate = dayjs().format("DD/MM/YYYY");

        setDate(currentDate);

    }, []);
    
    /*Change the start hour*/
    const onStartChange = (value) => {
        setActive(true);
        if(value < hours.length - 1)
            setCurrentSelection(value);
    }

    /*Set the end hour*/
    const onEndChange = (value) => {
        setEnd(currentSelection + value + 1);
    }

    const onDateChange = (date) => {
        let formattedDate = ""+date.format("DD/MM/YYYY");
        setDate(formattedDate);
    }
    
    /*On Submit button clicked*/
    const onSubmitBtn = () => {
        let allHours = hours.slice(currentSelection, endSelection + 1);     
        
        updateLineHours({date: selectedDate, hours: allHours});
    }

    return (
        <div className="hours-container">
            <CustomDatePicker onChange={onDateChange} />
            <div className="top-part" style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <h4 className="topic" style={{marginTop: 30}}>בחירת שעות</h4>
            </div>

            <DropDown topic='שעת התחלה' items={hours} onStartChange={onStartChange} />
            {active && <DropDown topic='שעת סיום' items={hours.slice(currentSelection + 1)} onStartChange={onEndChange} />}
            
            <button className="submit-btn" onClick={onSubmitBtn}>עדכן</button>
        </div>
    );
}


export default HoursPage;