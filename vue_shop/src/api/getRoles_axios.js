import request from "../utils/request.js"

export  function getRoles(url){

    return request.get(url)
}