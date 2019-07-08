import http from './api';

let transportation = {};



transportation.createContract = function(params){
    return http.post("/transportation/contract/create", params);
}
transportation.contractList = function(params){
    return http.get("/supply/Logistics/contracts", params);
}
transportation.collectGoods = function(params){
    return http.post('/transportation/collect', params);
}
transportation.signInsContract = function(params){
    return http.post('/transportation/insurance/sign', params);
}
export default transportation;