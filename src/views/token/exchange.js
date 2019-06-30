/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col,DatePicker} from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $supply from '../../console/supply';
const { Option } = Select;


class Token extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '兑付Token',
                    dataIndex: 'token',
                    key: 'token',
                },
                {
                    title: '兑付银行',
                    dataIndex: 'bank',
                    key: 'bank',
                },
                {
                    title: '发起兑付时间',
                    dataIndex: 'turnBegin',
                    key: 'turnBegin',
                },
                {
                    title: '兑付状态',
                    dataIndex: 'turnstatus',
                    key: 'turnstatus',
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
        const res = await $enterprise.getData();
        // console.log(res);
    }
    async loadList() {
        const res = await $supply.contractList();

    }
    componentWillMount(){
        // console.log($enterprise.getData())
        this.getData();
        this.loadList();
    }
    render(){
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: {
                    span: 2,
                    offset: 1
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
                    offset: 0
                },
                sm: {
                    span: 6,
                    offset: 1
                }
            }
        };
        return(
            <Card>
                <div className="header1">
                    <p>公司Token余额：</p>
                    <p>公司资产（元）：</p>
                </div>
                <header className="header2">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="兑付银行">
                            <Select>
                                <Option value="test1">测试1</Option>
                                <Option value="test2">测试2</Option>
                                <Option value="test3">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="兑付Token额度">
                            <Input />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" >发起兑付</Button>
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

export default Token;