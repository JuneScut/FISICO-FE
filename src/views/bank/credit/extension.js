/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col, Modal} from 'antd';
import "../../../common/style.scss";
import $bank from '../../../console/bank';
import $supply from '../../../console/supply';
import { findValue, formatTime,setStateAsync } from "../../../utils/tool"

const { Option } = Select;
const { Column } = Table;

class Exensions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            visible: false,
            searchCompany: '',
            history: [],
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '公司名称',
                    dataIndex: 'companyName',
                    key: 'companyName',
                },
                {
                    title: '授信额度',
                    dataIndex: 'credit',
                    key: 'credit',
                },
                {
                    title: '修改时间',
                    dataIndex: 'lastModified',
                    key: 'lastModified',
                    render: time => (
                        <span>
                            { formatTime(time) }
                        </span>
                    )
                },
                {
                    title: '修改历史',
                    dataIndex: 'changeLog',
                    key: 'changeLog',
                    render: (text, record) => (
                        <Button onClick={()=>this.openModal(record)}>查看</Button>
                    )
                }
            ]
        }
    }
    loadList = async () => {
        let params = {
            bankId: 5,
        }
        if(this.state.searchCompany){
            params.role = this.state.searchCompany
        }
        const res = await $bank.creditList();
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item, idx) => {
                item.key = idx;
                item.order = idx+1;
            })
            this.setState({list})
        }   
    }
    openModal = async(record) => {
        let params = {
            bankId: 5,
            id: record.id,
            role: record.role
        }
        let res = await $bank.tokenHistory(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item, idx) => {
                item.key = idx;
            })
            this.setState({history: res.data.result})
            this.setState({visible: true})
        }
    }
    
    handleCancel = async() => {
        await setStateAsync(this, {visible: false})        
    }
    componentWillMount(){
        // console.log($enterprise.getData())
        this.loadList();
    }
    handleCompanyChange = async(company) => {
        await setStateAsync(this, {searchCompany: company})
        this.loadList();
    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: {
                    span: 2,
                },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            }
        };
        const buttonItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 6,
                }
            }
        };
        const modalFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            }
        };
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="公司名称">
                          <Select onChange={this.handleCompanyChange}>
                                <Option value="ALL">不限</Option>
                                <Option value="S">上游供应商</Option>
                                <Option value="E">核心企业</Option>
                                <Option value="T">物流公司</Option>
                                <Option value="I">保险公司</Option>
                          </Select>
                        </Form.Item>
                    </Form>
                </header>


                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                    <Modal
                        title="修改历史"
                        visible={this.state.visible}
                        footer = {null}
                        onCancel={this.handleCancel}
                        >
                        <Table {...modalFormItemLayout} labelAlign="left" dataSource={this.state.history}>
                            <Column title="授信额度" dataIndex="credit" key="credit" />
                            <Column title="修改时间" dataIndex="lastModified" key="lastModified" 
                            render={(time)=> (<span>{formatTime(time)}</span>)}/>
                        </Table>
                    </Modal>
                </main>

            </Card>
        )
    }
}

export default Exensions;