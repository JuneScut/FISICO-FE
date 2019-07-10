/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, Modal, message } from 'antd';
import "../../../common/style.scss"
import $common from '../../../console/common';
import $enterprise from '../../../console/enterprise';
import { getEnterId } from '../../../utils/authority';
const { Option } = Select;
const { Column } = Table;

class TokenRedeem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            balance: 0,
            assets: 0,
            credit: 0,
            bankList: [],
            visible: false,
            record: {},
            bankName: '',
            createInfo: {
                enterpriseId:  getEnterId(),
                bankId: 0,
                value: 0
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '还款金额（元）',
                    dataIndex: 'repayAmount',
                    key: 'repayAmount',
                },
                {
                    title: '兑付银行',
                    dataIndex: 'bank',
                    key: 'bank',
                },
                {
                    title: '发起还款时间',
                    dataIndex: 'repayBegin',
                    key: 'repayBegin',
                },
                {
                    title: '状态',
                    dataIndex: 'repaystatus',
                    key: 'repaystatus',
                },
                {
                    title: '银行操作时间',
                    dataIndex: 'BankOperateTime',
                    key: 'BankOperateTime',
                },
            ]
        }
    }
    async getData() {
        // const res = await $enterprise.getData();
        // console.log(res);
    }
    loadList =  async() => {
        let params = {
            role: 'E',
            id: getEnterId()
        }
        const res = await $common.tokenList(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item, idx) => {
                item.order = idx +  1;
                item.key = idx;
            })
            this.setState({list: list})
        }

    }
    getBalance = async () =>  {
        const res = await $common.enterpriseList();
        this.setState({balance: res.data.result[0].money});
    }
    getAssets = async () =>  {
        const res = await $common.getAssets();
        this.setState({assets: res.data.result});
    }
    getCredit = async () =>  {
        const res = await $common.getCredit();
        this.setState({credit: res.data.result});
    }
    loadBankList = async () => {
        const res = await $common.bankList();
        this.setState({bankList: res.data.result});
    }
    handleBankChange = (id) => {
        let createInfo = Object.assign({}, this.state.createInfo, {bankId:id})
        this.setState({createInfo})
        let item = this.state.bankList.find((item) => item.id===id);
        this.setState({bankName: item.name});
    }
    handleValueChange = (event) => {
        let createInfo = Object.assign({}, this.state.createInfo, {value:event.currentTarget.value})
        this.setState({createInfo})
    }
    handleCreate = async() => {
        let params = this.state.createInfo;
        let res =await $enterprise.redeemToken(params);
        if(res.data.success){
            this.setState({visible: false})
            message.success("成功发起赎回！");
        }
    }
    openModal = async() => {
        await 
        this.setState({visible: true})
    }
    handleCancel = () => {
        this.setState({visible: false})
    }
    componentWillMount(){
        // console.log($enterprise.getData())
        // this.getData();
        // this.loadList();
        // this.getAssets();
        this.getBalance();
        // this.getCredit();
        // this.loadBankList();
    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: {span: 3},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            }
        };
        const modalFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: {span: 4},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            }
        };
        const buttonItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 6,
                }
            }
        };
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="公司余额" >{this.state.balance}</Form.Item>
                        <Form.Item label="兑付银行">
                            <Select onChange={this.handleBankChange}>
                                {
                                    this.state.bankList.map((bank) => (
                                        <Option value={bank.id} key={bank.id}>{bank.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="还款金额">
                            <Input  onChange={this.handleValueChange}/>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.openModal}>发起兑付</Button>
                        </Form.Item>
                    </Form>
                </header>

                <main>
                    {/* <Table dataSource={this.state.list} columns={this.state.columns} bordered/>; */}
                    <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleCreate}
                        onCancel={this.handleCancel}
                        okText="确定赎回"
                        cancelText="取消"
                        >
                            <Form {...modalFormItemLayout} labelAlign="left">
                                <Form.Item label="兑付银行">{this.state.bankName}</Form.Item>
                                <Form.Item label="还款金额">{this.state.createInfo.value}</Form.Item>
                            </Form>
                            <p>当前正在发起赎回操作，请注意，发起赎回后不能撤回。请核对清楚信息后，再点击确认。</p>
                    </Modal>
                </main>
            </Card>
        )
    }
}


export default TokenRedeem;