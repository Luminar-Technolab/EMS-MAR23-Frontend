import {BASE_URL} from './baseUrl';
import { commonAPI } from './commonAPI';

export const addUser = async (body,header)=>{
    return commonAPI("POST",`${BASE_URL}/add`,body,header)
}

export const allUsers = async (search)=>{
    return commonAPI("GET",`${BASE_URL}/get-all-users?search=${search}`,"")
}

export const deleteUser = async (id)=>{
    return await commonAPI("DELETE",`${BASE_URL}/delete-user/${id}`,{})
}

export const editUser = async (id,body,header)=>{
    return commonAPI("PUT",`${BASE_URL}/edit-user/${id}`,body,header)
}