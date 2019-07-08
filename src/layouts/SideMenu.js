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
        authority: ['supplier', 'enterprise', 'bank', 'insuranceCompany', 'transportation'],
        component: 'home/home'
    },{
        path: '/contract',
        title: '合同管理',
        icon: 'iconorder',
        authority: ['supplier', 'enterprise','insuranceCompany', 'transportation'],
        children: [
            {
                path: '/supply/contract/index',
                title: '合同查询',
                authority: ['supplier'],
                component: 'supply/contract/index'
            },
            {
                path: '/supply/contract/create',
                title: '发起合同',
                authority: ['supplier'],
                component: 'supply/contract/create'
            },
            // {
            //     path: '/enterprise/contract/index',
            //     title: '合同管理',
            //     authority: ['enterprise'],
            //     component: 'enterprise/contract/index'
            // },
            {
                path: '/enterprise/contract/receive',
                title: '接收合同',
                authority: ['enterprise'],
                component: 'enterprise/contract/receive'
            },
            {
                path: '/insurance/contract/index',
                title: '合同管理',
                authority: ['insuranceCompany'],
                component: 'insurance/contract/index'
             },
            {
                path: '/insurance/contract/create',
                title: '发起合同',
                authority: ['insuranceCompany'],
                component: 'insurance/contract/create'
            },
            {
                path: '/transportation/contract/index',
                title: '合同管理',
                authority: ['transportation'],
                component: 'transportation/contract/index'
            },
            {
                path: '/transportation/contract/create',
                title: '发起合同',
                authority: ['transportation'],
                component: 'transportation/contract/create'
            },
        ]
    },{
        path: '/inventory',
        title: '库存管理',
        icon: 'icongoods',
        authority: ['supplier', 'enterprise'],
        children: [
            {
                path: '/supply/inventory/index',
                title: '库存管理',
                authority: ['supplier'],
                component: 'supply/warehouse/index'
            },
            {
                path: '/supply/inventory/out',
                title: '出库记录',
                authority: ['supplier'],
                component: 'supply/warehouse/out'
            },
            {
                path: '/enterprise/inventory/index',
                title: '库存管理',
                authority: ['enterprise'],
                component: 'enterprise/warehouse/index'
            },
            {
                path: '/enterprise/inventory/in',
                title: '入库管理',
                authority: ['enterprise'],
                component: 'enterprise/warehouse/in'
            }
        ]
    },{
        path: '/distribution',
        title: '物流管理',
        icon: 'iconcar',
        authority: ['supplier', 'enterprise','transportation'],
        children: [
            {
                path: '/supply/distribution/index',
                title: '物流管理',
                authority: ['supplier'],
                component: 'supply/distribution/index'
            },
            {
                path: '/supply/distribution/contract',
                title: '签署物流合同',
                authority: ['supplier'],
                component: 'supply/distribution/contract'
            },
            {
                path: '/enterprise/distribution/index',
                title: '物流管理',
                authority: ['enterprise'],
                component: 'enterprise/distribution/index'
            },
            {
                 path: '/transportation/distribution/index',
                 title: '物流管理',
                 authority: ['transportation'],
                 component: 'transportation/distribution/index'
             },
            {
                path: '/transportation/distribution/collect',
                title: '揽收货物',
                authority: ['transportation'],
                component: 'transportation/distribution/collect'
            }
        ]
    },{
        path: '/insurance',
        title: '保单管理',
        icon: 'iconcheck',
        authority: ['supplier','transportation'],
        children: [
            {
                path: '/supply/insurance/index',
                title: '保单管理',
                authority: ['supplier'],
                component: 'supply/insurance/index'
            },
            {
                path: '/supply/insurance/contract',
                title: '签署货物保险',
                authority: ['supplier'],
                component: 'supply/insurance/contract'
            },
            {
                path: '/transportation/insurance/index',
                title: '保单管理',
                authority: ['transportation'],
                component: 'transportation/insurance/index'
            },
            {
                path: '/transportation/insurance/contract',
                title: '签署物流保险',
                authority: ['transportation'],
                component: 'transportation/insurance/contract'
            }
        ]
    },
    {
        path: '/insuranceMrk',
        title: '保险标管理',
        icon: 'icontoken',
        authority: ['insuranceCompany'],
        component: 'insurance/subject'
    },
    {
        path: '/token',
        title: 'Token管理',
        icon: 'icontoken',
        authority: ['supplier','enterprise', 'bank','insuranceCompany', 'transportation'],
        children: [
            {
                path: '/supply/token/index',
                title: 'token管理',
                authority: ['supplier'],
                component: 'supply/token/index'
            },
            {
                path: '/token/exchange',
                title: 'token兑换',
                authority: ['supplier'],
                component: 'supply/token/exchange'
            },
            {
                path: '/insurance/token/exchange',
                title: 'token兑换',
                authority: ['insuranceCompany'],
                component: 'insurance/token/exchange'
            },
            {
                path: '/transportation/token/exchange',
                title: 'token兑换',
                authority: ['transportation'],
                component: 'transportation/token/exchange'
            },
            {
                path: '/enterprise/token/index',
                title: 'token管理',
                authority: ['enterprise'],
                component: 'enterprise/token/index'
            },
            {
                path: '/enterprise/token/redeem',
                title: 'token赎回',
                authority: ['enterprise'],
                component: 'enterprise/token/redeem'
            },
            {
                path: '/bank/token/index',
                title: 'token管理',
                authority: ['bank'],
                component: 'bank/token/operate'
            },
            {
                path: '/bank/token/log',
                title: '历史记录',
                authority: ['bank'],
                component: 'bank/token/log'
            },
            {
                path: '/insurance/token/index',
                title: 'token管理',
                authority: ['insuranceCompany'],
                component: 'insurance/token/index'
            },
            {
                path: '/transportation/token/index',
                title: 'token管理',
                authority: [ 'transportation'],
                component: 'transportation/token/index'
            }
        ]
    },
    {
        path: '/credit',
        title: '授信管理',
        icon: 'icontoken',
        authority: ['bank'],
        component: 'bank/credit/extension'
    },
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