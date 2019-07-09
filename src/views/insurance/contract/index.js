/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import '../../../common/style.scss';
import $insurance from '../../../console/insurance';
import $common from '../../../console/common';
import { getInsuranceId } from '../../../utils/authority';
import { formatTime, findValue } from '../../../utils/tool.js';
const { Option } = Select;
const { RangePicker } = DatePicker;


function onChange (date,dateString) {
    console.log(date,dateString)
}

class InsuranceContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            companyList: [],
            searchParams: {
                supplyId: 0,
                insuranceContractId: 0,
                beginTime: 0,
                endTime: 0,
                type: "ALL"
            },
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
                    title: '发起时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                {
                    title: '保险类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (type) => (
                        <span>{findValue($insurance.type, type)}</span>
                    )
                },
                {
                    title: '保险金额（元）',
                    dataIndex: 'cost',
                    key: 'cost',
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
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                {
                    title: '合同状态',
                    dataIndex: 'insuranceContractStatus',
                    key: 'insuranceContractStatus',
                    render: (status) => (
                        <span>{findValue($common.status, status)}</span>
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
    loadCompanyList = async()=>{
        const res = await $common.supplyList();
        this.setState({companyList: res.data.result})
    }
    handleIdChange = (e)=>{
        let id = e.currentTarget.value;
        let searchParams = Object.assign({}, this.state.searchParams, {insuranceContractId:id})
        this.setState({searchParams})
    }
    handleSupplyChange = (id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {supplyId:id})
        this.setState({searchParams})
    }
    handleRangeChange = (time) => {
        let searchParams = Object.assign({}, this.state.searchParams, {beginTime:time[0].valueOf(),endTime:time[1].valueOf()})
        this.setState({searchParams})
    }
    handleTypeChange = (type) => {
        let searchParams = Object.assign({}, this.state.searchParams, {type: type})
        this.setState({searchParams})
    }
    componentWillMount(){
        this.loadList();
        this.loadCompanyList();
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
                            <Input onChange={this.handleIdChange}/>                                                        
                        </Form.Item>
                        <Form.Item label="链上签署时间">
                            <RangePicker onChange={this.handleRangeChange}/>                            
                            <br />
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select onChnage={this.handleSupplyChange}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="保险类型">
                            <Select onChange={this.handleTypeChange} defaultValue="ALL">
                                <Option value="ALL">不限</Option>
                                <Option value="GOODS">货物保险</Option>
                                <Option value="TRANS">运输保险</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                    <Button onClick={this.loadList}>查询</Button>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                </main>
            </Card>
        )
    }
}

export default InsuranceContract;