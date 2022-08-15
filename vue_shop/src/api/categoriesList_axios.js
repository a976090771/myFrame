import request from "../utils/request.js"

export  function getCategoriesList(url,data){

    return request.get(url,{params:data})
}