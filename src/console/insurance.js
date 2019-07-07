import http from './api';

let insurance = {};

insurance.type = [
    {key: 'GOODS', value: '货物保险'},
    {key: 'TRANS', value: '物流保险'}
]
insurance.createContract = function(params){
    return http.post("/insurance/contract/create", params);
}
insurance.contractList = function(params){
    return http.get("/supply/insurance/contracts", params);
}
export default insurance;