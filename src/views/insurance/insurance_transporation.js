/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $contract from '../../console/supply';
const {MonthPicker,RangrPicker,WeekPicker}=DatePicker;
const { Option } = Select;

function onChange (date,dateString) {
    console.log(date,dateString)
}

class InsTrans extends React.Component{
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
                    title: '保险合同编号',
                    dataIndex: 'insuranceId',
                    key: 'insuranceId',
                },
                {
                    title: '保险公司',
                    dataIndex: 'insuranceCompany',
                    key: 'insuranceCompany',
                },
                {
                    title: '保险合同签署时间',
                    dataIndex: 'insuranceSTime',
                    key: 'insuranceSTime',
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
                    title: '保险金额（元）',
                    dataIndex: 'insuranceCost',
                    key: 'insuranceCost',
                },
                {
                    title: '发货时间',
                    dataIndex: 'transTime',
                    key: 'transTime',
                },
                {
                    title: '物流状态',
                    dataIndex: 'distributionStatus',
                    key: 'distributionStatus',
                },
                {
                    title: '物流保险',
                    dataIndex: 'ifInsurance',
                    key: 'ifInsurance',
                },
                {
                    title: '保险情况',
                    dataIndex: 'InsuranceStatus',
                    key: 'InsuranceStatus',
                },
                {
                    title: '货物签收时间',
                    dataIndex: 'receiveTime',
                    key: 'receiveTime',
                }
            ]
        }
    }
    async loadList() {
        let params = {
            supplyId: 1
        }
        const res = await $contract.list(params);
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
                        <Form.Item label="是否购买物流保险">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">已购买</Option>
                                <Option value="test3">未购买</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="保险情况">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">未生效</Option>
                                <Option value="test3">生效中</Option>
                                <Option value="test4">已过期</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="保险合同编号">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="保险合同签署时间">
                            <DatePicker onChange={onChange} />
                            <br />
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
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

export default InsTrans;