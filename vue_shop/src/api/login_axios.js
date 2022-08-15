import request from "../utils/request.js"

export function loginBtn(data){
    console.log(data)
    return request.post("login",data)
}

