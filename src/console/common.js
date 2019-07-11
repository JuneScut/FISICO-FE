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
common.tokenRecordStatus = [
    { key: 'SUCCESS', value:'成功'},
    { key: 'AUDIT', value: '审核中'},
    { key: 'FAIL', value:'失败'}
]
common.tokenType = [
    { key: 'PAY', value:'支出'},
    { key: 'RECEIVE', value: '收入'}
]
common.insuranceStatus = [
    { key: 'ACTIVE', value:'已生效'},
    { key: 'EXPIRED', value:'已过期'},
    { key: 'NOACTIVE', value:'未生效'}
]
common.supplyList = async function(params){
    let resp = await http.get('/enterprise/list');
    let result = []
    if(resp.data.success){
        result = resp.data.result.find(item=>item.id===2);
    }
    let res = {
        data: {
            success: true,
            result: [result]
        }
    }
    return res;
}
//获取企业信息
common.enterpriseList = async function(params){
    let resp = await http.get('/enterprise/list');
    let result = []
    if(resp.data.success){
        result = resp.data.result.find(item=>item.id===1);
    }
    let res = {
        data: {
            success: true,
            result: [result]
        }
    }
    return res;
}
common.retailerList = async function(params){
    let resp = await http.get('/enterprise/list');
    let result = []
    if(resp.data.success){
        result = resp.data.result.find(item=>item.id===8);
    }
    let res = {
        data: {
            success: true,
            result: [result]
        }
    }
    return res;
}
common.bankList = function(params){
    return http.get('/bank/list', params);
}
common.insenterprise = function(params){
    return http.get('/insenterprise/list', params);
}
common.logenterpriseList = function(params){
    return http.get('/logenterprise/list', params);
}
common.insenterpriseList = function(params){
    return http.get('/insenterprise/list', params);
}

// 创建合同
common.createLogisticContract = function(params){
    return http.form('/logistic/create', params);
}
common.createTransferContract = function(params){
    return http.form('/transfer/create', params);
}
common.createExchangeContrct = function(params){
    return http.form('/exchange/create', params);
}

// 获取合同列表
common.getContractsList = function(params){
    return http.get('/contract/list', params);
}
common.logisticConsList = function(params){
    return http.get('/logistic/list', params);
}
common.insureConsList = function(params){
    return http.get('/insurance/list',params);
}
common.transferList = function(params){
    return http.get('/transfer/list', params);
}
common.exchangeList = function(params){
    return http.get('/exchange/list', params);
}


// 检查合同
common.checkLogisicContract = function(params){
    return http.form("/logistic/check", params);
}
common.checkInsuranceContract = function(params){
    return http.form("/insurance/check", params);
}
common.checkContract = function(params){
    return http.form("/contract/check", params);
}
common.checkTransferContract = function(params){
    return http.form("/transfer/check", params);
}
common.checkExchangeContract = function(params){
    return http.form("/exchange/check", params);
}

// 签署合同
common.signContract = function(params){
    return http.get("/contract/sign", params);
}
common.signLogisticContract = function(params){
    return http.get("/logistic/sign", params);
}
common.signInsuranceContract = function(params){
    return http.get("/insurance/sign", params);
}
common.signTransferContract = function(params){
    return http.get('/transfer/sign', params);
}
common.signExchangeContract = function(params){
    return http.get('/exchange/sign', params);
}

common.goodsList = function(){
    return http.mock('api', {
        id: 1,
        name: 'goods'
    })
}
export default common;