import request from "../utils/request.js"

export  function addCataClassify(url,data){

    return request.post(url,data)
}