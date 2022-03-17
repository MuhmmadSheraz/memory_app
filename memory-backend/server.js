"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const process_1 = __importDefault(require("process"));
const Memory_1 = __importDefault(require("./routes/Memory"));
const dbConnection_1 = require("./helper/dbConnection");
const Auth_1 = __importDefault(require("./routes/Auth"));
const app = (0, express_1.default)();
const port = process_1.default.env.NODE_ENV === 'development' ? 3001 : process_1.default.env.PORT;
console.log('env--', process_1.default.env.NODE_ENV);
// Express Middlewares
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://memory-webapp.netlify.app'],
    credentials: true,
}));
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
dotenv_1.default.config({
    path: './.env.development',
});
(0, dbConnection_1.connectDB)();
app.use(`/api`, Memory_1.default);
app.use(`/api`, Auth_1.default);
app.use((0, cookie_parser_1.default)());
// app.listen(3001, () => {
//   console.log(`server is started 💨 on port ${3001} `)
// })
