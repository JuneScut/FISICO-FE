const authority = "supplier";
// enterprise 核心企业
// supplier 上游供应商
function getAuth(){
    return authority;
}

function hasAuth(authList){
    return authList.includes(getAuth());
}

export {
    getAuth,
    hasAuth
}