import http from './api';

let contract = {};

contract.list = function(params){
    let data = [
        {
            order: 123,
            beginTime: 1561398437000,
            name: '零度可乐',
            supply: 1000,
            signtory: 'Ellila',
            signalTime: 1561398437000,
            status: 'ACTIVE'
        }
    ];

    return http.mock('/contract/list', data)
}

export default contract;