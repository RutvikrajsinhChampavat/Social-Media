"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection {
    static init(db) {
        this.users = db === null || db === void 0 ? void 0 : db.collection('users');
    }
}
exports.default = Collection;
//# sourceMappingURL=Collection.js.map