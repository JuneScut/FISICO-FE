/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, Modal, message, InputNumber } from 'antd';
import "../../../common/style.scss"
import $common from '../../../console/common';
import $enterprise from '../../../console/enterprise';
import { getEnterId, getUser, getAuth } from '../../../utils/authority';
const { Option } = Select;
const { Column } = Table;

class TokenRedeem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            balance: 0,
            bankList: [],
            visible: false,
            record: {},
            bankName: '',
            createInfo: {
                money: 0,
                to_id: 3
            },
            fileList: []
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
        let createInfo = Object.assign({}, this.state.createInfo, {to_id:id})
        this.setState({createInfo})
        let item = this.state.bankList.find((item) => item.id===id);
        this.setState({bankName: item.name});
    }
    handleValueChange = (money) => {
        let createInfo = Object.assign({}, this.state.createInfo, {money})
        this.setState({createInfo})
    }
    handleCreate = async() => {
        let {money, to_id} = this.state.createInfo;
        let from_id = getUser(getAuth()).id;
        
        let form  = new FormData();
        form.append('file', this.state.fileList[0]);
        form.append('from_id', from_id);
        form.append('money', money);
        form.append('to_id', to_id);

        let res =await $common.createTransferContract(form);
        if(res.data.success){
            this.setState({visible: false})
            message.success("还款请求已经发起");
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
        this.loadBankList();
    }
    handleBeforeUpload = (file) => {
        this.setState(state => ({
            fileList: [file],
        }));
        return false;
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
        const uploadProps = {
            multiple: false,
            // onChange: this.handleUploadChange
        }
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="公司余额" >{this.state.balance}</Form.Item>
                        <Form.Item label="文本合同" >
                            <Upload {...uploadProps} fileList={this.state.fileList} beforeUpload={this.handleBeforeUpload}>
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="银行">
                            <Select onChange={this.handleBankChange}>
                                {
                                    this.state.bankList.map((bank) => (
                                        <Option value={bank.id} key={bank.id}>{bank.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="还款金额">
                            <InputNumber  onChange={this.handleValueChange}/>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.openModal}>发起还款</Button>
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
                        okText="确定还款"
                        cancelText="取消"
                        >
                            <Form {...modalFormItemLayout} labelAlign="left">
                                <Form.Item label="银行">{this.state.bankName}</Form.Item>
                                <Form.Item label="还款金额">{this.state.createInfo.money}</Form.Item>
                            </Form>
                    </Modal>
                </main>
            </Card>
        )
    }
}


export default TokenRedeem;