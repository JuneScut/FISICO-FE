import React from 'react'
import { Card, Form, Select, Table, Button, Input,DatePicker, Modal, Upload, Icon, Row, Col, message } from 'antd';
import '../../../common/style.scss';
import $common from '../../../console/common';
import { findValue, formatTime, setStateAsync } from '../../../utils/tool.js';
import {  getUserName, getUser, getAuth } from '../../../utils/authority'

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const { confirm } = Modal;


class ReceiveContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            companyList: [],
            searchParams: {
              id: 0,
              beginTime: 0,
              endTime: 0,
              from_id: 0
            },
            visible: false,
            fileList: [],
            id: 0,
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
                  title: '发起者',
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
                  render: beginTime => (
                      <span>
                          { formatTime(beginTime) }
                      </span>
                  )
                },
                {
                  title: '贷款金额',
                  dataIndex: 'price',
                  key: 'price',
                },
                // {
                //   title: '签署人',
                //   dataIndex: 'signtory',
                //   key: 'signtory',
                //   render: (from_id) => (
                //     <span>{ getUserName(from_id) }</span>
                //   )
                // },
                // {
                //   title: '签署时间',
                //   dataIndex: 'signTime',
                //   key: 'signTime',
                //   render: signTime => (
                //       <span>
                //           { formatTime(signTime) }
                //       </span>
                //   )
                // },
                {
                  title: '合同状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: status => (
                      <span>
                          {findValue($common.status, status)}
                      </span>
                  )
                },
                {
                  title: '操作',
                  dataIndex: 'operation',
                  key: 'operation',
                  render: (text, record) => (
                    <Button disabled={record.status==='SIGNED'} onClick={()=>this.handleSign(record)}>签署</Button>
                  )
                },
          ]
        }
    }
    async loadList() {
      let params = {
        to_id: getUser(getAuth()).id
      }
      for(let item in this.state.searchParams){
          if(this.state.searchParams[item]){
              params[item] = this.state.searchParams[item]
          }
      }
      const res =  await $common.transferList(params);
      if(res.data.success){
          let list = res.data.result;
          list.forEach((item, idx) => {
              item.order = idx+1;
              item.key = item.id;
          });
          this.setState(() => ({
              list: list
          }));
      }
    }
    handleSign = (record) => {
      this.setState({visible: true})
      this.setState({id: record.id})
    }
    handleContractIdChange = async(id) =>{
      let searchParams = Object.assign({}, this.state.searchParams, {id: id})
      await setStateAsync(this, {searchParams})
      this.loadList();
    }
    rangeChange = async(time) => {
        let searchParams = {};
        if(time.length){
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: time[0].valueOf(), endTime:time[1].valueOf() })
        }else{
            searchParams = Object.assign({}, this.state.searchParams, {beginTime: 0, endTime:0 })
        }
        await setStateAsync(this, {searchParams})
        this.loadList()
    }
    handleCompanyChange = async(id) => {
      let searchParams = Object.assign({}, this.state.searchParams, {from_id: id})
      await setStateAsync(this, {searchParams})
      this.loadList();
    }
    componentWillMount(){
      this.loadList();
      this.loadCompanyList();
    }
    async loadCompanyList() {
      const res = await $common.bankList();
      if(res.data.success){
          this.setState({companyList: res.data.result});
      }
    }
    handleOk = async () => {
      let form = new FormData();
      form.append('file', this.state.fileList[0]);
      const res = await $common.checkTransferContract(form);

      const self = this;
      this.setState({visible: false})

      if(res.data.success){
        confirm({
          title: '确认签署',
          content: '文本合同校验一致，请您确认是否签署',
          async onOk() {
            let params = {
              id: self.state.id,
              sign: true
            }
            const resp = await $common.signContract(params);
            if(resp.data.success){
              message.success("签署成功！")
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
    // handleUploadChange = (info) => {
    //   const { status } = info.file;
    //   // 限制只上传1个
    //   let fileList = [...info.fileList];
    //   fileList = fileList.slice(-1);
    //   this.setState({fileList})
    //   if(status === 'done'){
    //       message.success('上传成功')
    //   }
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
              sm: { span: 3,},
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            }
        };
        const uploadProps = {
            multiple: false,
            // onChange: this.handleUploadChange
        }
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout}labelAlign="left">
                        <Form.Item label="合同编号">
                          <Search
                                placeholder="请输入合同编号"
                                onSearch={this.handleContractIdChange}
                            />
                        </Form.Item>
                        <Form.Item label="发起时间">
                          <RangePicker onChange={this.rangeChange} />
                        </Form.Item>
                        <Form.Item label="发起银行">
                          <Select   onChange={this.handleCompanyChange}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
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

export default ReceiveContract;