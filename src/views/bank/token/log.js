/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col,DatePicker} from 'antd';
import '../../../common/style.scss'
import $common from '../../../console/common';
import $bank from '../../../console/bank';
import { findValue, formatTime, setStateAsync } from "../../../utils/tool"
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
                beginTime: 0,
                endTime: 0
            },
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
                    title: '审核结果',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                        <span>{findValue($bank.result, status)}</span>
                    )
                },
                {
                    title: '审核时间',
                    dataIndex: 'bankTime',
                    key: 'bankTime',
                    render: time => (
                        <span>
                            { formatTime(time) }
                        </span>
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
            ifAudit: true
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
    handleTimeChange = async(time) => {
        let searchParams = Object.assign({}, this.state.searchParams, {beginTime: time[0].valueOf(), endTime:time[1].valueOf()})
        await setStateAsync(this, {searchParams:searchParams})
        this.loadList();
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
                            <Select onChange={this.handleTypeChange}>
                                <Option value="ALL">不限</Option>
                                <Option value="EXCHANGE">兑付</Option>
                                <Option value="REDEEM">赎回</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="审核日期">
                            <RangePicker onChange={this.handleTimeChange}></RangePicker>
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

export default TokenLog;