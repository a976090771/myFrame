import request from "../utils/request.js"

export function powerList(){
   
    return request.get("rights/list")
}

