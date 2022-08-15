import request from "../utils/request.js"

export  function alterParams(url,data){

    return request.get(url,{params:data})
}