import React from 'react'
import styles from "./style.module.scss"
// import BasicLayout from '../../layouts/BasicLayout'
import $common from '../../console/common';
import {getAuth} from '../../utils/authority'

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            balance: 0,
            supply: 0
        }
    }
    getBalance = async () =>  {
        let res;
        switch(getAuth()){
            case "enterprise":
                res = await $common.enterpriseList();
                break;
            case "supplier":
                res = await $common.supplyList();
                break;
            case "bank":
                res = await $common.bankList();
                break;
            case "insuranceCompany":
                res = await $common.insenterpriseList();
                break;
            case "retailer":
                res = await $common.retailerList();
                break;
            case "transportation":
                res = await $common.logenterpriseList();
                break;
            default:
                return null;
        }
        if(res){
            this.setState({balance: res.data.result[0].money});
            this.setState({supply: res.data.result[0].supply});
        }
    }
    componentWillMount = () => {
        this.getBalance()
    }
    render(){
        let supply;
        if(this.state.supply){
            supply = <div>库存量：{this.state.supply}</div>
        }
        return(
            <div className={styles.wrapper}>
                    <p className={styles.header}>区块链供应链金融平台</p>
                    <div className={styles.center}>
                        <div>公司余额：{this.state.balance}</div>
                        {supply}
                    </div>
            </div>
        )
    }
}

export default Home;