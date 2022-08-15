import request from "../utils/request.js"

export  function commodityRequest(url){

    return request.get(url)
}