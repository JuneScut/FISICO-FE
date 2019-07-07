/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, DatePicker, Modal} from 'antd';
import "../../../common/style.scss"
import { getId } from '../../../utils/authority';
import $supply from '../../../console/supply';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
const {MonthPicker,RangrPicker,WeekPicker}=DatePicker;
const { Option } = Select;
const { confirm } = Modal;
const { Search } = Input;


function onChange (date,dateString) {
    console.log(date,dateString)
}

class InsSupplierContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchParams: {
                supplyId: getId(),
                contractId: 0,
                insureContractId: 0
            },
            companyList: [],
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
                    title: '货物保险合同编号',
                    dataIndex: 'insuranceContractId',
                    key: 'insuranceContractId',
                },
                {
                    title: '物流公司',
                    dataIndex: 'transCompany',
                    key: 'transCompany',
                },
                {
                    title: '发起时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    render: (time) => (
                        <span>{formatTime(time)}</span>
                    )
                },
                {
                    title: '签署时间',
                    dataIndex: 'signTime',
                    key: 'signTime',
                    render: (time) => (
                        <span>{formatTime(time)}</span>
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
                    title: '保险费用（元）',
                    dataIndex: 'cost',
                    key: 'cost',
                },
                {
                    title: '保险合同状态',
                    dataIndex: 'insuranceContractStatus',
                    key: 'insuranceContractStatus',
                    render: (status) => (
                        <span>{findValue($supply.status, status)}</span>
                    )
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    key: 'operate',
                    render: (text, record) => (
                        <Button disabled={record.insuranceContractStatus==='SIGNED'} onClick={()=>this.handleSign(record)}>签署</Button>
                    )
                },
            ]
        }
    }
    async loadList() {
        let params = {};
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $supply.allInsueConsList(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
        });
        this.setState(() => ({
            list: list
        }));
    }
    async loadCompanyList() {
        const res = await $supply.insureCompanyList();
        if(res.data.success){
            this.setState({companyList: res.data.result});
        }
        
    }
    handleSign = (record) => {
        console.log(record)
        let self = this;
        confirm({
            title: '确定签署',
            content: `您确定真的要签署${record.goodsName}的货物保险合同吗？注意该操作不可撤回`,
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }
    handleInsureContractIdChange = async(id)=>{
        let searchParams = Object.assign({}, this.state.searchParams, {insureContractId: id})
        await setStateAsync(this, {searchParams})
        this.loadList();
    }
    handleContractIdChange = async(id)=>{
        let searchParams = Object.assign({}, this.state.searchParams, {contractId: id})
        await setStateAsync(this, {searchParams})
        this.loadList();
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
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="保险合同编号">
                            <Search
                                placeholder="请输入保险合同编号"
                                onSearch={this.handleInsureContractIdChange}
                                style={{ width: 200 }}
                            />
                        </Form.Item>
                        <Form.Item label="保险公司">
                            <Select defaultValue={1} style={{ width: 200 }}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Search
                                placeholder="请输入合同编号"
                                onSearch={this.handleContractIdChange}
                                style={{ width: 200 }}
                            />
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

export default InsSupplierContract;