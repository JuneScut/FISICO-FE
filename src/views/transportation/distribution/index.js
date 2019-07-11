/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import "../../../common/style.scss"
import $supply from '../../../console/supply';
import $common from '../../../console/common';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
import { getTransId } from '../../../utils/authority'

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
            companyList: [],
            searchParams: {
                transStatus: '',
                transContractId: 0,
                beginTime: 0,
                endTime: 0,
                goodsName: '',
                contractId: 0,
                supplyId: 0
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
                    title: '物流合同编号',
                    dataIndex: 'transContractId',
                    key: 'transContractId',
                },
                {
                    title: '物流费用（元）',
                    dataIndex: 'transCost',
                    key: 'transCost',
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
                    title: '签署人',
                    dataIndex: 'signtory',
                    key: 'signtory'
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
                    title: '物流变更时间',
                    dataIndex: 'lastModifiedTime',
                    key: 'lastModifiedTime',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                }
            ]
        }
    }
    async loadList() {
        let params = {
            transId: getTransId()
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
    async loadCompanyList() {
        const res = await $common.supplyList();
        if(res.data.success){
            this.setState({companyList: res.data.result});
        }
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
        let searchParams = {};
        if(time.length){
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: time[0].valueOf(), endTime:time[1].valueOf() })
        }else{
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: 0, endTime:0 })
        }
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
    handleSupplyIdChange = async(id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {supplyId: id })
        await setStateAsync(this, {searchParams})
        this.loadList()
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
                        <Form.Item label="物流合同编号">
                            <Search
                                placeholder="请输入物流合同编号"
                                onSearch={this.handleTransIdChange}
                            />
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select  onChange={this.handleSupplyIdChange}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="物流状态">
                            <Select defaultValue="ALL" onChange={this.handleStatusChange}>
                                <Option value="ALL">不限</Option>
                                <Option value="ARRIVED">已送达</Option>
                                <Option value="INTRANSIT">运输中</Option>
                                <Option value="WAITDELIVERY">未发货</Option>
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

export default DisSupplier;