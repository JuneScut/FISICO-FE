/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker, Modal, message } from 'antd';
import "../../../common/style.scss"
import $transportation from '../../../console/transportation';
import $common from '../../../console/common';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
import { getTransId } from '../../../utils/authority'

const {MonthPicker,RangePicker,WeekPicker}=DatePicker;
const { Option } = Select;
const { Search } = Input;


function onChange (date,dateString) {
    console.log(date,dateString)
}

class DisCollect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            companyList: [],
            searchParams: {
                transContractId: 0,
                beginTime: 0,
                endTime: 0,
                supplyId: 0
            },
            record: {},
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '物流合同编号',
                    dataIndex: 'transContractId',
                    key: 'transContractId',
                },
                {
                    title: '合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '物流费用（元）',
                    dataIndex: 'transCost',
                    key: 'transCost',
                },
                {
                    title: '签署人',
                    dataIndex: 'signtory',
                    key: 'signtory'
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
                    title: '出库时间',
                    dataIndex: 'outTime',
                    key: 'outTime',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                {
                    title: '是否购买物流保险',
                    dataIndex: 'ifTransInsurance',
                    key: 'ifTransInsurance',
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
                    title: '操作',
                    dataIndex: 'operate',
                    key: 'operate',
                    render: (text, record) => (
                        <Button disabled={record.transStatus!=='WAITCOLLECT'} onClick={()=>this.handleCollect(record)}>揽收</Button>
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
        if(time.length){
            let searchParams = Object.assign({}, this.state.searchParams, {beginTime: time[0].valueOf(), endTime:time[1].valueOf() })
            await setStateAsync(this, {searchParams})
        }else{
            let searchParams = Object.assign({}, this.state.searchParams, {beginTime: 0, endTime:0 })
            await setStateAsync(this, {searchParams})
        }
        
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
    handleCollect = async(record) => {
        console.log("11")
        await setStateAsync(this, {record: record});
        this.setState({visible: true})
    }
    handleCancel = async() => {
        this.setState({visible: false})
    }
    handleOk = async() => {
        let params = {
            transContractId: this.state.record.transContractId
        }
        let res = await $transportation.collectGoods(params);
        if(res.data.success){
            this.setState({visible: false})
            message.success("揽件成功！")
        }else{
            this.setState({visible: false})
            message.error("网络不佳，揽件失败！")
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
        const modalFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
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
                        <Form.Item label="签署时间">
                            <RangePicker onChange={this.handleTimeChange}></RangePicker>
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
                    </Form>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>
                    <Modal
                        title="揽收货物"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认揽收"
                        cancelText="取消" 
                        >
                        <Form {...modalFormItemLayout} labelAlign="left">
                            <Form.Item label="物流合同编号">{ this.state.record.transContractId }</Form.Item>
                            <Form.Item label="物流费用（元）">{ this.state.record.transCost }</Form.Item>
                            <Form.Item label="货物名称">{ this.state.record.goodsName }</Form.Item>
                            <Form.Item label="货物数量（件）">{ this.state.record.quantity }</Form.Item>
                        </Form>
                    </Modal>
                </main>
            </Card>
        )
    }
}

export default DisCollect;