/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber, message,Modal } from 'antd';
import '../../../common/style.scss';
import $common from '../../../console/common';
import $insurance from '../../../console/insurance';
import { getAuth, getUser } from '../../../utils/authority';

const { Option } = Select;

class CreateInsContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            companyList: [],
            visible: false,
            fileList: [],
            createInfo: {
                to_id: 0,
                contract_id: 0,
                price: 0
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                  },
                {
                    title: '保险合同编号',
                    dataIndex: 'insuranceId',
                    key: 'insuranceId',
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
                  },
                {
                    title: '保险类型',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: '保险金额（元）',
                    dataIndex: 'insuranceAmount',
                    key: 'insuranceAmount',
                },
                {
                    title: '签署人',
                    dataIndex: 'signtory',
                    key: 'signtory',
                },
                {
                    title: '签署时间',
                    dataIndex: 'signTime',
                    key: 'signTime',
                },
                {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                },
            ]
        }
    }
    // async loadList() {
    //     let params = {
    //         to_id: 1
    //     }
    //     const res = await $supply.contractList(params);
    //     let list = res.data.result;
    //     list.forEach((item, idx) => {
    //         item.order = idx+1;
    //         item.key = item.id;
    //     });
    //     this.setState(() => ({
    //         list: list
    //     }));
    //     console.log(this.state.list)
    // }
    loadCompanyList = async()=>{
        const res1 = await $common.supplyList();
        const res2 = await $common.retailerList();
        if(res1.data.success && res2.data.success){
            let result = [...res1.data.result, ...res2.data.result];
            this.setState({companyList: result})
        }
    }
    handleCreate = async() => {
        let {to_id, contract_id, price} = this.state.createInfo;
        let form = new FormData();
        form.append('file', this.state.fileList[0]);
        console.log(this.state.fileList[0])
        form.append('to_id', to_id);
        form.append('contract_id', contract_id);
        form.append('price', price);
        form.append('from_id', getUser(getAuth()).id);
        form.append('supply', 0);

        let resp = await $common.createInsureContract(form);
        if(resp.data.success){
            message.success("发起合同成功")
            this.setState({visible: false})
        }
    }
    componentWillMount(){
        // this.loadList();
        this.loadCompanyList();
    }
    handleBeforeUpload = (file) => {
        this.setState(state => ({
            fileList: [file],
        }));
        return false;
    }
    // handleUploadChange = info => {
    //     const { status } = info.file;
    //     // console.log(status)
    //     // console.log(info.fileList)
    //     // 限制只上传1个
    //     let fileList = [...info.fileList];
    //     fileList = fileList.slice(-1);
    //     this.setState({fileList})
    //     if(status === 'done'){
    //         message.success('上传成功')
    //         let createInfo = Object.assign({}, this.state.createInfo, {textContract: fileList[0]});
    //         this.setState({createInfo});
    //     }
    // }
    handleSupplyIdChange = (id) => {
        let createInfo = Object.assign({}, this.state.createInfo, {to_id: id});
        this.setState({createInfo});
    }
    handleIdChange = (event) => {
        let id = event.currentTarget.value;
        let createInfo = Object.assign({}, this.state.createInfo, {contract_id: id});
        this.setState({createInfo});
    }
    handleTypeChange = (type) => {
        let createInfo = Object.assign({}, this.state.createInfo, {type: type});
        this.setState({createInfo});
    }
    handleValueChange = (value) => {
        let createInfo = Object.assign({}, this.state.createInfo, {price: value});
        this.setState({createInfo});
    }
    openModal = () => {
        this.setState({visible: true})
    }
    validate() {
        if(this.state.fileList.length===0){
            message.warn('请上传文本合同')
            return false;
        }
        if(!this.state.createInfo.signtoryId){
            message.warn('请选择签署方')
            return false;
        }
        if(!this.state.createInfo.price){
            message.warn('请填写保险金额')
            return false;
        }
        return true;
    }
    closeModal = () => {
        this.setState({visible: false})
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
                        <Form.Item label="文本合同" >
                        <Upload beforeUpload={this.handleBeforeUpload} multiple={false}>
                            <Button>
                                <Icon type="upload" /> Upload
                            </Button>
                        </Upload>
                    </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select onChange={this.handleSupplyIdChange}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Input  onChange={this.handleIdChange}/>   
                        </Form.Item>
                        {/* <Form.Item label="保险类型">
                            <Select onChange={this.handleTypeChange}>
                                <Option value="GOODS">货物保险</Option>
                                <Option value="TRANS">物流保险</Option>
                            </Select>
                        </Form.Item> */}
                        <Form.Item label="保险金额">
                            <InputNumber min={1} onChange={this.handleValueChange}/>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.openModal}>发起合同</Button>
                        </Form.Item>
                    </Form>
                </header>

                <main>
                    {/* <Table dataSource={this.state.list} columns={this.state.columns} bordered/>; */}
                    <Modal
                        title="发起合同"
                        visible={this.state.visible}
                        onOk={this.handleCreate}
                        onCancel={this.closeModal}
                        >
                        <p>当前正在发起签署新合约，请注意，发起合约后不能撤回。请核对清楚信息后，再点击发起。</p>
                    </Modal>
                </main>
            </Card>
        )
    }
}

export default CreateInsContract;