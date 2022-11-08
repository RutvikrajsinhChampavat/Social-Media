"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
class Helper {
    static shalowCopy(source, target) {
        Object.keys(target).forEach((key) => {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        });
        return target;
    }
}
exports.Helper = Helper;
//# sourceMappingURL=Helper.js.map