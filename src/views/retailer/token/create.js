/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Button, Table, Upload, Icon, InputNumber, message, Modal } from 'antd';
// import '../style.scss';
import "../../../common/style.scss"
import { findValue, formatTime, setStateAsync } from '../../../utils/tool.js';
import $supply from '../../../console/supply';
import $common from '../../../console/common';
import { getAuth, getUser } from '../../../utils/authority';
const { Option } = Select;
const { confirm } = Modal;

class CreateContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            enterpriseList: [],
            fileList: [],
            supplyId: getUser(getAuth()).id,
            createInfo: {
                fileList: [],
                signtoryId: -1,
                goodsQuantity: null,
                price: null
            }
        }
    }
    async loadList() {
        let params = {
            supplyId: 1
        }
        const res = await $supply.contractList(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
        });
        this.setState(() => ({
            list: list
        }));
        // console.log(this.state.list)
    }
    async loadBankList() {
        const res = await $common.bankList();
        this.setState({enterpriseList: res.data.result});
    }
    // async createContract(params) {
    //     let res =  await $supply.createContract(params);
    //     return res;
    // }
    handleCreate = () => {
        let {signtoryId, goodsId, goodsQuantity, price} = this.state.createInfo;
        var form = new FormData();
        form.append('file', this.state.fileList[0]);
        let params = {
            from_id: this.state.supplyId,
            to_id: signtoryId,
            supply: goodsQuantity,
            price: price,
            goodsId: goodsId
        }
        for(let item in params){
            form.append(item, params[item])
            console.log(form.get(item))
        }
        if(this.validate()){
            confirm({
                title: '发起合同',
                content: '当前正在发起签署新合约，请注意，发起合约后不能撤回。请核对清楚信息后，再点击发起。',
                okText: '确认发起',
                cancelText: '取消',
                async onOk() {
                  let res = await $supply.createContract(form);
                  if(res.data.success){
                      message.success("合同发起成功！")
                  }else{
                      message.error("系统异常，请稍后重试")
                  }
                },
                onCancel() {
                  console.log('Cancel');
                },
            });
        }
        
    }
    componentWillMount(){
        this.loadList();
        this.loadBankList();
    }
    handleBeforeUpload = (file) => {
        this.setState(state => ({
            fileList: [file],
        }));
        return false;
    }
    handleSignatoryChange = async (sign) => {
        let createInfo = Object.assign({}, this.state.createInfo, {signtoryId:sign})
        await setStateAsync(this, {createInfo})  
    } 
    handleGoodsChange = async (id) => {
        let createInfo = Object.assign({}, this.state.createInfo, {goodsId:id})
        await setStateAsync(this, {createInfo: createInfo})  
    } 
    quantityChange = quantity => {
        let createInfo = Object.assign({}, this.state.createInfo, {goodsQuantity:quantity})
        this.setState({createInfo})
    }
    priceChange = price => {
        let createInfo = Object.assign({}, this.state.createInfo, {price:price})
        this.setState({createInfo})
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
        
        if(!this.state.createInfo.goodsQuantity){
            message.warn('请填写供货量')
            return false;
        }
        if(!this.state.createInfo.price){
            message.warn('请填写金额')
            return false;
        }
        return true;
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
        const uploadProps = {
            multiple: false,
            // onChange: this.handleUploadChange
            beforeUpload: this.handleBeforeUpload
        }
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="文本合同" >
                            <Upload {...uploadProps} fileList={this.state.fileList} beforeUpload={this.handleBeforeUpload}>
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="签署银行">
                            <Select onChange={this.handleSignatoryChange}>
                                {
                                    this.state.enterpriseList.map((enter) => (
                                        <Option value={enter.id} key={enter.id}>{enter.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="抵押货物">
                        <Select onChange={this.handleGoodsChange} defaultValue={1}>
                                <Option value={1}>goods</Option>  
                            </Select>
                        </Form.Item>
                        <Form.Item label="货物数量">
                            <InputNumber min={1} onChange={this.quantityChange}/>
                        </Form.Item>
                        <Form.Item label="抵押金额">
                            <InputNumber min={1} onChange={this.priceChange}/>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.handleCreate}>发起合同</Button>
                        </Form.Item>
                    </Form>
                </header>

                <main>
                    {/* <Table dataSource={this.state.list} columns={this.state.columns} bordered/>; */}
                </main>
            </Card>
        )
    }
}

export default CreateContract;