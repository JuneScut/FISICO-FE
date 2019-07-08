/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col,DatePicker, Modal, message} from 'antd';
import '../../../common/style.scss'
import $common from '../../../console/common';
import $bank from '../../../console/bank';
import { findValue, formatTime,setStateAsync } from "../../../utils/tool"
const {MonthPicker,RangePicker,WeekPicker}=DatePicker;
const { Option } = Select;

function onChange(date,dateString){
    console.log(date,dateString)
}


class TokenLog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchParams: {
                type: 'ALL',
                company: "ALL",
            },
            visible: false,
            record: {},
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '交易类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (status) => (
                        <span>{findValue($bank.status, status)}</span>
                    )
                },
                {
                    title: '公司名称',
                    dataIndex: 'companyName',
                    key: 'companyName',
                },
                {
                    title: '交易金额',
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: '提交时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    render: time => (
                        <span>
                            { formatTime(time) }
                        </span>
                    )
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    key: 'operate',
                    render: (text, record) => (
                        <Button type="primary" onClick={() => this.handleCheck(record)}>审核</Button>
                    )
                },
            ]
        }
    }
    async getData() {
        // const res = await $enterprise.getData();
        // console.log(res);
    }
    loadList = async() => {
        let params = {
            ifAudit: false
        };
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $common.tokenList(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item,idx) => {
                item.key = idx;
                item.order = idx+1;
            })
            this.setState({list: list})
        }
    }
    handleCompanyChange = async(company) => {
        let searchParams = Object.assign({}, this.state.searchParams, {company: company})
        await setStateAsync(this, {searchParams:searchParams})
        this.loadList();
    }
    handleTypeChange = async(type) => {
        let searchParams = Object.assign({}, this.state.searchParams, {type: type})
        await setStateAsync(this, {searchParams:searchParams})
        this.loadList();
    }
    handleCheck = (record) => {
        this.setState({visible: true});
        this.setState({record: record})
    }
    handleOk = async() => {
        let params = {
            tokenId: this.state.record.id,
            result: true
        }
        let res = await $bank.auditToken(params);
        if(res.data.success){
            this.setState({visible: false})
            message.success("审核已经通过")
        }
    }
    handleCancel = async() => {
        let params = {
            tokenId: this.state.record.id,
            result: false
        }
        let res = await $bank.auditToken(params);
        if(res.data.success){
            this.setState({visible: false})
            message.success("审核已经驳回")
        }
    }
    componentWillMount(){
        // console.log($enterprise.getData())
        this.getData();
        this.loadList();
    }

    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: {
                    span: 2,
                },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            }
        };
        const buttonItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 6,
                }
            }
        };
        const modalFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            }
        };
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                    <Form.Item label="公司名称">
                            <Select defaultValue="ALL" onChange={this.handleCompanyChange}>
                                <Option value="ALL">不限</Option>
                                <Option value="S">上游供应商</Option>
                                <Option value="E">核心企业</Option>
                                <Option value="T">物流公司</Option>
                                <Option value="I">保险公司</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="交易类型">
                            <Select onChange={this.handleTypeChange}  defaultValue="ALL">
                                <Option value="ALL">不限</Option>
                                <Option value="EXCHANGE">兑付</Option>
                                <Option value="REDEEM">赎回</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </header>


                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>
                    <Modal
                        title="审核管理"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="审核通过"
                        cancelText="审核驳回" 
                        >
                        <Form {...modalFormItemLayout} labelAlign="left">
                            <Form.Item label="交易类型">{ findValue($bank.status, this.state.record.type) }</Form.Item>
                            <Form.Item label="公司名称">{ this.state.record.companyName }</Form.Item>
                            <Form.Item label="交易金额">{ this.state.record.amount }</Form.Item>
                            <Form.Item label="提交时间">{ formatTime(this.state.record.createTime) }</Form.Item>
                        </Form>
                        <p style={{'fontWeight': 'bold'}}>说明：赎回类型操作审核通过后，将会把该企业支出的Token发还给企业，企业Token额度不变。</p>
                    </Modal>
                </main>

            </Card>
        )
    }
}

export default TokenLog;