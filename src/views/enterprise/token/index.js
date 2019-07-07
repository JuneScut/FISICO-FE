/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber } from 'antd';
import "../../../common/style.scss"
import { getEnterId } from '../../../utils/authority';
import $enterprise from '../../../console/enterprise';
import $common from '../../../console/common';
import { findValue, formatTime, setStateAsync } from '../../../utils/tool.js';

const { Option } = Select;

class TokenEnter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            balance: 0,
            searchParams: {
                contractId: 0,
                type: "ALL"
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '交易类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: type => (
                        <span>
                            {findValue($common.tradeType, type)}
                        </span>
                    )
                },
                {
                    title: '公司名称',
                    dataIndex: 'company',
                    key: 'company',
                },
                {
                    title: '支出/收入',
                    dataIndex: 'flow',
                    key: 'flow',
                    render: type => (
                        <span>
                            {findValue($common.tokenType, type)}
                        </span>
                    )
                },
                {
                    title: '交易金额(Token)',
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: '交易时间',
                    dataIndex: 'time',
                    key: 'time',
                    render: beginTime => (
                        <span>
                            { formatTime(beginTime) }
                        </span>
                    )
                }
            ]
        }
    }
    loadList =  async() => {
        let params = {
            role: 'E',
            id: getEnterId()
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
          }
        const res = await $common.tokenList(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item, idx) => {
                item.order = idx +  1;
                item.key = idx;
            })
            this.setState({list: list})
        }

    }
    getBalance = async () =>  {
        const res = await $common.getBalance();
        this.setState({balance: res.data.result});
    }
    handleTypeChange = (type) => {
        let searchParams = Object.assign({}, this.state.searchParams, {type: type})
        this.setState({searchParams})
    }
    handleIdChange =  (event)  => {
        let searchParams = Object.assign({}, this.state.searchParams, {contractId: event.currentTarget.value})
        this.setState({searchParams})
    }
    loadBankList = async () => {
        const res = await $common.bankList();
        this.setState({bankList: res.data.result});
    }
    componentWillMount(){
        this.loadList();
        this.getBalance();
    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            }
        };
        const buttonItemLayout = {
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 6}
            }
        };
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="交易类型">
                            <Select onChange={this.handleTypeChange} defaultValue="ALL"> 
                                <Option value="ALL">不限</Option>
                                <Option value="ORDER">订单</Option>
                                <Option value="REDEEM">银行赎回</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Input onChange={this.handleIdChange}></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.loadList}>查询</Button>
                        </Form.Item>
                    </Form>
                </header>

                <main>
                    <div style={{'float': 'right'}}>
                        <p>公司Token余额：{this.state.balance}</p>
                    </div>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                </main>
            </Card>
        )
    }
}

export default TokenEnter;