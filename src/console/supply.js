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
    { key: 'BANK', value: '银行兑付'}
]
supply.tokenRecordStatus = [
    { key: 'SUCCESS', value:'成功'},
    { key: 'AUDIT', value: '审核中'},
    { key: 'FAIL', value:'失败'}
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
    return http.get('/supply/goods/list');
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
    return http.get('/supply/token/list', params);
}

supply.getBalance = function(params){
    return http.get('/balance/query', params);    
}

supply.getAssets = function(params){
    return http.get('/assets/query', params);
}

supply.tokenExchangeRecord = function(params){
    return http.get('/supply/token/bankrecord', params);
}

supply.bankList = function(){
    return http.get('/bank/list')
}

supply.createExchange = function(params){
    return http.post('/token/exchange/create', params)
}

export default supply;