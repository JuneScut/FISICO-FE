import React from 'react'
import styles from "./style.module.scss"
// import BasicLayout from '../../layouts/BasicLayout'

class Home extends React.Component{
    render(){
        return(
            <div className={styles.header}>
                <p>区块链供应链金融平台</p>
            </div>
        )
    }
}

export default Home;