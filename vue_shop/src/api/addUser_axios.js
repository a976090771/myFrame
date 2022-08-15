import request from "../utils/request.js"

export  function addUser(url,data){

    return request.post(url,data)
}