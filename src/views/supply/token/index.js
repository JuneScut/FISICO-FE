import React from 'react'
import { Card, Form, Select, Input, Table } from 'antd';
// import './style.scss';
// import $enterprise from '../../console/enterprise';
import "../../../common/style.scss"
import $supply from '../../../console/supply';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
import { getId } from '../../../utils/authority'
const { Option } = Select;
const { Search } = Input;


class TokenSupplier extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchParams: {
                contractId: '',
                type: ''
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
                        <span>{ findValue($supply.tradeType, type) }</span>
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
                    render: flow => (
                        <span>{ findValue($supply.flowType, flow) }</span>
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
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                }
            ]
        }
    }
    async loadList() {
        let params = {
            supplyId: getId()
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item]
            }
        }
        const res = await $supply.tokenList(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
        });
        this.setState(() => ({
            list: list
        }));
        console.log(this.state.list)
    }
    handleIdChange = async(id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {contractId: id })
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    handleTypeChange = async(type) => {
        let searchParams = Object.assign({}, this.state.searchParams, {type: type })
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    componentWillMount(){
        this.loadList();
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
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="交易类型">
                            <Select onChange={this.handleTypeChange}>
                                <Option value="ALL">不限</Option>
                                <Option value="ORDER">订单</Option>
                                <Option value="TRANS">物流</Option>
                                <Option value="INSURE">保险</Option>
                                <Option value="BANK">银行兑付</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Search
                                placeholder="请输入合同编号"
                                onSearch={this.handleIdChange}
                                style={{ width: 200 }}
                            />
                        </Form.Item>
                    </Form>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                </main>
            </Card>
        )
    }
}

export default TokenSupplier;