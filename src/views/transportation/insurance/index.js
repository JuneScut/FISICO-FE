/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import '../../../common/style.scss';
import $insurance from '../../../console/insurance';
import $common from '../../../console/common';
import {  getUser, getAuth, getUserName } from '../../../utils/authority';
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
                id: 0,
                beginTime: 0,
                endTime: 0,
                from_id: 0
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '合同编号',
                    dataIndex: 'contract_id',
                    key: 'contract_id',
                },
                {
                    title: '保险合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '保险公司',
                    dataIndex: 'from_id',
                    key: 'from_id',
                    render: (from_id) => (
                        <span>{ getUserName(from_id) }</span>
                    )
                },
                {
                    title: '货物名称',
                    dataIndex: 'gName',
                    key: 'gName',
                },
                {
                    title: '货物数量',
                    dataIndex: 'supply',
                    key: 'supply',
                },
                {
                    title: '保险金额（元）',
                    dataIndex: 'price',
                    key: 'price',
                },
                // {
                //     title: '发货时间',
                //     dataIndex: 'deliveryTime',
                //     key: 'deliveryTime',
                //     render: (time) => (
                //         <span>{ formatTime(time) }</span>
                //     )
                // },
                // {
                //     title: '物流状态',
                //     dataIndex: 'status',
                //     key: 'status',
                //     render: (status) => (
                //         <span>{findValue($common.logisticStatus, status)}</span>
                //     )
                // },
                // {
                //     title: '保险情况',
                //     dataIndex: 'insuranceStatus',
                //     key: 'insuranceStatus',
                //     render: (status) => (
                //         <span>{findValue($common.insuranceStatus, status)}</span>
                //     )
                // },
                // {
                //     title: '货物签收时间',
                //     dataIndex: 'signTime',
                //     key: 'signTime',
                //     render: (time) => (
                //         <span>{ formatTime(time) }</span>
                //     )
                // },
            ]
        }
    }
    loadList = async() => {
        let params = {
            to_id: getUser(getAuth()).id,
            status: 'SIGNED'
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
            item.gName = "goods";
        });
        this.setState(() => ({
            list: list
        }));
    }
    loadCompanyList = async()=>{
        const res = await $common.insenterpriseList();
        this.setState({companyList: res.data.result})
    }
    handleIdChange = (e)=>{
        let id = e.currentTarget.value;
        let searchParams = Object.assign({}, this.state.searchParams, {id:id})
        this.setState({searchParams})
    }
    handleSupplyChange = (id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {from_id:id})
        this.setState({searchParams})
    }
    handleRangeChange = (time) => {
        let searchParams = {};
        if(time.length){
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: time[0].valueOf(), endTime:time[1].valueOf() })
        }else{
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: 0, endTime:0 })
        }
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
                        <Form.Item label="合约发起方">
                            <Select onChnage={this.handleSupplyChange}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
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