/* eslint-disable no-unused-vars */
import React from 'react'
import './style.scss'
import {
    Route,
    NavLink,
    Link,
    HashRouter
  } from "react-router-dom";
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1245247_aiky2zm94qb.js',
});
const menuData = [
    {
        path: '/home',
        title: '首页',
        icon: 'iconhome'
    },{
        path: '/contract',
        title: '合同管理',
        icon: 'iconorder',
        children: [
            {
                path: '/contract/create',
                title: '发起合同'
            },
            {
                path: '/contract/receive',
                title: '接收合同'
            }
        ]
    },{
        path: '/inventory',
        title: '库存管理',
        icon: 'icongoods',
        children: [
            {
                path: '/inventory/out',
                title: '出库管理'
            },
            {
                path: '/inventory/in',
                title: '入库管理'
            }
        ]
    },{
        path: '/distribution',
        title: '物流管理',
        icon: 'iconcar',
        children: [
            {
                path: '/distribution/contract',
                title: '物流合同'
            }
        ]
    },{
        path: '/insurance',
        title: '保单管理',
        icon: 'iconcheck',
        children: [
            {
                path: '/insurance/contract',
                title: '签署货物保险'
            }
        ]
    },
    {
        path: '/token',
        title: 'Token管理',
        icon: 'icontoken'
    }
]


class SideMenu extends React.Component{
    menuList(menuInfo) {
        let menu = [];
        for(let item of menuInfo){
            if(!item.children){
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
            }else{
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
        return menu;
    }
    
    render(){
        return(
            <Menu theme="dark"  mode="inline"  defaultSelectedKeys={['/home']}>
                {this.menuList(menuData)}
            </Menu>
        )
    }
}

export default SideMenu;