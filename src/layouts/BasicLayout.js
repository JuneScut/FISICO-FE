import React from 'react';
import { Layout } from 'antd';
import SideMenu from './SideMenu';
import { menuData, renderRoutesMap } from './SideMenu';
import HeaderContentWithRoute from './HeaderContent';
import { HashRouter } from "react-router-dom";
// import Home from '../views/home/home'
// import CreateContract from '../views/contracts/create';
// import ReceiveContract from '../views/contracts/receive';
// import InWarehouse from '../views/warehouse/in';
// import OutWarehouse from '../views/warehouse/out';
// import DistributionContract from '../views/distribution/contract';
// import InsuranceContract from '../views/insurance/contract';
// import TokenExchange from '../views/token/exchange';
// import TokenRedeem from '../views/token/redeem';
const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    toggle = (val) => {
        this.setState({collapsed: val})
    }

    componentDidMount(){
        console.log(this.props)
        let { history:{replace} } = this.props;
        replace('/#/home')
    }

    render(){
        return (
            <HashRouter>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} trigger={null}>
                        <div className="logo" />
                        <SideMenu></SideMenu>
                    </Sider>
                    <Layout>
                    <Header style={{ background: '#fff', padding: '10px' , width: '100%'}}>
                        <HeaderContentWithRoute collapsed={this.state.collapsed} toggle={this.toggle}></HeaderContentWithRoute>
                    </Header>
                    <Content style={{ margin: '10px', minHeight:'100vh' }}>
                        {/* {this.props.children} */}
                        {/* <Route path="/home" component={Home}/>
                        <Route path="/contract/create" component={CreateContract}/>
                        <Route path="/contract/receive" component={ReceiveContract}/>
                        <Route path="/inventory/out" component={OutWarehouse}/>
                        <Route path="/inventory/in" component={InWarehouse}/>
                        <Route path="/distribution/contract" component={DistributionContract}/>
                        <Route path="/insurance/contract" component={InsuranceContract}/>
                        <Route path="/token/exchange" component={TokenExchange}/>
                        <Route path="/token/redeem" component={TokenRedeem}/> */}
                        {renderRoutesMap(menuData)}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </HashRouter>
        )
    }
}

export default BasicLayout;

