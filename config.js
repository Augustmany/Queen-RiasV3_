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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9YSG01ejBVL215bmkyYVUzNW5jcWxuR0s3Y3lMcDdzZlh0c2dVR2tIdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU9rYkZ3UHZESkJNSnE5MVM4UVZwcXdkTzdZWm45K2k4b09hVGZuOTVIUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTzh5Ynp0dEtDNnBJRktWeEYwUUU0UG4zS0pWaVNDTFF6TklYMU0zb21zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOZ2JpMDFlMXZSdlJBN2k4REhkaThNeEk2OFU0N0NYVEY3Zkh3WVhiRUhRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVCR005YjlBMkIyOXkxRmNxR1g0ZUxHQjVPZ29VM3B2VXdhdVJZQjFEWG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBQdytUTlQ1UWRvT2JnNWlmVUVCNHJVeWE5Tm1iQy8vQVRuNVBNeVVyeUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0hkN3JjUnduRzRTQlZTcU9vMkRubnlrRHRZcTQ2c2RYYzRVUU9nSVQxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid3ZsUXNoV2EzNXloUm11cUF3MnZsNnZzOW9RT1JnR3ptZkpHQXo1UGFEcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhJcXJ2UU5CWGxkQ3dzTkZIalI5dmZqQXFXMnppc05FeWpweFhDWWZtQWZsZlZFL1dzY3ZLRXp5YWlhdWFIcmNPaDhQV0N0ZU16cVRQZ2ZQQUJFcUF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg4LCJhZHZTZWNyZXRLZXkiOiJjbUREQS9JMVp6RVZJR3JBYm4yWWFQZjJFOWVEdEIzSk1kamhLT1F2ZUVnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJHRDc0WlJBUyIsIm1lIjp7ImlkIjoiMjc3MzYxMDc5OTE6MkBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjcwMjc5MTUzODk3NjQyOjJAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLQ3dnVTBRd3NIWndBWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaaDFlQVZ6MjhDN2JHVFk0eUdZM09JRnl3NENJMnI5eTBzd3V2UGowNURBPSIsImFjY291bnRTaWduYXR1cmUiOiJjalY4K0ZONkZzVmdyNFo2azBLcFUyNlZ5OWc1K0NydUxQUmczWUhiZTQ5NnBuc2t0cWJHalJoVHlsUW1HcHNLcjY2dWhPRjhDNVpub0ZzNWR0OTJCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZUtsbXhMRmxyb1N3UDZrTHFkRXpIYXRMcW9hZzV2N2s4UVhQeWdoMnBWMS82ZzRpQnFnQ1RaMFdGclhkdnFOS3YyckxkTWM3eFg0ZnJLVmo2cjdMQWc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzczNjEwNzk5MToyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldZZFhnRmM5dkF1MnhrMk9NaG1OemlCY3NPQWlOcS9jdExNTHJ6NDlPUXcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NjI5NzA0MCwibGFzdFByb3BIYXNoIjoiMlY3N3FVIn0=",
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
