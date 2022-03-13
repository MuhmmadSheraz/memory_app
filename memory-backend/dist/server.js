"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var process_1 = __importDefault(require("process"));
var Memory_1 = __importDefault(require("./routes/Memory"));
var dbConnection_1 = require("./helper/dbConnection");
var Auth_1 = __importDefault(require("./routes/Auth"));
var app = (0, express_1.default)();
dotenv_1.default.config({
    path: './config.env'
});
// Express Middlewares
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: true, credentials: true }));
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
(0, dbConnection_1.connectDB)();
app.use("/api", Memory_1.default);
app.use("/api", Auth_1.default);
app.use((0, cookie_parser_1.default)());
app.listen(process_1.default.env.PORT, function () {
    console.log("server is started \uD83D\uDCA8 on port ".concat(process_1.default.env.PORT, " "));
});
