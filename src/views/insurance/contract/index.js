/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker,Tooltip } from 'antd';
import '../../../common/style.scss';
import $insurance from '../../../console/insurance';
import $common from '../../../console/common';
import { getUser, getAuth, getUserName } from '../../../utils/authority';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
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
                to_id: 0
            },
            type: 'ALL',
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '保险合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '合同编号',
                    dataIndex: 'contract_id',
                    key: 'contract_id',
                },
                {
                    title: '发起时间',
                    dataIndex: 'time',
                    key: 'time',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                {
                    title: '保险类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (type,record) => (
                        record.to_id===2? <span>货物保险</span> : <span>运输保险</span>
                    )
                },
                {
                    title: '保险金额（元）',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '签署人',
                    dataIndex: 'to_id',
                    key: 'to_id',
                    render: (to_id) => (
                        <span>{ getUserName(to_id) }</span>
                    )
                },
                // {
                //     title: '签署时间',
                //     dataIndex: 'signTime',
                //     key: 'signTime',
                //     render: (time) => (
                //         <span>{ formatTime(time) }</span>
                //     )
                // },
                {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                        <span>{findValue($common.status, status)}</span>
                    )
                },
                {
                    title: '货物消息',
                    dataIndex: 'cargoInfo',
                    key: 'cargoInfo',
                    render: (text, record) => (
                        <Tooltip placement="right" title={`商品名称：${record.gName}     货物数量：${record.supply}     货物金额：${record.contract_price}`}>
                            <Button href="detail">详情</Button>
                        </Tooltip>
                    )
                }
            ]
        }
    }
    loadList = async() => {
        let params = {
            from_id: getUser(getAuth()).id
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $common.insureConsList(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item,idx) =>{
                item.order = idx+1;
                item.key = idx;
                item.gName="goods"
            })
            this.setState({list: list})
        }
    }
    loadCompanyList = async()=>{
        const res1 = await $common.supplyList();
        const res2 = await $common.logenterpriseList();
        const res = [...res1.data.result, ...res2.data.result];
        this.setState({companyList: res})
    }
    handleIdChange = (e)=>{
        let id = e.currentTarget.value;
        let searchParams = Object.assign({}, this.state.searchParams, {id:id})
        this.setState({searchParams})
    }
    handleRangeChange = async(time) => {
        let searchParams = {};
        if(time.length){
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: time[0].valueOf(), endTime:time[1].valueOf() })
        }else{
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: 0, endTime:0 })
        }
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    handleTypeChange = (type) => {
        this.setState({type: type});
        if(type==='ALL'){
            let searchParams = Object.assign({}, this.state.searchParams, {to_id: 0})
            this.setState({searchParams})
        }else if(type==='GOODS'){
            let searchParams = Object.assign({}, this.state.searchParams, {to_id: 2})
            this.setState({searchParams})
        }else{
            let searchParams = Object.assign({}, this.state.searchParams, {to_id: 6})
            this.setState({searchParams})
        }
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