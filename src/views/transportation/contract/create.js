/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber, message, Modal } from 'antd';
import '../../../common/style.scss';
import $transportation from '../../../console/transportation';
import $common from '../../../console/common';
import { getAuth, getUser } from '../../../utils/authority';
import { getTransId } from '../../../utils/authority';
const { Option } = Select;
const { confirm } = Modal;

class CreateTransContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            createInfo: {
                transId:getTransId(),
                file: null,
                supplyId: 0,
                contractId: 0,
                value: 0
            },
            fileList: [],
            companyList: [],
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
                    title: '物流费用（元）',
                    dataIndex: 'cost',
                    key: 'cost',
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
    //         supplyId: 1
    //     }
    //     const res = await $enterprise.contractList(params);
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
        const res = await $common.supplyList();
        this.setState({companyList: res.data.result})
    }
    handleCreate = async()=>{
        confirm({
            title: '发起合同',
            content: '当前正在发起签署新合约，请注意，发起合约后不能撤回。请核对清楚信息后，再点击发起。',
            okText: '确认发起',
            cancelText: "取消",
            onOk : async() => {
                let { supplyId,contractId,value} = this.state.createInfo;
                let params = {
                    from_id: getUser(getAuth()).id,
                    to_id: supplyId,
                    contract_id: contractId,
                    price: value
                }
                let form = new FormData();
                form.append('file', this.state.fileList[0]);
                for(let item in params){
                    form.append(item, params[item])
                }
                let res = await $common.createLogisticContract(form);;
                if(res.data.success){
                    message.success("创建成功！")
                }
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    handleIdChange = (e) => {
        // console.log(e.currentTarget.value)
        let id = e.currentTarget.value;
        let createInfo = Object.assign({}, this.state.createInfo, {contractId:id})
        this.setState({createInfo})
    }
    handleSupplyChange = (id) => {
        let createInfo = Object.assign({}, this.state.createInfo, {supplyId:id})
        this.setState({createInfo})
    }
    handleValueChange = (value) => {
        let createInfo = Object.assign({}, this.state.createInfo, {value:value})
        this.setState({createInfo})
    }
    componentWillMount(){
        // this.loadList();
        this.loadCompanyList();
    }
    // handleUploadChange = info => {
    //     const { status } = info.file;
    //     // 限制只上传1个
    //     let fileList = [...info.fileList];
    //     fileList = fileList.slice(-1);
    //     this.setState({fileList: fileList})
    //     if(status === 'done'){
    //         let createInfo = Object.assign({}, this.state.createInfo, {file:fileList[0]})
    //         this.setState({createInfo})
    //         message.success('上传成功')
    //     }
    // }
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
                        <Form.Item label="合约签署方">
                            <Select onChange={this.handleSupplyChange} style={{'width': '230px'}} >
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Input style={{'width': '230px'}}  onChange={this.handleIdChange}/>                                                        
                        </Form.Item>
                        <Form.Item label="物流费用">
                            <InputNumber style={{'width': '230px'}} min={1} onChange={this.handleValueChange}/>                            
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

export default CreateTransContract;