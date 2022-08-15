import request from "../utils/request.js"

export  function getTree(){

    return request.get('rights/tree')
}