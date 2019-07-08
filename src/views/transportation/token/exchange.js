import React from 'react'
import {Card, Form, Select, Button, Table, Row, Col, InputNumber, message, Modal} from 'antd';
import { formatTime, findValue } from '../../../utils/tool.js';
// import $supply from '../../../console/supply';
import $common from '../../../console/common';

import "../../../common/style.scss"
import { getTransId } from '../../../utils/authority'

const { Option } = Select;


class Token extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            balance: 0,
            assets: 0,
            visible: false,
            createInfo: {
                role: 'T',
                id: getTransId(),
                bankId: 0,
                token: 0
            },
            bankList: [],
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '兑付Token',
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: '兑付银行',
                    dataIndex: 'bankName',
                    key: 'bankName',
                },
                {
                    title: '发起兑付时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                }, 
                {
                    title: '兑付状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                        <span>{ findValue($common.tokenRecordStatus, status) }</span>
                    )
                },
                {
                    title: '银行操作时间',
                    dataIndex: 'bankTime',
                    key: 'bankTime',
                    render: (time) => {
                        if(time) return <span>{ formatTime(time) }</span>
                        else return <span>----</span>
                    }
                },
            ]
        }
    }
    async getBalance() {
        let params = {
            role: 'transportation'
        }
        const res = await $common.getBalance(params);
        if(res.data.success){
            this.setState({balance: res.data.result});
        }
    }
    async getAssets() {
        let params = {
            role: 'transportation'
        }
        const res = await $common.getAssets(params);
        if(res.data.success){
            this.setState({assets: res.data.result});
        }
    }
    async loadList() {
        let params = {
            role: 'T',
            id: getTransId()
        }
        const res = await $common.tokenRecord(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = idx;
        })
        if(res.data.success){
            this.setState({list: res.data.result})
        }
        // console.log(res)
    }
    loadBankList = async () => {
        let res = await $common.bankList();
        if(res.data.success){
            this.setState({bankList: res.data.result})
            if(res.data.result.length){
                let createInfo = Object.assign({}, this.state.createInfo, {bankId: res.data.result[0].id})
                this.setState({createInfo})
            }
        }
    }
    handleToken = (value) => {
        let createInfo = Object.assign({}, this.state.createInfo, {token: value});
        this.setState({createInfo})
    }
    handleBankChange = (value) => {
        let createInfo = Object.assign({}, this.state.createInfo, {bankId: value});
        this.setState({createInfo})
    }
    createExchange = async() => {
        if(this.validate()){
            let res = await $common.createTokenExchange(this.state.createInfo);
            if(res.data.success){
                this.handleCancel();
                message.success("您已成功发起token兑换,请等待银行审批");
                this.getAssets();
                this.getBalance();
                this.loadList();
            }
        }
    }
    openModal = ()=> {
        this.setState({visible: true})
    }
    handleCancel = () => {
        this.setState({visible: false})
    }
    validate = () => {
        if(!this.state.createInfo.bankId){
            message.error('必须选择兑换公司');
            return false;
        }
        if(!this.state.createInfo.token){
            message.error('必须填写兑换额度');
            return false;
        }
        return true;
    }
    componentWillMount(){
        // console.log($enterprise.getData())
        this.getBalance();
        this.getAssets();
        this.loadBankList();
        this.loadList();
    }
    findBankName = (id) => {
        let item = this.state.bankList.find((item) => item.id===id);
        if(item) return item.name;
    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: {span: 2},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            }
        }
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
                    <Row style={{'marginBottom': '20px', 'fontSize': '18px'}}>
                        <Col span={6}>公司Token余额：{this.state.balance}</Col>
                        <Col span={6}>公司资产（元）：{this.state.assets}</Col>
                    </Row>
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="兑付银行" required={true}>
                            <Select value={this.state.createInfo.bankId} onSelect={this.handleBankChange} style={{'width': '200px'}}>
                                {
                                    this.state.bankList.map(bank => (
                                        <Option value={bank.id} key={bank.id}>{bank.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="兑付Token额度" required={true}>
                            <InputNumber min={0} onChange={this.handleToken} style={{'width': '200px'}}/>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.openModal}>发起兑付</Button>
                        </Form.Item>
                    </Form>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                    <Modal
                        title="发起兑换"
                        visible={this.state.visible}
                        onOk={this.createExchange}
                        onCancel={this.handleCancel}
                        okText="确认兑换"
                        cancelText="取消" 
                        >
                         <Form {...modalFormItemLayout} labelAlign="left">
                            <Form.Item label="兑付银行">{this.findBankName(this.state.createInfo.bankId)}</Form.Item>
                            <Form.Item label="兑付Token额度">{this.state.createInfo.token}</Form.Item>
                        </Form>
                        <p style={{'fontWeight': 'bold'}}>当前正在发起Token兑换，请注意，发起兑换后不能撤回。请核对清楚信息后，再点击兑换</p>
                    </Modal>
                </main>
            </Card>
        )
    }
}

export default Token;