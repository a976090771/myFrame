import request from "../utils/request.js"

export  function addParams(id,attr_name,attr_sel){

    return request.post(`categories/${id}/attributes`,{attr_name:attr_name,attr_sel:attr_sel})
}