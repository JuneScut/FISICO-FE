/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import "../../../common/style.scss"
import $supply from '../../../console/supply';
import $common from '../../../console/common';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
import { getEnterId } from '../../../utils/authority'

const {MonthPicker,RangePicker,WeekPicker}=DatePicker;
const { Option } = Select;
const { Search } = Input;


function onChange (date,dateString) {
    console.log(date,dateString)
}

class DisSupplier extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchParams: {
                transStatus: '',
                transContractId: 0,
                beginTime: 0,
                endTime: 0,
                goodsName: '',
                contractId: 0
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
                    title: '收货人',
                    dataIndex: 'receiver',
                    key: 'receiver',
                },
                {
                    title: '物流公司',
                    dataIndex: 'company',
                    key: 'company',
                },
                {
                    title: '物流合同签署时间',
                    dataIndex: 'signTime',
                    key: 'signTime',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                {
                    title: '物流合同状态',
                    dataIndex: 'contractStatus',
                    key: 'contractStatus',
                    render: (status) => (
                        <span>{findValue($supply.status, status)}</span>
                    )
                },
                {
                    title: '货物名称',
                    dataIndex: 'goodsName',
                    key: 'goodsName',
                },
                {
                    title: '货物数量（件）',
                    dataIndex: 'quantity',
                    key: 'quantity',
                },
                {
                    title: '物流费用（元）',
                    dataIndex: 'transCost',
                    key: 'transCost',
                },
                {
                    title: '出库时间',
                    dataIndex: 'outTime',
                    key: 'outTime',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                {
                    title: '是否购买货物保险',
                    dataIndex: 'ifInsurance',
                    key: 'ifInsurance',
                    render: (val) => {
                        if(val) {
                            return (
                                <span>是</span>
                            ) 
                        } else {
                            return(
                                <span>否</span>
                            )
                        }
                    }
                },
                {
                    title: '物流状态',
                    dataIndex: 'transStatus',
                    key: 'transStatus',
                    render: (status) => (
                        <span>{ findValue($supply.logisticStatus, status) }</span>
                    )
                },
                {
                    title: '签收时间',
                    dataIndex: 'receiveTime',
                    key: 'receiveTime',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                }
            ]
        }
    }
    async loadList() {
        let params = {
            enterpriseId: getEnterId()
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item]
            }
        }
        const res = await $common.logisticConsList(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item, idx) => {
                item.order = idx+1;
                item.key = item.id;
            });
            this.setState(() => ({
                list: list
            }));
        }
        
        // console.log(this.state.list)
    }
    handleIdChange = async(id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {contractId: id })
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    handleTransIdChange = async(id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {transContractId: id })
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    handleTimeChange = async(time) => {
        let searchParams = Object.assign({}, this.state.searchParams, {beginTime: time[0].valueOf(), endTime:time[1].valueOf() })
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    handleNameChange = async(name) => {
        let searchParams = Object.assign({}, this.state.searchParams, {goodsName: name })
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    handleStatusChange = async(status) => {
        let searchParams = Object.assign({}, this.state.searchParams, {transStatus: status })
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
                        <Form.Item label="物流状态">
                            <Select defaultValue="ALL" onChange={this.handleStatusChange}>
                                <Option value="ALL">不限</Option>
                                <Option value="ARRIVED">已送达</Option>
                                <Option value="INTRANSIT">运输中</Option>
                                <Option value="WAITDELIVERY">未发货</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="货物名称">
                            <Search
                                placeholder="请输入合同编号"
                                onSearch={this.handleNameChange}
                            />
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Search
                                placeholder="请输入合同编号"
                                onSearch={this.handleIdChange}
                            />
                        </Form.Item>
                        {/* <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.createExchange}>查询</Button>
                        </Form.Item> */}
                    </Form>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                </main>
            </Card>
        )
    }
}

export default DisSupplier;