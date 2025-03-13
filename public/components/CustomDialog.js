import React, { useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const CustomDialog = ({openState, onClose, onHourAccept}) => {

    const handleClose = () => {
        onClose();
    };

    const onAccept = (hour) => {
      handleClose();
      onHourAccept(hour.format('HH:mm'));
    }


    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
          open={openState}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <StaticTimePicker ampmInClock={false} minutesStep={15} onAccept={onAccept} defaultValue={dayjs('2022-04-17T15:30')} />
      </Dialog>
      </LocalizationProvider>
    );
}


export default CustomDialog;