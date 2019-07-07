import http from './api';

let bank = {};
bank.status = [
    {key: "EXCHANGE", value: "兑换"},
    {key: "REDEEM", value: "赎回"}
]
bank.result = [
    {key: "SUCCESS", value: "通过"},
    {key: "AUDIT", value: "审核中"},
    {key: "FAIL", value: "驳回"}
]
bank.auditToken = function(params){
    return http.post('/token/audit', params)
}
bank.creditList = function(params){
    return http.get("/bank/credit/list", params)
}
bank.tokenHistory = function(params){
    return http.get('/token/history', params)
}
export default bank;