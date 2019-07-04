import React from 'react'
import { Card, Form, Select, Table, Input, Button, Modal, message } from 'antd';
import './style.scss';
// import $enterprise from '../../../console/enterprise';
import $supply from '../../../console/supply';
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
import { getId } from '../../../utils/authority'
const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;

class OutWarehouse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchParams: {
                status: 0,
                contractId: 0,
                enterpriseName: ''
            },
            list: [],
            columns:
                [
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
                        title: '发起时间',
                        dataIndex: 'beginTime',
                        key: 'beginTime',
                        render: time => (
                            <span>
                                { formatTime(time) }
                            </span>
                        )
                    },
                    {
                        title: '收货公司',
                        dataIndex: 'receive',
                        key: 'receive',
                    },
                    {
                        title: '签署时间',
                        dataIndex: 'signTime',
                        key: 'signTime',
                        render: time => (
                            <span>
                                { formatTime(time) }
                            </span>
                        )
                    },
                    {
                        title: '合同状态',
                        dataIndex: 'status',
                        key: 'status',
                        render: status => (
                            <span>
                                {findValue($supply.status, status)}
                            </span>
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
                        title: '货物金额（元）',
                        dataIndex: 'goodsValue',
                        key: 'goodsValue',
                    },
                    {
                        title: '保险公司',
                        dataIndex: 'insuranceCompany',
                        key: 'insuranceCompany',
                    },
                    {
                        title: '出库状态',
                        dataIndex: 'outStatus',
                        key: 'outStatus',
                        render: status => (
                            <span>
                                {findValue($supply.warehouseStatus, status)}
                            </span>
                        )
                    },
                    {
                        title: '物流公司',
                        dataIndex: 'transportCompany',
                        key: 'transportCompany',
                    },
                    {
                        title: '出库时间',
                        dataIndex: 'outTime',
                        key: 'outTime',
                        render: time => (
                            <span>
                                { formatTime(time) }
                            </span>
                        )
                    },
                    {
                        title: '操作',
                        key: 'operate',
                        render: (text, record) => (
                            <Button disabled={record.outStatus==='OUT'} onClick={()=>{this.handleOut(record)}}>出库</Button>
                        )
                    },
                ]
        }
    }
    async loadList() {
        let params = {}
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        console.log(params)
        const res = await $supply.outRecord(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
        });
        this.setState(() => ({
            list: list
        }));
    }
    async outGoods(goodsId){
        let params = {
            supplyId: getId(),
            goodsId: goodsId,
            status: true
        }
        const res = await $supply.outGoods(params);
        if(res.data.success){
            message.success('出库成功！')
        }else{
            message.error('出库失败！');
        }
    }
    handleStatusChange = async(status) => {
        let searchParams = Object.assign({}, this.state.searchParams, {status: status});
        await setStateAsync(this, {searchParams});
        this.loadList();
    }
    handleIdChange = async (id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {contractId: id})
        await setStateAsync(this, {searchParams:searchParams})
        this.loadList();
    }
    handleNameChange = async (name) => {
        let searchParams = Object.assign({}, this.state.searchParams, {enterpriseName: name});
        await setStateAsync(this, {searchParams: searchParams})
        this.loadList()
    }
    handleOut = (record) => {
        let self = this;
        confirm({
            title: '确认出库',
            content: `您确定要将商品【${record.goodsName}】出库吗？请注意该操作不可逆`,
            onOk() {
                console.log('OK');
                self.outGoods();
            },
            onCancel() {
                console.log('Cancel');
            },
        });

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
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="出库状态">
                            <Select defaultValue="0" onChange={this.handleStatusChange}>
                                <Option value="0">不限</Option>
                                <Option value="1">未出库</Option>
                                <Option value="2">已出库</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Search
                                placeholder="请输入合同编号"
                                onSearch={this.handleIdChange}
                                style={{ width: 200 }}
                            />
                        </Form.Item>
                        <Form.Item label="货物名称">
                            <Search
                                placeholder="请输入货物名称"
                                onSearch={this.handleNameChange}
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

export default OutWarehouse;