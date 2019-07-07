import http from './api';

let common = {};

common.logisticStatus = [
    { key: 'INTRANSIT', value:'运输中'},
    { key: 'ARRIVED', value: '已送达'},
    { key: 'WAITDELIVERY', value:'待发货'},
    { key: 'WAITCOLLECT', value:'待揽件'},    
]
common.status = [
    { key: 'CREATED', value:'已发起'},
    { key: 'SIGNED', value: '已签署'}
]

common.supplyList = function(params){
    return http.get("/supply/list", params);
}
common.tokenList = function(params){
    return http.get("/token/record", params);
}
export default common;