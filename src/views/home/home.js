import React from 'react'
import styles from "./style.module.scss"
// import BasicLayout from '../../layouts/BasicLayout'
import $common from '../../console/common';

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            balance: 0,
            supply: 0
        }
    }
    getBalance = async () =>  {
        const res = await $common.enterpriseList();
        this.setState({balance: res.data.result[0].money});
        this.setState({supply: res.data.result[0].supply});
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