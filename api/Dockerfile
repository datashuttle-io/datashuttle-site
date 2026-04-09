FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY server.mjs ./
ENV PORT=3001
EXPOSE 3001
USER node
CMD ["node", "server.mjs"]
