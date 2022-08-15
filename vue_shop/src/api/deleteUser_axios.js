import request from "../utils/request.js"

export function deleteUser(data){

    return request.delete(`users/`+ data)
}