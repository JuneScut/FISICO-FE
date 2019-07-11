// let authority = "retailer";
// enterprise 核心企业
// supplier 上游供应商
// bank 银行
// insuranceCompany 保险公司
// transportation 运输企业
// retailer 下游分销商
const roles = [
    { value: 'enterprise', title: '核心企业'},
    { value: 'supplier', title:'上游供应商'},
    { value: 'bank', title:'银行'},
    { value: 'insuranceCompany', title: '保险公司'},
    { value: 'transportation', title:'运输企业'},
    { value: 'retailer', title:'下游分销商'},
];
function getUser(role){
    switch(role){
        case "enterprise":
            return {id:1,name:'核心企业'}
        case "supplier":
            return {id:2,name:'供应商'}
        case "bank":
            return {id:3,name:'银行'}
        case "insuranceCompany":
            return {id:4,name:'保险公司'}
        case "retailer":
            return {id:8,name:'下游分销商'}
        case "transportation":
            return {id:6,name:'物流公司'}
        default:
            return {}
    }
}
// function setAuth(auth){
//     authority = auth;
//     console.log(getAuth())
// }
function getUserName(id){
    switch(id){
        case 1:
            return '核心企业'
        case 2:
            return '供应商'
        case 3:
            return '银行'
        case 4:
            return '保险公司'
        case 8:
            return '下游分销商'
        case 6:
            return '物流公司'
        default:
            return ''
    }
}
function enums(list, value){
    let item = list.find(item => item.value===value);
    if(item) return item.title;
    return null;
}
function getAuth(){
    // return authority;
    return window.localStorage.getItem('role')
}

function hasAuth(authList){
    return authList.includes(getAuth());
}

function getId(){
    return 1;
}
function getEnterId(){
    return 2;
}
function getTransId(){
    return 3;
}
function getInsuranceId(){
    return 4;
}
function getBankId(){
    return 3;
}
export {
    getAuth,
    hasAuth,
    roles,
    enums,
    getId,
    getEnterId,
    getTransId,
    getInsuranceId,
    getBankId,
    getUser,
    getUserName,
    // setAuth
}