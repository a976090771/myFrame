import request from "../utils/request.js"

export  function getClassify(){

    return request.get('categories',{params:{type:2}})
}