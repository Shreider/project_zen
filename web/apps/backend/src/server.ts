import { createServer } from "node:http";
import { env } from "./config/env";
import { createApp } from "./app";
import { createRealtimeGateway } from "./modules/realtime/realtime.gateway";

const app = createApp();
const server = createServer(app);
createRealtimeGateway(server);

server.listen(env.PORT, () => {
  console.info(`project_zen backend listening on http://localhost:${env.PORT}`);
});
