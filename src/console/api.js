import axios from 'axios';
import qs from 'qs'

axios.defaults.baseURL = '';

let http = {
    post: "",
    get: ""
}

http.post = function(api, data) {
    let params = qs.stringify(data);
    return axios.post(api, params).then((res) => {
        return res;
    })
}
http.get = function(api, data) {
    let query = {params: data}
    return axios.get(api, query).then((res) => {
        return res;
    })
}
http.form = function(api, data){
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    return axios.post(api,data,config).then((res)=>{
        return res;
    })
}
http.mock = function(api, data){
    return new Promise((resolve)=>{
        let resp = {
            success: true,
            data: data
        }
        resolve(resp)
    })
}
export default http;