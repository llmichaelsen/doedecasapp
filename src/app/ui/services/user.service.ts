import { Injectable } from "@angular/core";
import { UserApp } from "app/ui/models/user/user.model";
import { UserType } from "../models/user/user-type.enum";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";


@Injectable()
export class UserService {

    constructor(
        private userRepository: UserRepository,
        private authService: AuthService
    ){}

    public async saveUser(user: UserApp): Promise<void> {
         return await this.userRepository.saveUser(user);
    }

    public async getUsers(type: UserType): Promise<UserApp[]> {
        const users = await this.userRepository.getUsers();
        return users.filter(u => u.type === type);
    }
    
    public async getUser(): Promise<UserApp> {
        try {
            const user = await this.authService.getUser();
            return await this.userRepository.getUser(user.uid);
        } catch (error) {
            return error;
        }
    }

    public async updateUser(user: UserApp): Promise<any> {
        try {
            const result = await this.userRepository.updateUser(user);
            return result;
        } catch (error) {
            return error;
        }
    }

    public async deleteUser(user): Promise<UserApp[]> {
        return await this.userRepository.deleteUser(user);
    }
}