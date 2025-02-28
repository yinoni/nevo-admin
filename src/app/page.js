'use client';

require("dotenv").config();

import styles from "./page.module.css";
import * as React from 'react';
import Card from "../../public/components/Card";
import CustomDatePicker from "../../public/components/CustomDatePicker";
import axios from "axios";
import dayjs from 'dayjs';
import { cancelLine } from "@/socket/events";
import socket from "@/socket/socket";

export default function Home() {
  const route = process.env.NEXT_PUBLIC_SERVER_URL;
  const [clients, setClients] = React.useState([]);

  const onDeleteClient = (lineData) => {
    cancelLine(lineData);
  }

  let renderedClients = clients.map((client, key) => {
    return <Card key={key} onDeleteBtn={onDeleteClient} client={client} />
  })


  const onDateChange = (date) => {
    let formattedDate = ""+date.format("DD/MM/YYYY");
    getClients(formattedDate);
  }

 
  
  const getClients = (fromDate) => {

    axios.post(`${route}/admin/getLines`, {date: fromDate})
    .then(response => {
      setClients(response.data);
    })
    .catch(err => {
      console.log("Error! => ", err);
    });
  }

  React.useEffect(() => {
    let currentDate = ""+dayjs(new Date()).format("DD/MM/YYYY");
    getClients(currentDate);
  }, []);

  socket.on("postCancelLine", (lineData) => {
    setClients(clients.filter(client => {
      return lineData.hour !== client.hour;
    }));
  })

  return (
    <div className={styles.page}>

      <CustomDatePicker onChange={onDateChange} />

      <h3 className={styles.paragraph}>:תורים</h3>

      <div className={styles.cardsContainer}>
        {clients.length > 0 ? renderedClients : "לא נמצאו תורים"}
      </div>
      
    </div>
  );
}
