import React from 'react';
import { Layout } from 'antd';
import SideMenuWithRouter from './SideMenu';
import { menuData, renderRoutesMap } from './SideMenu';
import HeaderContentWithRoute from './HeaderContent';
import { HashRouter } from "react-router-dom";
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
                        <SideMenuWithRouter></SideMenuWithRouter>
                    </Sider>
                    <Layout>
                    <Header style={{ background: '#fff', padding: '10px' , width: '100%'}}>
                        <HeaderContentWithRoute collapsed={this.state.collapsed} toggle={this.toggle}></HeaderContentWithRoute>
                    </Header>
                    <Content style={{ margin: '10px', minHeight:'100vh' }}>
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

