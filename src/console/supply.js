import http from './api';

let supply = {};

supply.status = [
    { key: 'CREATED', value:'已发起'},
    { key: 'SIGNED', value: '已签署'}
]
supply.warehouseStatus = [
    { key: 'OUT', value:'已出库'},
    { key: 'NOTOUT', value: '未出库'}
]
supply.flowType = [
    { key: 'PAY', value: '支付'},
    { key: 'RECEIVE', value: '收入'}
]
supply.tradeType = [
    { key: 'ALL', value:'不限'},
    { key: 'ORDER', value: '订单'},
    { key: 'TRANS', value:'物流'},
    { key: 'INSURE', value: '保险'},
    { key: 'EXCHANGE', value: '银行兑付'},
    { key: "REDEEM", value: "银行赎回"}
]
supply.tokenRecordStatus = [
    { key: 'SUCCESS', value:'成功'},
    { key: 'AUDIT', value: '审核中'},
    { key: 'FAIL', value:'失败'}
]
supply.logisticStatus = [
    { key: 'INTRANSIT', value:'运输中'},
    { key: 'ARRIVED', value: '已送达'},
    { key: 'WAITDELIVERY', value:'待发货'},
    { key: 'WAITCOLLECT', value:'待揽件'},    
]
supply.insuranceStatus = [
    { key: 'ACTIVE', value:'已生效'},
    { key: 'EXPIRED', value:'已过期'},
    { key: 'NOACTIVE', value:'未生效'}
]
supply.contractList = function(params){
    // let data = [
    //     {
    //         order: 123,
    //         beginTime: 1561398437000,
    //         name: '零度可乐',
    //         supply: 1000,
    //         signtory: 'Ellila',
    //         signalTime: 1561398437000,
    //         status: 'ACTIVE'
    //     }
    // ];
    // return http.mock('/contract/list', data)
    return http.get('/contract/list', params);
}

supply.enterpriseList = function(){
    return http.get('/enterprise/list');
}

supply.goodsList = function(){
    return http.get('/goods/list');
}
supply.createContract = function(data){
    return http.post('/supply/contract/create', data);
}

supply.outRecord = function(params){
    return http.get('/supply/goods/outList', params);
}

supply.outGoods = function(params){
    return http.post('/supply/goods/out', params);
}

supply.tokenList = function(params){
    return http.get('/token/list', params);
}

supply.getBalance = function(params){
    return http.get('/balance/query', params);    
}

supply.getAssets = function(params){
    return http.get('/assets/query', params);
}

supply.tokenExchangeRecord = function(params){
    return http.get('/token/record', params);
}

supply.bankList = function(){
    return http.get('/bank/list')
}
supply.insureCompanyList = function(){
    return http.get('/insuranceCompany/list')
}
supply.transportationList = function(){
    return http.get('/transportation/list')
}

supply.createExchange = function(params){
    return http.post('/token/exchange/create', params);
}
// supply.logisticContractList = function(params){
//     return http.get('/logistics/list', params);
// }
supply.allLogisticConsList = function(params){
    return http.get('/logistics/contracts', params);
}
supply.insuranceContractList = function(params){
    return http.get('/supply/insurance/list', params);
}
supply.allInsueConsList = function(params){
    return http.get('/supply/insurance/contracts', params);
}
supply.signTransContract = function(params){
    return http.post('/supply/trans_contract/sign', params);
}
supply.signInsureContract = function(params){
    return http.post('/supply/insurance/sign', params);
}
export default supply;