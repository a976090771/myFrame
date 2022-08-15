import request from "../utils/request.js"

export function permissionAssignment(roleId,data){
    console.log(data)
    return request.post(`roles/${roleId}/rights`,{rids:data})
}

