FROM node:18.16.0
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node", "dist/main.js"]