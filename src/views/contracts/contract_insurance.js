/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $supply from '../../console/supply';
const { Option } = Select;

function onChange (date,dateString) {
    console.log(date,dateString)
}

class CreateContract extends React.Component{
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
                    title: '保险合同编号',
                    dataIndex: 'insuranceId',
                    key: 'insuranceId',
                },
                {
                    title: '合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '发起时间',
                    dataIndex: 'beginTime',
                    key: 'beginTime',
                },
                {
                    title: '保险类型',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: '保险金额（元）',
                    dataIndex: 'insuranceAmount',
                    key: 'insuranceAmount',
                },
                {
                    title: '签署人',
                    dataIndex: 'signtory',
                    key: 'signtory',
                },
                {
                    title: '签署时间',
                    dataIndex: 'signTime',
                    key: 'signTime',
                },
                {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                },
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
                        <Form.Item label="保险合同编号">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="链上签署时间">
                            <DatePicker onChange={onChange} />
                            <br />
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select>
                            <Option value="test1">不限</Option>
                            <Option value="test2">测试1</Option>
                            <Option value="test3">测试2</Option>
                            <Option value="test4">测试3</Option>
                        </Select>
                        </Form.Item>
                        <Form.Item label="保险类型">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">货物保险</Option>
                                <Option value="test3">运输保险</Option>
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

export default CreateContract;