import http from './api';

let enterprise = {};

// 测试用
enterprise.getData = function(data) {
    // return http({
    //     url: '/api/v1/category/list',
    //     method: 'get'
    // })
    return http.get('/category/list',data);
}

enterprise.contractList = function(params){
    return http.get("/contract/list", params);
}
enterprise.supplyList = function(params){
    return http.get("/supply/list", params);
}
enterprise.checkContract = function(params){
    return http.post("/contract/check", params);
}
enterprise.signContract = function(params){
    return http.post("/enterprise/contract/sign", params);
}
enterprise.goodsList = function(params){
    return http.get("/goods/list", params);
}
enterprise.goodsInList = function(params){
    return http.get("/enterprise/goods/inList", params)
}
enterprise.confirmIn = function(params){
    return http.post("/enterprise/goods/in", params)
}
enterprise.redeemToken = function(params){
    return http.post("/enterprise/token/redeem", params)
}
export default enterprise