import axios from "axios";

export default async function getUser() {
    const user = await localStorage.getItem('session')
    console.log('dsgg')
    return user;
}