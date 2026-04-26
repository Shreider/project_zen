FROM node:22-alpine

WORKDIR /app
COPY package.json package-lock.json* ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN npm install
COPY . .
RUN npm run build -w @project_zen/shared && npm run build -w @project_zen/frontend
EXPOSE 4001
CMD ["npm", "run", "start", "-w", "@project_zen/frontend"]
