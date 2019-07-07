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
common.tradeType = [
    { key: 'ORDER', value: '订单'},
    { key: 'TRANS', value:'物流'},
    { key: 'INSURE', value: '保险'},
    { key: 'EXCHANGE', value: '银行兑付'},
    { key: "REDEEM", value: "银行赎回"}
]
common.tokenType = [
    { key: 'PAY', value:'支出'},
    { key: 'RECEIVE', value: '收入'}
]
common.supplyList = function(params){
    return http.get("/supply/list", params);
}
common.bankList = function(params){
    return http.get('/bank/list', params);
}
common.tokenList = function(params){
    return http.get("/token/record", params);
}
common.getBalance = function(params){
    return http.get('/balance/query', params);    
}

common.getAssets = function(params){
    return http.get('/assets/query', params);
}
common.getCredit = function(params){
    return http.get('/credit/query', params);
}
common.tokenList = function(params){
    return http.get('/token/list', params);
}
export default common;