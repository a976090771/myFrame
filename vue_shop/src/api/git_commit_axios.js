import request from "../utils/request.js"

export function Commlt(data){

    return request.put(`users/`+ data.id,{email:data.email,mobile:data.mobile})
}