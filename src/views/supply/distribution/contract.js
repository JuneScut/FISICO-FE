/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Modal, Row, Col, message, Upload, Icon} from 'antd';
import "../../../common/style.scss"
import $supply from '../../../console/supply';
import $common from '../../../console/common';
import { getId, getUser, getAuth, getUserName } from '../../../utils/authority'
import { formatTime, findValue, setStateAsync } from '../../../utils/tool.js';
const { confirm } = Modal;
const { Search } = Input;


const { Option } = Select;

function onChange (date,dateString) {
    console.log(date,dateString)
}

class DisContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchParams: {
                id: 0,
                transContractId: 0
            },
            to_id: getUser(getAuth()).id,
            visible: false,
            record: {},
            fileList: [],
            companyList:[],
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '合同编号',
                    dataIndex: 'contract_id',
                    key: 'contract_id',
                },
                {
                    title: '物流合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '物流公司',
                    dataIndex: 'from_id',
                    key: 'from_id',
                    render: (from_id) => (
                        <span>{ getUserName(from_id) }</span>
                    )
                },
                {
                    title: '发起时间',
                    dataIndex: 'time',
                    key: 'time',
                    render: (time) => (
                        <span>{formatTime(time)}</span>
                    )
                },
                // {
                //     title: '签署时间',
                //     dataIndex: 'signTime',
                //     key: 'signTime',
                //     render: (time) => (
                //         <span>{formatTime(time)}</span>
                //     )
                // },
                {
                    title: '货物名称',
                    dataIndex: 'gName',
                    key: 'gName',
                },
                // {
                //     title: '货物数量（件）',
                //     dataIndex: 'quantity',
                //     key: 'quantity',
                // },
                {
                    title: '物流费用（元）',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                        <span>{findValue($common.status, status)}</span>
                    )
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    key: 'operate',
                    render: (text, record) => (
                        <Button disabled={record.contractStatus==='SIGNED'} onClick={()=>this.handleOpenModal(record)}>签署</Button>
                    )
                },
            ]
        }
    }
    async loadList() {
        let params = {
            to_id: this.state.to_id,
            status: 'CREATED'
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item]
            }
        }
        const res =  await $common.logisticConsList(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item, idx) => {
                item.order = idx+1;
                item.key = item.id;
                item.gName = "goods";
            });
            this.setState(() => ({
                list: list
            }));
        }
    }
    async loadCompanyList() {
        const res = await $common.logenterpriseList();
        if(res.data.success){
            this.setState({companyList: res.data.result});
        }
    }
    handleOpenModal = async(record) => {
        await setStateAsync(this, {record: record})
        await setStateAsync(this, {visible: true});
    }
    handleSign = async () => {
        this.setState({visible: false})
        let form = new FormData();
        form.append('file', this.state.fileList[0]);

        const res = await $common.checkLogisicContract(form);

        const self = this;
        if(res.data.success){
          confirm({
            title: '确认签署', 
            content: '文本合同校验一致，请您确认是否签署',
            async onOk() {
              let params = {
                  id: self.state.record.id,
                  sign: true
              }
              const resp = await $common.signLogisticContract(params);
              if(resp.data.success){
                message.success("签署成功！");
                self.loadList();
              }
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }else if(!res.data.success){
          message.error("文本合同校验失败，请您确认")
        }
      }
      handleCancel = ()=>{
        this.setState({visible: false})
      }
      handleUploadChange = (info) => {
        const { status } = info.file;
        // 限制只上传1个
        let fileList = [...info.fileList];
        fileList = fileList.slice(-1);
        this.setState({fileList})
        if(status === 'done'){
            message.success('上传成功')
        }
      }
      handleBeforeUpload = (file) => {
        this.setState(state => ({
            fileList: [file],
        }));
        return false;
      }
    // handleSign(record){
    //     let self = this;
    //     confirm({
    //         title: '确定签署',
    //         content: `您确定真的要签署${record.goodsName}的货物物流合同吗？注意该操作不可撤回`,
    //         onOk() {
    //           console.log('OK');
    //         },
    //         onCancel() {
    //           console.log('Cancel');
    //         },
    //     });
    // }
    handletransContractIdChange = async(id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {transContractId: id})
        await setStateAsync(this, {searchParams})
        this.loadList();
    }
    handleContractIdChange = async(id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {id: id})
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
                        <Form.Item label="物流合同编号">
                            <Search
                                placeholder="请输入物流合同编号"
                                onSearch={this.handletransContractIdChange}
                                style={{ width: 200 }}
                            />
                        </Form.Item>
                        <Form.Item label="物流公司">
                            <Select  style={{ width: 200 }}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        {/* <Form.Item label="合同编号">
                            <Search
                                placeholder="请输入合同编号"
                                onSearch={this.handleContractIdChange}
                                style={{ width: 200 }}
                            />
                        </Form.Item> */}
                    </Form>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                    <Modal
                      title="签署合约"
                      visible={this.state.visible}
                      onOk={this.handleSign}
                      onCancel={this.handleCancel}
                    >
                      <Row>
                        <Col span={4}>
                          文本合同
                        </Col>
                        <Col span={20}>
                          <Upload {...uploadProps} fileList={this.state.fileList} beforeUpload={this.handleBeforeUpload}>
                              <Button>
                                  <Icon type="upload" /> Upload
                              </Button>
                          </Upload>
                        </Col>
                      </Row>
                    </Modal>
                </main>
            </Card>
        )
    }
}

export default DisContract;
