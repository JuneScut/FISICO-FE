import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon } from 'antd';
import './style.scss';
const { Option } = Select;

class CreateContract extends React.Component{
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
                    title: '供货量(件)',
                    dataIndex: 'supply',
                    key: 'supply',
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
                <header className="header">
                    <Form {...formItemLayout}>
                        <Form.Item label="文本合同">
                            <Upload>
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select>
                                <Option value="test1">测试1</Option>
                                <Option value="test2">测试2</Option>
                                <Option value="test3">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="货物名称">
                            <Select>
                                <Option value="test1">测试1</Option>
                                <Option value="test2">测试2</Option>
                                <Option value="test3">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="供货量">
                            <Input />
                        </Form.Item>
                        <Form.Item label="金额">
                            <Input />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" >发起合同</Button>
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