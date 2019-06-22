import React from 'react';
import { Icon, Row, Col } from 'antd';
import { roles, enums, getAuth } from '../utils/authority';
import './style.scss'
import { withRouter } from "react-router";

class HeaderContent extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle () {
        this.props.toggle(!this.props.collapsed)
    };

    render(){
        console.log('header', this.props.location)
        return(
            <Row>
                <Col span={12}>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <span style={{marginLeft: '10px'}}>{this.props.location.pathname}</span>
                </Col>
                <Col span={12} align="right">
                    <Icon type="user" />
                    <span>{ enums(roles, getAuth()) }</span>
                    <Icon type="logout" style={{ marginLeft: '10px', cursor: 'pointer'}} />
                </Col>
            </Row>
        )
    }
}

const HeaderContentWithRoute = withRouter(HeaderContent)
export default HeaderContentWithRoute;