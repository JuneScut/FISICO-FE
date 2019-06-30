/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $supply from '../../console/supply';
const {MonthPicker,RangrPicker,WeekPicker}=DatePicker;
const { Option } = Select;

function onChange (date,dateString) {
    console.log(date,dateString)
}

class DisTrans extends React.Component{
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
                    title: '物流合同编号',
                    dataIndex: 'distributionId',
                    key: 'distributionId',
                },
                {
                    title: '合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '物流费用（元）',
                    dataIndex: 'cost',
                    key: 'cost',
                },
                {
                    title: '货物名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '货物数量（件）',
                    dataIndex: 'number',
                    key: 'number',
                },
                {
                    title: '签署人',
                    dataIndex: 'signatory',
                    key: 'signatory',
                },
                {
                    title: '是否购买物流保险',
                    dataIndex: 'ifInsurance',
                    key: 'ifInsurance',
                },
                {
                    title: '物流状态',
                    dataIndex: 'distributionStatus',
                    key: 'distributionStatus',
                },
                {
                    title: '物流状态变更时间',
                    dataIndex: 'changeTime',
                    key: 'rchangeTime',
                }
            ]
        }
    }
    async loadList() {
        let params = {
            supplyId: 1
        }
        const res = await $supply.contractList(params);
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
                        <Form.Item label="物流合同编号">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="物流状态">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">待发货</Option>
                                <Option value="test3">等待揽收</Option>
                                <Option value="test4">运输中</Option>
                                <Option value="test5">已送达</Option>
                            </Select>
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

export default DisTrans;