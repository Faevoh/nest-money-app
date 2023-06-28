"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountGenerator = void 0;
const common_1 = require("@nestjs/common");
let accountGenerator = class accountGenerator {
    accountnumberGenerator() {
        const numberLength = 10;
        const minLength = Math.pow(10, numberLength - 1);
        const maxLength = Math.pow(10, numberLength) - 1;
        const accountNumbers = new Set();
        while (accountNumbers.size < numberLength) {
            const randomNumber = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
            accountNumbers.add(randomNumber.toString().padStart(numberLength, '0'));
        }
        const result = Array.from(accountNumbers)[0];
        return result;
    }
};
accountGenerator = __decorate([
    (0, common_1.Injectable)()
], accountGenerator);
exports.accountGenerator = accountGenerator;
//# sourceMappingURL=generator.service.js.map