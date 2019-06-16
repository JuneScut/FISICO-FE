import React from 'react';
import { Icon, Select, Row, Col } from 'antd';
const { Option } = Select;

class HeaderContent extends React.Component{
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle () {
        this.props.toggle(!this.props.collapsed)
    };

    render(){
        return(
            <Row>
                <Col span={12}>
                    <Icon
                        className="trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </Col>
                <Col span={12} align="right">
                    <Select style={{width: '120px'}} defaultValue="upstreamSupply">
                        <Option value="upstreamSupply">上游供应商</Option>
                        {/* <Option value="coreEnterpise">核心企业</Option>
                        <Option value="bank">银行</Option>
                        <Option value="insuranceCompany">保险公司</Option>
                        <Option value="transportation">运输企业</Option> */}
                    </Select>
                </Col>
            </Row>
        )
    }
}

export default HeaderContent;