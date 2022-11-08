"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Common_1 = require("./Common");
class Post extends Common_1.Common {
    constructor(obj) {
        super();
        this._id = obj._id;
        this.body = obj.body;
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    edit() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getPost() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
//# sourceMappingURL=Post.js.map