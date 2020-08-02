import userService from './userservice'
export default async function guard(role){
    if (!role){
        return true;
    }
    const user = await userService.get();
    return userService.checkRole(user, role)
}