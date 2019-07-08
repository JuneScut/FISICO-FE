import React from 'react'
import { Card, Form, Table, Button, Input, Modal, message } from 'antd';
import './style.scss';
import $enterprise from '../../../console/enterprise';
import $common from '../../../console/common';
import { formatTime, findValue,setStateAsync } from '../../../utils/tool.js';
import { getEnterId } from '../../../utils/authority'

const { Search } = Input;


class InWarehouse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchParams: {
                contractId: 0,
                goodsName: ''
            },
            modal: {
                visible: false,
                content: {}
            },
            columns:[
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
                    title: '合同发起人',
                    dataIndex: 'creator',
                    key: 'creator',
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
                    title: '物流状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: status => (
                        <span>
                            {findValue($common.logisticStatus, status)}
                        </span>
                    )
                },
                {
                    title: '物流公司',
                    dataIndex: 'transportCompany',
                    key: 'transportCompany',
                },
                {
                    title: '入库时间',
                    dataIndex: 'inTime',
                    key: 'inTime',
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
                        <Button disabled={record.outStatus==='OUT'} onClick={()=>{this.handleIn(record)}}>入库</Button>
                    )
                },
            ]
        }
    }
    async loadList() {
        let params = {
            enterpriseId: getEnterId()
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $enterprise.goodsInList(params);
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
    handleIn = (record) => {
        let modal = Object.assign({},this.state.modal, {visible: true, content: record})
        this.setState({ modal })
    }
    handleOk = async() => {
        let params = {
            enterpriseId: getEnterId(),
            contractId: this.state.modal.content.id
        }
        const res = await $enterprise.confirmIn(params);
        if(res.data.success){
            let modal = Object.assign({},this.state.modal, {visible: false, content: {}})
            this.setState({ modal })
            message.success("成功入库！");
            this.loadList()
        }
    }
    handleCancel = () => {
        let modal = Object.assign({},this.state.modal, {visible: false, content: {}})
        this.setState({ modal })
    }
    handleIdChange = async(id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {contractId: id})
        await setStateAsync(this, {searchParams:searchParams})
        this.loadList();
    }
    handleNameChange = async(name) => {
        let searchParams = Object.assign({}, this.state.searchParams, {goodsName: name})
        await setStateAsync(this, {searchParams:searchParams})
        this.loadList();
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
                    <Modal
                        title="入库管理"
                        visible={this.state.modal.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认入库"
                        cancelText="取消" 
                        >
                        <Form {...modalFormItemLayout} labelAlign="left">
                            <Form.Item label="合同编号">{this.state.modal.content.id}</Form.Item>
                            <Form.Item label="货物名称">{this.state.modal.content.goodsName}</Form.Item>
                            <Form.Item label="货物数量">{this.state.modal.content.quantity}</Form.Item>
                            <Form.Item label="货物金额">{this.state.modal.content.goodsValue}</Form.Item>
                            <Form.Item label="合同发起人">{this.state.modal.content.creator}</Form.Item>
                            <Form.Item label="物流公司">{this.state.modal.content.transportCompany}</Form.Item>
                        </Form>
                        <p style={{'fontWeight': 'bold'}}>请确认签收货物与订单相符，确认入库后，订单关闭，将不能再次修改相关信息</p>
                    </Modal> 
                </main>
            </Card>
        )
    }
}

export default InWarehouse;