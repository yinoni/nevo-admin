
import { io } from "socket.io-client";
import {route} from '../consts.js';

require("dotenv").config();

const socket = io(route);

export default socket;