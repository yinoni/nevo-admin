import React from "react";
import Image from "next/image";
import clock from '../assets/clock.svg';
import trash from '../assets/trash.svg';
import '../styles/Card.css';

const Card = ({client, onDeleteBtn}) => {

    return (
        <div className="card-container">
            <div className="card-top">
                <h4 className="paragraph details">{`${client.fullName} ${client.phoneNumber}`}</h4>
            </div>
            <div className="card-bottom">
                <p className="paragraph hour">{client.hour} <Image src={clock} width={25} height={25} alt="clock" /> </p>
                <button onClick={() => onDeleteBtn(client)} className="delete-btn"><Image src={trash} width={25} height={25} alt="trash" /></button>
            </div>
        </div>
    );
}

export default Card;