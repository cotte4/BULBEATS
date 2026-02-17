import express from 'express';
import cors from 'cors';
import { spawn, execSync } from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';

const app = express();
const PORT = 3001;
const DOWNLOADS_DIR = path.join(os.homedir(), 'Downloads', 'BeatFinderMP3');

// Ensure downloads folder exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
  fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

// Auto-detect ffmpeg location
function findFfmpeg() {
  try {
    const result = execSync('where.exe ffmpeg', { encoding: 'utf8' }).trim().split('\n')[0].trim();
    return path.dirname(result);
  } catch {
    return null;
  }
}

const ffmpegDir = findFfmpeg();

app.use(cors());
app.use(express.json());

// Health check — the web app pings this to know if the local server is running
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', downloadsDir: DOWNLOADS_DIR });
});

// Download endpoint — streams the MP3 back to the browser
app.get('/download', (req, res) => {
  const { videoId, title } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'videoId is required' });
  }

  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const safeTitle = (title || videoId).toString().replace(/[<>:"/\\|?*]/g, '_');
  const outputPath = path.join(DOWNLOADS_DIR, `${safeTitle}.%(ext)s`);

  console.log(`⬇ Downloading: ${safeTitle}`);
  console.log(`  URL: ${url}`);
  console.log(`  Output: ${DOWNLOADS_DIR}`);

  const args = [
    '-x',
    '--audio-format', 'mp3',
    '--audio-quality', '0',
    '-o', outputPath,
    '--no-playlist',
    '--progress',
    '--js-runtimes', 'nodejs',
  ];

  if (ffmpegDir) {
    args.push('--ffmpeg-location', ffmpegDir);
  }

  args.push(url);

  const ytdlp = spawn('yt-dlp', args, {
    env: { ...process.env, PATH: process.env.PATH },
  });

  let output = '';
  let errorOutput = '';

  ytdlp.stdout.on('data', (data) => {
    const line = data.toString();
    output += line;
    process.stdout.write(line);
  });

  ytdlp.stderr.on('data', (data) => {
    const line = data.toString();
    errorOutput += line;
    process.stderr.write(line);
  });

  ytdlp.on('close', (code) => {
    if (code === 0) {
      console.log(`✓ Done: ${safeTitle}.mp3`);
      res.json({
        success: true,
        message: `Descargado: ${safeTitle}.mp3`,
        path: DOWNLOADS_DIR,
      });
    } else {
      console.error(`✗ Failed (code ${code}): ${errorOutput}`);
      res.status(500).json({
        success: false,
        error: 'yt-dlp failed',
        details: errorOutput || output,
      });
    }
  });

  ytdlp.on('error', (err) => {
    console.error('✗ yt-dlp not found:', err.message);
    res.status(500).json({
      success: false,
      error: 'yt-dlp not found. Install it: pip install yt-dlp',
    });
  });
});

app.listen(PORT, () => {
  console.log('');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🎵 BeatFinder Local Download Server');
  console.log(`  ➜ Running on http://localhost:${PORT}`);
  console.log(`  ➜ MP3s save to: ${DOWNLOADS_DIR}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
});
