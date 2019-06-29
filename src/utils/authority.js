const authority = "enterprise";
// enterprise 核心企业
// supplier 上游供应商

const roles = [
    { value: 'enterprise', title: '核心企业'},
    { value: 'supplier', title:'上游供应商'},
    { value: 'insuranceCompany', title: '保险公司'},
    { value: 'transportation', title:'运输企业'}
]
function enums(list, value){
    let item = list.find(item => item.value===value);
    if(item) return item.title;
    return null;
}
function getAuth(){
    return authority;
}

function hasAuth(authList){
    return authList.includes(getAuth());
}

export {
    getAuth,
    hasAuth,
    roles,
    enums
}