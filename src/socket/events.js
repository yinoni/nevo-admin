

import socket from "./socket.js";


export const updateLineHours = (hoursData) => {
    socket.emit("setHours", hoursData);
}

export const cancelLine = (lineData) => {
    socket.emit("cancelLine", lineData);
}

export const removeHourFromDate = (data) => {
    socket.emit("removeHourFromDate", data);
}