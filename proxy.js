const axios = require('axios');
const fs = require('fs');

const logFile = 'bot.log';

function logToFileAndConsole(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage);
  fs.appendFileSync(logFile, logMessage);
}

async function scrapeProxies() {
  const proxySources = [
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/http.txt'
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/socks5.txt'
    'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/refs/heads/master/socks4.txt'
  let proxies = [];

    // Hapus file proxy.txt lama
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
    logToFileAndConsole('proxy.txt lama berhasil dihapus');
  }
  
  for (const source of proxySources) {
    try {
      const response = await axios.get(source);
      proxies = proxies.concat(response.data.split('\n'));
    } catch (error) {
      logToFileAndConsole(`Error scraping proxies from ${source}: ${error.message}`);
    }
  }

  fs.writeFileSync('proxy.txt', proxies.join('\n'));
  logToFileAndConsole('Proxies successfully scraped and saved to proxy.txt');
}
module.exports = scrapeProxies;
