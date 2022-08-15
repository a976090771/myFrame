import request from "../utils/request.js"

export  function getUserList(url,data){

    return request.get(url,{params :data})
}