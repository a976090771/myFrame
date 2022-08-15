import request from "../utils/request.js"

export function deleteRoles(roleId,dataId){

    return request.delete(`roles/${roleId.id}/rights/${dataId}`)
}