import React from 'react';
import { Layout } from 'antd';
import SideMenu from './SideMenu';
import HeaderContent from './HeaderContent';

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

    render(){
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} trigger={null}>
                    <div className="logo" />
                    <SideMenu></SideMenu>
                </Sider>
                <Layout>
                <Header style={{ background: '#fff', padding: '10px' , width: '100%'}}>
                    <HeaderContent collapsed={this.state.collapsed} toggle={this.toggle}></HeaderContent>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    内容区域
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout;

