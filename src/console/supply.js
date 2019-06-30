import http from './api';

let supply = {};

supply.status = [
    { key: 'CREATED', value:'已发起'}
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


export default supply;