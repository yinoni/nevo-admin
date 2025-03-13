require("dotenv").config();

export const production = false;
export const route = production ? process.env.NEXT_PUBLIC_SERVER_URL : "http://localhost:5000";