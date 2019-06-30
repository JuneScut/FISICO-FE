/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Button, Table, Upload, Icon, InputNumber, message } from 'antd';
// import '../style.scss';
import "../../../common/style.scss"
import { findValue, formatTime } from '../../../utils/tool.js';
import $supply from '../../../console/supply';
const { Option } = Select;

class CreateContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            enterpriseList: [],
            goodsList: [],
            createInfo: {
                fileList: [],
                signtoryId: 1,
                goodsId: 1
            },
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
                    title: '发起时间',
                    dataIndex: 'beginTime',
                    key: 'beginTime',
                    render: beginTime => (
                        <span>
                            { formatTime(beginTime) }
                        </span>
                    )
                  },
                  {
                    title: '货物名称',
                    dataIndex: 'goodsName',
                    key: 'goodsName',
                  },
                  {
                    title: '供货量(件)',
                    dataIndex: 'supply',
                    key: 'supply',
                  },
                  {
                    title: '货物金额(元)',
                    dataIndex: 'price',
                    key: 'price',
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
                    render: signTime => (
                        <span>
                            { formatTime(signTime) }
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
            ]
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
    async loadEnterprise() {
        const res = await $supply.enterpriseList();
        this.setState({enterpriseList: res.data.result})
        if(this.state.enterpriseList.length){
            let createInfo = Object.assign({}, this.state.createInfo, {signtoryId: this.state.enterpriseList[0].id})
            this.setState({createInfo})
        }
    }
    async loadGoodsList() {
        const res = await $supply.goodsList();
        this.setState({goodsList: res.data.result})
        if(this.state.goodsList.length){
            let createInfo = Object.assign({}, this.state.createInfo, {goodsId: this.state.goodsList[0].id})
            this.setState({createInfo})
        }
    }
    handleCreate(){
        // console.log('create')
    }
    componentWillMount(){
        this.loadList();
        this.loadEnterprise();
        this.loadGoodsList();
    }
    handleUploadChange = info => {
        const { status } = info.file;
        // console.log(status)
        // console.log(info.fileList)
        // 限制只上传1个
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        let createInfo = Object.assign({}, this.state.createInfo, {fileList:fileList})
        this.setState({createInfo})

      
        if(status === 'done'){
            message.success('上传成功')
        }
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
            onChange: this.handleUploadChange
        }
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="文本合同" >
                            <Upload {...uploadProps} fileList={this.state.createInfo.fileList}>
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select value={this.state.createInfo.signtoryId} style={{'width': '230px'}}>
                                {
                                    this.state.enterpriseList.map((enter) => (
                                        <Option value={enter.id} key={enter.id}>{enter.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="货物名称">
                        <Select value={this.state.createInfo.goodsId} style={{'width': '230px'}}>
                                {
                                    this.state.goodsList.map((goods) => (
                                        <Option value={goods.id} key={goods.id}>{goods.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="供货量">
                            <InputNumber style={{'width': '230px'}} min={1}/>
                        </Form.Item>
                        <Form.Item label="金额">
                            <InputNumber style={{'width': '230px'}} min={1}/>
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={this.handleCreate}>发起合同</Button>
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

export default CreateContract;