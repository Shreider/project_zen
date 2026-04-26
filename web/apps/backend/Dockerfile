FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/backend/package.json apps/backend/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install

COPY . .
RUN npm run build -w @project_zen/shared && npm run db:generate -w @project_zen/backend && npm run build -w @project_zen/backend

EXPOSE 4000
CMD ["npm", "run", "start", "-w", "@project_zen/backend"]
