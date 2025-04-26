const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "/",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0ZCUWVYWEx4RXRWUVJTOTdwaW85MndXclMxdW9KaHN6MjcvbXVDcWMzRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDV3RmFjYVhZb0h1S21BMStGd0MvNXBKZnF5OFY1OTR6dW45eXU5T3Iwcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1UEZxVmdXYVRhRzc3WURVdjA1T0dFbjZpSTJiMGx3bnhIeDVZODR3U0VJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvUEc2N0ZhU0RtWWZhcUVua3R4T2Z3NE1kWTVNVTdJa055T2hFL0hLSkE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVJZkZ4T3N5blhCbGN5QmhUTzVqYkdoRnh6STBrTEw2clVOWUI1QVdNWDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdIZ0lpVEV0aVpXQU8zUFRPck9mZHcxVGxFRStLczBYZXNGMG5qRW5RUms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1A2UHhHUE9HZ0JRbHNWYzNsTXBQekV6SlQxeWJ2bFRFZGFOWUJQNTRtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibTJDTStMelo2aVpqQnB1UVhVTmQwZGtEUDRVMDRrenBXbzMxL1AxbERoMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9WbUdXSG9YejYxN0Q3dWpNem5kQ1hFUTh6azRWL3cxcm40UTNPa0Mydk9DSk5keWFUSEtEK2N4VktJT2hFQm1hUHpkcGxQajZldGx6dVJkZG9abkNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkxLCJhZHZTZWNyZXRLZXkiOiI5T1lSWFg2QTJaQW5HZGJhSGt0OVcxTktJN1pYY0pyOWFjSU9PV01qd0ZjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJRWlZSUkpBTSIsIm1lIjp7ImlkIjoiMjI4OTM2OTc1NTc6NjFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2XlCAgXG7wnZeoICBcbvCdl5ogIFxu8J2XqCAgXG7wnZemICBcbvCdl6cgIFxuXG7wnZegICBcbvCdl5QgIFxu8J2XoSAgXG7wnZesIiwibGlkIjoiMTY5MjczODIxNTIwMDIyOjYxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSXFJdTVFRkVQbmxzOEFHR0RJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidkdjcVB2L3RKbWRPTGsxcXZNS2ZhYlYyZk1pa0tGTi8rTWd2dnpUeVJUbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibHlVWjladFhnTnFJQng4aitIM0NRWEJ3V01RdzU0aGhtVXFRTEo0MlMwU1BEUEZSSVAwUHYxSTlYRmNlbnFuUEZjbEdTcnpqVzBUeWh3MzBzRFJkQUE9PSIsImRldmljZVNpZ25hdHVyZSI6Imx1dUpPVXd3MkdpRENKcWJ0ZGVudTFXZWxQdzNEM1E5OUlYNzc0N3c5SGNKclF4czFlcU9CQlBCMG1sYW1KaGtYWE1hS1FtTHBxVHB3YU9BOXRnZUF3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI4OTM2OTc1NTc6NjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYnhuS2o3LzdTWm5UaTVOYXJ6Q24ybTFkbnpJcENoVGYvaklMNzgwOGtVNiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1Njc5MTEwLCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
