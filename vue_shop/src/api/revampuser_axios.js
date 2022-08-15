import request from "../utils/request.js"

export function revampUser(userId,data){
   console.log(userId)
   console.log(data)
    return request.put(`users/${userId}/role`,{rid:data})
}