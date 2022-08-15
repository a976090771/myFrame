import request from "../utils/request.js"

export  function getclassifyparams(){

    return request.get('categories')
}