import React from 'react'
import { Card, Form, Select, Table } from 'antd';
import './style.scss';
const { Option } = Select;

class ReceiveContract extends React.Component{
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
                    title: '发起企业',
                    dataIndex: 'enterprise',
                    key: 'enterprise',
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
                    title: '货物名称',
                    dataIndex: 'goodsName',
                    key: 'goodsName',
                  },
                  {
                    title: '货物金额（元）',
                    dataIndex: 'money',
                    key: 'money',
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
                  {
                    title: '操作',
                    key: 'option',
                  },
            ]
        }
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
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout}labelAlign="left">
                        <Form.Item label="合同编号">
                            <Select>
                                <Option value="test1">测试1</Option>
                                <Option value="test2">测试2</Option>
                                <Option value="test3">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="发起时间">
                            <Select>
                                <Option value="test1">测试1</Option>
                                <Option value="test2">测试2</Option>
                                <Option value="test3">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="合约发起企业">
                            <Select>
                                <Option value="test1">测试1</Option>
                                <Option value="test2">测试2</Option>
                                <Option value="test3">测试3</Option>
                            </Select>
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

export default ReceiveContract;