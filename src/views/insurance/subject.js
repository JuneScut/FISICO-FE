/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber, DatePicker, Row, Col, Tooltip} from 'antd';
import './style.scss';
import $common from '../../console/common';
import $supply from '../../console/supply';
import $insurance from '../../console/insurance';
import { getInsuranceId } from '../../utils/authority';
import { findValue } from '../../utils/tool';

const { Option } = Select;

function onChange (date,dateString) {
    console.log(date,dateString)
}

class InsSubject extends React.Component{
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
                    dataIndex: 'insuranceContractId',
                    key: 'insuranceContractId',
                },
                {
                    title: '合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '保险类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (type) => (
                        <span>{ findValue($insurance.type, type) }</span>
                    )
                },
                {
                    title: '保险金额',
                    dataIndex: 'cost',
                    key: 'cost',
                },
                {
                    title: '货物消息',
                    dataIndex: 'cargoInfo',
                    key: 'cargoInfo',
                    render: (text, record) => (
                        <Tooltip placement="right" title={`商品名称：${record.goodsName}     货物数量：${record.quantity}     货物金额：${record.value}`}>
                            <Button href="detail">详情</Button>
                        </Tooltip>
                    )
                },
                {
                    title: '签署人',
                    dataIndex: 'signtory',
                    key: 'signtory',
                },
                {
                    title: '物流状态',
                    dataIndex: 'transStatus',
                    key: 'transStatus',
                    render: (status) => (
                        <span>{ findValue($common.logisticStatus, status) }</span>
                    )
                },
                {
                    title: '保险状态',
                    dataIndex: 'insuranceStatus',
                    key: 'insuranceStatus',
                    render: (status) => (
                        <span>{ findValue($common.insuranceStatus, status) }</span>
                    )
                },
            ]
        }
    }
    loadList = async() => {
        let params = {
            insuranceId: getInsuranceId()
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $common.insureConsList(params);
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
                                <Option value="test2">1</Option>
                                <Option value="test3">2</Option>
                                <Option value="test4">3</Option>
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

export default InsSubject;