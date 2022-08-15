import request from "../utils/request.js"

export function ChangeState(data){

    return request.put(`users/${data.id}/state/${data.mg_state}`)
}