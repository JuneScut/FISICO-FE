import http from './api';

let transportation = {};



transportation.createContract = function(params){
    return http.post("/transportation/contract/create", params);
}
transportation.contractList = function(params){
    return http.get("/supply/Logistics/contracts", params);
}
export default transportation;