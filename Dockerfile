FROM node:18.16.0
WORKDIR /
COPY burgercraft-app_backend/package.json ./
RUN npm install
COPY burgercraft-app_backend .
COPY .env .
RUN npm run build
CMD ["node", "dist/main.js"]