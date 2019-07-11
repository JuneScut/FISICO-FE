/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker,Modal, Row, Col, message } from 'antd';
import '../../../common/style.scss';
import $transportation from '../../../console/transportation';
import $common from '../../../console/common';
import { getTransId } from '../../../utils/authority';
import { formatTime, findValue } from '../../../utils/tool.js';
import { getAuth, getUser, getUserName } from '../../../utils/authority';

const { Option } = Select;
const { confirm } = Modal;


function onChange (date,dateString) {
    console.log(date,dateString)
}

class InsuranceContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            companyList: [],
            searchParams: {
                id: 0,
                contract_id: 0,
                from_id: 0
            },
            visible: false,
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
                    title: '物流保险合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '发起时间',
                    dataIndex: 'time',
                    key: 'time',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                // {
                //     title: '签署时间',
                //     dataIndex: 'signTime',
                //     key: 'signTime',
                //     render: (time) => (
                //         <span>{ formatTime(time) }</span>
                //     )
                // },
                {
                    title: '货物名称',
                    dataIndex: 'gName',
                    key: 'gName',
                },
                {
                    title: '货物数量',
                    dataIndex: 'supply',
                    key: 'supply',
                },
                {
                    title: '保险金额（元）',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '保险合同状态',
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
                       <Button disabled={record.insuranceContractStatus==='SIGNED'} onClick={()=>this.handleSign(record)}>签署</Button>
                   )
               }
            ]
        }
    }
    loadList = async() => {
        let params = {
            to_id: getUser(getAuth()).id,
            status: 'CREATED'
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $common.insureConsList(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
            item.gName = "goods"
        });
        this.setState(() => ({
            list: list
        }));
    }
    loadCompanyList = async()=>{
        const res = await $common.insenterpriseList();
        this.setState({companyList: res.data.result})
    }
    handleInsConsIdChange = (e)=>{
        let id = e.currentTarget.value;
        let searchParams = Object.assign({}, this.state.searchParams, {id:id})
        this.setState({searchParams})
    }
    handleIdChange = (e)=>{
        let id = e.currentTarget.value;
        let searchParams = Object.assign({}, this.state.searchParams, {contract_id:id})
        this.setState({searchParams})
    }
    handleInsChange = (id) => {
        console.log(id)
        let searchParams = Object.assign({}, this.state.searchParams, {from_id:id})
        this.setState({searchParams})
    }
    handleRangeChange = (time) => {
        let searchParams = Object.assign({}, this.state.searchParams, {beginTime:time[0].valueOf(),endTime:time[1].valueOf()})
        this.setState({searchParams})
    }
    handleTypeChange = (type) => {
        let searchParams = Object.assign({}, this.state.searchParams, {type: type})
        this.setState({searchParams})
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
      handleSign = (record) => {
        this.setState({visible: true})
        this.setState({contractId: record.id})
      }
      handleOk = async () => {
        let form = new FormData();
        form.append('file', this.state.fileList[0]);
        const res = await $common.checkInsuranceContract(form);
        this.setState({visible: false})

        let self = this;
        if(res.data.success){
          confirm({
            title: '确认签署',
            content: '文本合同校验一致，请您确认是否签署',
            async onOk() {
              let params = {
                id: self.state.contractId,
                sign: true
              }
              const resp = await $common.signInsuranceContract(params);
              if(resp.data.success){
                message.success("签署成功！")
                self.loadList();
              }else{
                message.error("签署失败，请校验");
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
    componentWillMount(){
        this.loadList();
        this.loadCompanyList();
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
                        <Form.Item label="保险合同编号">
                            <Input onChange={this.handleInsConsIdChange}/>                                                        
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Input onChange={this.handleIdChange}/>                                                        
                        </Form.Item>
                        <Form.Item label="保险公司">
                            <Select onChange={this.handleInsChange}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                    <Button onClick={this.loadList}>查询</Button>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                    <Modal
                      title="签署合约"
                      visible={this.state.visible}
                      onOk={this.handleOk}
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

export default InsuranceContract;