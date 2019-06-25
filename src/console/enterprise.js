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
export default enterprise