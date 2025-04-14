FROM node:20
WORKDIR /app
COPY space-frontend-client/package*.json ./
RUN npm install
COPY space-frontend-client/ .
COPY .env /app/.env
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]