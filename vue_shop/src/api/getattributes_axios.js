import request from "../utils/request.js"

export  function getattributes(cateID,activeName){

    return request.get(`categories/${cateID}/attributes`,{params:{sel:activeName}})
}