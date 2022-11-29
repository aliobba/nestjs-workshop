import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<any>;
    getUser(userId: any): Promise<any>;
    addUser(nom: any, prenom: any, img: any): Promise<any>;
}
