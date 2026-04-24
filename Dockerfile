# Node 20 + Chromium base for whatsapp-web.js + Puppeteer.
# Uses Debian slim so Chromium installs cleanly via apt.
FROM node:20-slim

# Install Chromium and the libraries Puppeteer needs to run it headless.
# These are the minimum deps to boot Chromium on a container.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
    chromium \
    ca-certificates \
    fonts-liberation \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    wget \
 && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to use the system Chromium — don't download its own.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# Install ALL deps (devDependencies needed for `vite build`).
COPY package.json package-lock.json ./
RUN npm ci

# Copy source, then build the Vite frontend.
COPY . .
RUN npm run build

# Now switch to production for runtime.
ENV NODE_ENV=production \
    PORT=3001
EXPOSE 3001

CMD ["node", "server.js"]
