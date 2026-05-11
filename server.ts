import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import axios from 'axios';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cookieParser());
  app.use(session({
    secret: process.env.SESSION_SECRET || 'one-percent-club-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = `${process.env.APP_URL || 'http://localhost:3000'}/auth/callback`;

  // API Routes
  app.get('/api/auth/url', (req, res) => {
    if (!DISCORD_CLIENT_ID) {
      return res.status(500).json({ error: 'Discord Client ID not configured' });
    }
    const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds%20guilds.members.read`;
    res.json({ url });
  });

  app.get('/auth/callback', async (req: any, res) => {
    const { code } = req.query;
    if (!code) return res.redirect('/');

    try {
      const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: DISCORD_CLIENT_ID!,
        client_secret: DISCORD_CLIENT_SECRET!,
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: REDIRECT_URI,
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      const { access_token } = response.data;
      
      // Get user info
      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      // @ts-ignore
      req.session.user = userResponse.data;
      // @ts-ignore
      req.session.accessToken = access_token;

      res.send(`
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
                window.close();
              } else {
                window.location.href = '/';
              }
            </script>
            <p>Authentication successful. You can close this window.</p>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Discord Auth Error:', error);
      res.status(500).send('Authentication failed');
    }
  });

  app.get('/api/me', (req: any, res) => {
    if (!req.session?.user) return res.status(401).json({ error: 'Unauthorized' });
    res.json(req.session.user);
  });

  app.post('/api/logout', (req: any, res) => {
    req.session.destroy(() => {
      res.json({ success: true });
    });
  });

  // Stats (placeholder)
  app.get('/api/community/stats', (req, res) => {
    res.json({
      memberCount: 1248,
      activeVoice: 42,
      onlineNow: 156
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
