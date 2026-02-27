"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const sockets_1 = require("./sockets");
const workspace_routes_1 = __importDefault(require("./routes/workspace.routes"));
const channel_routes_1 = __importDefault(require("./routes/channel.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use("/",(req,res,next)=>{
//   res.send(
//     "hello"
//   )
// });
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});
(0, db_1.connectDB)();
(0, sockets_1.initSockets)(exports.io);
app.use("/api/workspaces", workspace_routes_1.default);
app.use("/api/channels", channel_routes_1.default);
app.use("/api/messages", message_routes_1.default);
app.use("/", user_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
server.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
});
