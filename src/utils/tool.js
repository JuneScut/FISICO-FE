import moment from 'moment'
function findValue (list, key){
    let item = list.find(item => {
        return item.key === key
    })
    if(item){
        return item.value;
    } else {
        return '----';
    }
}
function formatTime(time){
    if(time){
        let date = moment(time);
        return date.format("YYYY/MM/DD HH:MM:SS");
    }else{
        return '----'
    }
    
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