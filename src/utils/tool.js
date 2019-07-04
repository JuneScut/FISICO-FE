function findValue (list, key){
    let item = list.find(item => {
        return item.key === key
    })
    if(item){
        return item.value;
    } else {
        return null;
    }
}
function formatTime(time){
    let date = new Date(time);
    let res = date.getFullYear()+'年'+(date.getMonth()+1) +'月'+date.getDate()+ '日  '+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
    return res;
}

function setStateAsync(self, nextState){
    return new Promise(resolve => {
        self.setState(nextState, resolve);
    })
}

export {
    findValue,
    formatTime,
    setStateAsync
}