/* eslint-disable no-unused-vars */
import React from 'react'
import './style.scss'
import {
    Route,
    NavLink
} from "react-router-dom";
import RouteGuard from '../utils/RouteGuard';
import { Menu, Icon } from 'antd';
import { getAuth,hasAuth } from '../utils/authority';
import { withRouter } from 'react-router';
const { SubMenu } = Menu;

const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1245247_aiky2zm94qb.js',
});
const menuData = [
    {
        path: '/home',
        title: '首页',
        icon: 'iconhome',
        authority: ['supplier', 'enterprise', 'bank','insuranceCompany', 'transportation'],
        component: 'home/home'
    },{
        path: '/contract',
        title: '合同管理',
        icon: 'iconorder',
        authority: ['supplier', 'enterprise','insuranceCompany', 'transportation'],
        children: [
            {
                path: '/contract/contract_supplier',
                title: '合同管理',
                authority: ['supplier'],
                component: 'contracts/contract_supplier'
            },
            {
                path: '/contract/create',
                title: '发起合同',
                authority: ['supplier'],
                component: 'contracts/create'
            },
            {
                path: '/contract/contract_enterprise',
                title: '合同管理',
                authority: ['enterprise'],
                component: 'contracts/contract_enterprise'
            },
            {
                path: '/contract/receive',
                title: '接收合同',
                authority: ['enterprise'],
                component: 'contracts/receive'
            },
            {
                path: '/contract/contract_insurance',
                title: '合同管理',
                authority: ['insuranceCompany'],
                component: 'contracts/contract_insurance'
            },
            {
                path: '/contract/create_insurance',
                title: '发起合同',
                authority: ['insuranceCompany'],
                component: 'contracts/create_insurance'
            },
            {
                path: '/contract/contract_distribution',
                title: '合同管理',
                authority: ['transportation'],
                component: 'contracts/contract_distribution'
            },
            {
                path: '/contract/creat_distribution',
                title: '发起合同',
                authority: ['transportation'],
                component: 'contracts/create_distribution'
            }
        ]
    },{
        path: '/inventory',
        title: '库存管理',
        icon: 'icongoods',
        authority: ['supplier', 'enterprise'],
        children: [
            {
                path: '/inventory/warehouse_supplier',
                title: '库存管理',
                authority: ['supplier'],
                component: 'warehouse/warehouse_supplier'
            },
            {
                path: '/inventory/out',
                title: '出库管理',
                authority: ['supplier'],
                component: 'warehouse/out'
            },
            {
                path: '/inventory/warehouse_enterprise',
                title: '库存管理',
                authority: ['enterprise'],
                component: 'warehouse/warehouse_enterprise'
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
        authority: ['supplier', 'enterprise','transportation'],
        children: [
            {
                path: '/distribution/distribution_supplier',
                title: '物流管理',
                authority: ['supplier'],
                component: 'distribution/distribution_supplier'
            },
            {
                path: '/distribution/contract',
                title: '签署物流合同',
                authority: ['supplier'],
                component: 'distribution/contract'
            },
            {
                path: '/distribution/distribution_enterprise',
                title: '物流管理',
                authority: ['enterprise'],
                component: 'distribution/distribution_enterprise'
            },
            {
                path: '/distribution/distribution_transporation',
                title: '物流管理',
                authority: ['transportation'],
                component: 'distribution/distribution_transporation'
            },
            {
                path: '/distribution/distribution_transporation',
                title: '揽收货物',
                authority: ['transportation'],
                component: 'distribution/distribution_transporation'
            }
        ]
    },{
        path: '/insurance',
        title: '保单管理',
        icon: 'iconcheck',
        authority: ['supplier'],
        children: [
            {
                path: '/insurance/insurance_supplier',
                title: '保单管理',
                authority: ['supplier'],
                component: 'insurance/insurance_supplier'
            },
            {
                path: '/insurance/contract',
                title: '签署货物保险',
                authority: ['supplier'],
                component: 'insurance/contract'
            }
        ]
    },
    {
        path: '/insurance',
        title: '保险标管理',
        icon: 'iconcheck',  //要改图标
        authority: ['insuranceCompany'],
        children: [
            {
                path: '/insurance/subject',
                title: '保险标管理',
                authority: ['insuranceCompany'],
                component: 'insurance/subject'
            },
        ]
    },
    {
        path: '/token',
        title: 'Token管理',
        icon: 'icontoken',
        authority: ['supplier','enterprise', 'bank','insuranceCompany', 'transportation'],
        children: [
            {
                path: '/token/token_supplier',
                title: 'token管理',
                authority: ['supplier'],
                component: 'token/token_supplier'
            },
            {
                path: '/token/token_insurance',
                title: 'token管理',
                authority: ['insuranceCompany'],
                component: 'token/token_insurance'
            },
            {
                path: '/token/exchange',
                title: 'token兑换',
                authority: ['supplier','insuranceCompany', 'transportation'],
                component: 'token/exchange'
            },
            {
                path: '/token/token_enterprise',
                title: 'token管理',
                authority: ['enterprise'],
                component: 'token/token_enterprise'
            },
            {
                path: '/token/redeem',
                title: 'token赎回',
                authority: ['enterprise'],
                component: 'token/redeem'
            },
            {
                path: '/token/index',
                title: '管理页',
                authority: ['bank'],
                component: 'token/log'
            },

        ]
    },
    {
        path: '/credit',
        title: '授信管理',
        icon: 'icontoken',
        authority: ['bank'],
        component: 'credit/extension'
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
        // console.log('111', this.props)
        return(
            <Menu theme="dark"  mode="inline" defaultSelectedKeys={['/home']} selectedKeys={[`${this.props.location.pathname}`]}>
                {this.menuList(menuData)}
            </Menu>
        )
    }
}
const SideMenuWithRouter = withRouter(SideMenu);

export { menuData, renderRoutesMap };
export default SideMenuWithRouter;