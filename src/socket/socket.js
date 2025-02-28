
import { io } from "socket.io-client";

require("dotenv").config();

const route = process.env.NEXT_PUBLIC_SERVER_URL;
const socket = io(route);

export default socket;