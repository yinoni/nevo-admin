'use client';

import React, { useEffect, useState } from "react";
import CustomDatePicker from "../../../public/components/CustomDatePicker";
import DropDown from "../../../public/components/DropDown";
import '../../../public/styles/HoursPage.css';
import { updateLineHours } from "@/socket/events";
import dayjs from "dayjs";
import CustomSlider from "../../../public/components/CustomSlider";
import CustomChip from "../../../public/components/CustomChip";
import axios from "axios";
import {route} from '../../consts.js';
import { removeHourFromDate } from "@/socket/events";
import socket from "@/socket/socket";

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
    const [currentOption, setOption] = useState(0);
    const [hoursOnDate, setHoursOnDate] = useState([]);
    const hours = generateTimeSlots();
    
    const onChipClicked = (chipText) => {
        removeHourFromDate({date: selectedDate, hour: chipText});
    }
    
    const renderedHoursChips = hoursOnDate.map((hour, key) => {
        return <CustomChip key={key} chipText={hour} handleDelete={onChipClicked} /> 
    });


    /*Get all the hours from the selected date*/
    const getHours = (date) => {
        axios.post(`${route}/getHours`, {date: date})
        .then(result => {
            let hours = result.data.hours;
            setHoursOnDate(hours);
        })
        .catch(error => {
            console.log("Error! ====> ", error);
        })
    }


    useEffect(() => {
        let currentDate = dayjs().format("DD/MM/YYYY");
        getHours(currentDate);
        setDate(currentDate);
        socket.connect();

        return () => {
            socket.off("connect");
          };

    }, []);

    socket.on("addedLine", (line) => {
        if(line.date === selectedDate){
            setHoursOnDate(hoursOnDate.filter(hour => {
                return hour !== line.hour;
            }));
        }
    });

    
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
        getHours(formattedDate);
    }
    
    /*On Submit button clicked*/
    const onSubmitBtn = () => {
        let allHours = hours.slice(currentSelection, endSelection + 1);     
        setHoursOnDate(allHours);
        updateLineHours({date: selectedDate, hours: allHours});
    }

    const onSliderChange = (newValue) => {
        setOption(newValue);
        setActive(false);
        setCurrentSelection(0);
        setEnd(-1);
    }

    

    return (
        <div className="hours-container">
            <CustomSlider onChange={onSliderChange} />
            <CustomDatePicker onChange={onDateChange} />
            {currentOption === 0 ? 
                <div style={{width: '50%'}} className="chooseHours">
                    <h4 className="topic" style={{marginTop: 30}}>בחירת שעות</h4>
                    <DropDown topic='שעת התחלה' items={hours} onStartChange={onStartChange} />
                    {active && <DropDown topic='שעת סיום' items={hours.slice(currentSelection + 1)} onStartChange={onEndChange} />}
                </div>
            :
                <div className="updateHours">
                    <h4 style={{marginTop: 20, marginBottom: 20}} className="topic">ערוך שעות</h4>
                    <div className="chips-container">
                        {renderedHoursChips}
                    </div>
                    
                </div>

            }
            
            
            <button className="submit-btn" onClick={onSubmitBtn}>עדכן</button>
        </div>
    );
}


export default HoursPage;