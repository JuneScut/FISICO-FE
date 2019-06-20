/* eslint-disable no-unused-vars */
import React from 'react'
import './style.scss'
import {
    Route,
    NavLink
} from "react-router-dom";
import RouteGuard from '../utils/RouteGuard';
import { Menu, Icon } from 'antd';
import { getAuth,hasAuth } from '../utils/authority'
const { SubMenu } = Menu;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1245247_aiky2zm94qb.js',
});
const menuData = [
    {
        path: '/home',
        title: '首页',
        icon: 'iconhome',
        authority: ['supplier', 'enterprise'],
        component: 'home/home'
    },{
        path: '/contract',
        title: '合同管理',
        icon: 'iconorder',
        authority: ['supplier', 'enterprise'],
        children: [
            {
                path: '/contract/create',
                title: '发起合同',
                authority: ['supplier'],
                component: 'contracts/create'
            },
            {
                path: '/contract/receive',
                title: '接收合同',
                authority: ['enterprise'],
                component: 'contracts/receive'
            }
        ]
    },{
        path: '/inventory',
        title: '库存管理',
        icon: 'icongoods',
        authority: ['supplier', 'enterprise'],
        children: [
            {
                path: '/inventory/out',
                title: '出库管理',
                authority: ['supplier'],
                component: 'warehouse/out'
            },
            {
                path: '/inventory/in',
                title: '入库管理',
                authority: ['enterprise'],
                component: 'warehouse/in'
            }
        ]
    },{
        path: '/distribution',
        title: '物流管理',
        icon: 'iconcar',
        authority: ['supplier', 'enterprise'],
        children: [
            {
                path: '/distribution/contract',
                title: '签署物流合同',
                authority: ['supplier', 'enterprise'],
                component: 'distribution/contract'
            }
        ]
    },{
        path: '/insurance',
        title: '保单管理',
        icon: 'iconcheck',
        authority: ['supplier'],
        children: [
            {
                path: '/insurance/contract',
                title: '签署货物保险',
                authority: ['supplier'],
                component: 'insurance/contract'
            }
        ]
    },
    {
        path: '/token',
        title: 'Token管理',
        icon: 'icontoken',
        authority: ['supplier','enterprise'],
        children: [
            {
                path: '/token/exchange',
                title: 'token兑换',
                authority: ['supplier'],
                component: 'token/exchange'
            },
            {
                path: '/token/redeem',
                title: 'token赎回',
                authority: ['enterprise'],
                component: 'token/redeem'
            }
        ]
    }
]
const renderRoutesMap = (routes) => {
    let list = [];
    // eslint-disable-next-line array-callback-return
    routes.map((route, index) => {
        if(!route.children && route.component){
            // list.push(<Route key={route.path} path={route.path} component={route.component}></Route>)
            list.push(<Route key={route.path} path={route.path} render={props => (
                <RouteGuard {...route} {...props} auth={hasAuth(route.authority)}/>
            )}></Route>)
        } else if(route.children){
            list.push(...renderRoutesMap(route.children))
        }
    })
    return list;
}


class SideMenu extends React.Component{
    menuList(menuInfo) {
        let menu = [];
        for(let item of menuInfo){
            if(hasAuth(item.authority)){
                if(!item.children){
                    // console.log(item.title, item.authority)
                    // console.log(hasAuth(item.authority))
                    menu.push(
                        item.icon ?
                        <Menu.Item key={item.path}>
                            <NavLink to={item.path} replace={true}>
                                <IconFont type={item.icon} style={{fontSize: '16px', color: '#08c'}}/>
                                <span>{item.title}</span>
                            </NavLink>
                        </Menu.Item> :
                        <Menu.Item key={item.path}>
                            <NavLink to={item.path} replace={true}>
                                <span>{item.title}</span>
                            </NavLink>
                        </Menu.Item>
                    )                
                }else {
                    menu.push(
                        item.icon ?
                        <SubMenu 
                            title={
                                <span>
                                    <IconFont type={item.icon}></IconFont>
                                    <span>{item.title}</span>
                                </span>
                            } 
                            key={item.path}
                        >
                            {this.menuList(item.children)}
                        </SubMenu> :
                        <SubMenu 
                            title={<span>{item.title}</span>} 
                            key={item.path}
                        >
                            {this.menuList(item.children)}
                        </SubMenu>
                    )
                }
            }
        }
        return menu;
    }
    render(){
        return(
            <Menu theme="dark"  mode="inline" defaultSelectedKeys={['/home']} selectedKeys={[`${window.location.hash.substr(1)}`]}>
                {this.menuList(menuData)}
            </Menu>
        )
    }
}
export { menuData, renderRoutesMap };
export default SideMenu;