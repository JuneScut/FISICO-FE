import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

class RouteGuard extends React.Component {
    componentWillMount(){
        // console.log(this.props)
        let { history:{replace}, auth } = this.props;
        if(!auth){
            replace('/home')
        }
        // 如果点击了当前页面则不应该跳转
        // this.state= {
            
        // }
    }
    render(){
        let component = this.props.component;
        const LoadableComponent = Loadable({
            loader: () => import(`../views/${component}`),
            loading: Loading
        })
        return (
            <LoadableComponent {...this.props} />
        )
    }
}

export default RouteGuard