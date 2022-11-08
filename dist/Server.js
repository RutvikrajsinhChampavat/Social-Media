"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const Database_1 = __importDefault(require("./db/Database"));
const ResponseMessage_1 = require("./responses/ResponseMessage");
const app = (0, express_1.default)();
dotenv_1.default.config();
Database_1.default.init();
console.log(process.env.MONGODB_CONNSTRING);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((_req, res, next) => {
    res.reply = ({ code, message }, data = {}, header = undefined) => {
        res.status(code).header(header).json({ message, data });
    };
    next();
});
app.use((req, res, next) => {
    console.log(`${req.method} url::${req.url}`);
    next();
});
app.use("/api/v1/auth", AuthRoutes_1.default);
app.get('/hello', (req, res) => {
    res.send('hello there...');
});
app.use((err, req, res, next) => {
    res.reply(ResponseMessage_1.customResponse['SERVER_ERROR']);
});
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server up and running on ${PORT}`));
//# sourceMappingURL=Server.js.map