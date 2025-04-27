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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0duQ2RxWmZCU2dad2ExOVFGRXA1TzNLUkRZVE1Ta1dmWlNaVFNldGhHaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYnRpR2hkMmVlNmNWcEVpbC83ZkRpNHdIR2lXL0JEaStESjNhaXl6MEZXQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtS2dhRDBrRU9IR0tlelZzdjBkSXVwRFhpbVRsNWJlSGUzV0NvTTZoNlhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2Zk53K3lSN0FyS0g2QzRvRUl0UVFRaVI2aEVUTDRNakYzUXFLMzBiSG1zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1IVU1aV1VkU244ZVI1bnR4WGJJT2lCaUN5SEk0NXpnQ0tmd1ZVUVU3M289In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpCZ1lYK3pXWjRQaFZqaHRWVFNRQ2lCaUdFWlFZU0pNSmNkQXVyc0prazA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUl2U2Nsb3dhWkJhWTEvcTFvbkpPZE94WmdyQUxXSGpwU0hTUnNidzZHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNVVjUGVxQ29DSzcxdmw1MzVSWE41YnhHRkxBanpob3hpMUduVmM0RVVpQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkN4NGFxRzNrTG5PTkVRcjJxRXN0OGNOSm5Dd3J4eVFTbWl4M1Q2QklPVlFNQ052eFRoNEIwRW1QYk9qa1dkNktGcTVWNXp4MzR4YWF0NzBVOWoybUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgyLCJhZHZTZWNyZXRLZXkiOiJ6aTJVM2hPR0kzZm5FNWVlS0VlcmtKSUNsNHBJYldUSlR1NHJTaDF4MUxVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJENDJaWkJSUSIsIm1lIjp7ImlkIjoiMjI4OTM2OTc1NTc6NjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2XlCAgXG7wnZeoICBcbvCdl5ogIFxu8J2XqCAgXG7wnZemICBcbvCdl6cgIFxuXG7wnZegICBcbvCdl5QgIFxu8J2XoSAgXG7wnZesIiwibGlkIjoiMTY5MjczODIxNTIwMDIyOjY2QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSXFJdTVFRkVQZVF0OEFHR0RjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoidkdjcVB2L3RKbWRPTGsxcXZNS2ZhYlYyZk1pa0tGTi8rTWd2dnpUeVJUbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiLy9BcjFtVi9HUU52aU5rMXFFQUd2MjVxcWc5RDhONXVUbDhJc3E1Z3JFZHdvMFlNazREeGpOeHoxNC9iR3ZkeStzTzRiRFFqRE5iVVpCZDFDU1g4QXc9PSIsImRldmljZVNpZ25hdHVyZSI6IllnMm11QTI5cGRmVzBvVGlLemowZDNvTlZWM1BGUjRmeVN1emhsdVZpWGk5ZERicGRNQ2RLZ0tiSWh1cDUrdkp5NFg4M1cwUUNzZWVmR21XT2VETEJBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI4OTM2OTc1NTc6NjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYnhuS2o3LzdTWm5UaTVOYXJ6Q24ybTFkbnpJcENoVGYvaklMNzgwOGtVNiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NzMzNzY0LCJsYXN0UHJvcEhhc2giOiIyRzRBbXUifQ==",
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
