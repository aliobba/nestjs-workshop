"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_mock_1 = require("./users.mock");
let UsersService = class UsersService {
    constructor() {
        this.users = users_mock_1.USERS;
    }
    getUsers() {
        return new Promise((resolve) => {
            console.info(this.users);
            resolve(this.users);
        });
    }
    getUser(userId) {
        const id = Number(userId);
        return new Promise((resolve) => {
            const course = this.users.find((course) => course.id === id);
            if (!course) {
                throw new common_1.HttpException('Utilisateur inexistant', 404);
            }
            resolve(course);
        });
    }
    addUser(user) {
        return new Promise((resolve) => {
            user = Object.assign({ id: this.users.length + 1 }, user);
            this.users.push(user);
            resolve(this.users);
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map