'use client';
import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../styles/CustomDatePicker.css';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';


const CustomDatePicker = ({onChange}) => {
  const [value, setValue] = useState(dayjs(new Date()));

    return (
      <div className='date-container'>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
          <DemoContainer components={['DatePicker']}>
            <DatePicker value={value} onChange={(newDate) => setValue(newDate)} onAccept={onChange} label="בחר תאריך" />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    );
}

export default CustomDatePicker;