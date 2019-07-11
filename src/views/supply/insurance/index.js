/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table,DatePicker } from 'antd';
import "../../../common/style.scss"
import $supply from '../../../console/supply';
import $common from '../../../console/common';

import { getId, getUser, getAuth, getUserName } from '../../../utils/authority';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;


class InsSupplier extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchParams: {
                // cid: '',
                id: '',
                beginTime: 0,
                endTime: 0
            },
            list: [],
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
                // {
                //     title: '保险合同签署时间',
                //     dataIndex: 'signTime',
                //     key: 'signTime',
                //     render: (time) => (
                //         <span>{formatTime(time)}</span>
                //     )
                // },
                {
                    title: '货物名称',
                    dataIndex: 'gName',
                    key: 'gName',
                },
                // {
                //     title: '货物数量',
                //     dataIndex: 'quantity',
                //     key: 'quantity',
                // },
                {
                    title: '保险金额',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                        <span>{findValue($common.status, status)}</span>
                    )
                },
                // {
                //     title: '发货时间',
                //     dataIndex: 'deliveryTime',
                //     key: 'deliveryTime',
                //     render: (time) => (
                //         <span>{formatTime(time)}</span>
                //     )
                // },
                // {
                //     title: '物流状态',
                //     dataIndex: 'transStatus',
                //     key: 'transStatus',
                //     render: (status) => (
                //         <span>{findValue($supply.logisticStatus, status)}</span>
                //     )
                // },
                // {
                //     title: '保险情况',
                //     dataIndex: 'insuranceStatus',
                //     key: 'insuranceStatus',
                //     render: (status) => (
                //         findValue($supply.insuranceStatus, status) ? <span>{findValue($supply.insuranceStatus, status)}</span> : <span>-----</span>
                //     )
                // },
                // {
                //     title: '货物签收时间',
                //     dataIndex: 'receiveTime',
                //     key: 'receiveTime',
                //     render: (time) => (
                //         <span>{formatTime(time)}</span>
                //     )
                // },
            ]
        }
    }
    async loadList() {
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
    handleIdChange = async(value) => {
        let searchParams = Object.assign({}, this.state.searchParams, {id: value})
        await setStateAsync(this, {searchParams})
        this.loadList();
    }
    handleInsIdChange = async(value) => {
        let searchParams = Object.assign({}, this.state.searchParams, {id: value})
        await setStateAsync(this, {searchParams})
        this.loadList();
    }
    handleStatusChange = async(status) => {
        let searchParams = Object.assign({}, this.state.searchParams, {status: status})
        await setStateAsync(this, {searchParams})
        this.loadList();

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
                sm: { span: 8 },
            }
        };
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        {/* <Form.Item label="合同编号">
                            <Search onSearch={value => this.handleIdChange(value)} allowClear onChange={e => {if(!e.currentTarget.value) this.loadList()}}></Search>                            
                        </Form.Item> */}
                        <Form.Item label="保险合同编号">
                            <Search onSearch={value => this.handleInsIdChange(value)} allowClear onChange={e => {if(!e.currentTarget.value) this.loadList()}}></Search>
                        </Form.Item>
                        {/* <Form.Item label="保险情况">
                            <Select allowClear={true} defaultValue="ALL" onSelect={this.handleStatusChange}>
                                <Option value="ALL">不限</Option>
                                <Option value="NOACTIVE">未生效</Option>
                                <Option value="ACTIVE">生效中</Option>
                                <Option value="EXPIRED">已过期</Option>
                            </Select>
                        </Form.Item> */}
                        <Form.Item label="保险签署时间">
                            <RangePicker placeholder={["请选择开始时间","请选择结束时间"]} onChange={this.handleTimeChange}/>
                            <br />
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

export default InsSupplier;