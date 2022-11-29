export declare class UsersService {
    users: {
        id: number;
        nom: string;
        prenom: string;
        img: string;
    }[];
    getUsers(): Promise<any>;
    getUser(userId: any): Promise<any>;
    addUser(user: any): Promise<any>;
}
