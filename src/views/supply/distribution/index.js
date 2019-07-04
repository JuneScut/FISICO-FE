/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import "../../../common/style.scss"
import $supply from '../../../console/supply';
import { formatTime, findValue } from '../../../utils/tool.js';
import { getId } from '../../../utils/authority'

const {MonthPicker,RangrPicker,WeekPicker}=DatePicker;
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
                    title: '物流合同编号',
                    dataIndex: 'transContractId',
                    key: 'transContractId',
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
            supplyId: getId()
        }
        const res = await $supply.logisticContractList(params);
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
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">已送达</Option>
                                <Option value="test3">运输中</Option>
                                <Option value="test4">未发货</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="物流合同编号">
                            <Search
                                placeholder="请输入物流合同编号"
                                // onSearch={this.handleNameChange}
                                style={{ width: 200 }}
                            />
                        </Form.Item>
                        <Form.Item label="链上签署时间">
                            <DatePicker onChange={onChange} />
                            <br />
                        </Form.Item>
                        <Form.Item label="货物名称">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Search
                                placeholder="请输入合同编号"
                                // onSearch={this.handleNameChange}
                                style={{ width: 200 }}
                            />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.createExchange}>查询</Button>
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

export default DisSupplier;