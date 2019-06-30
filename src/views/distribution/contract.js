/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col} from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $supply from '../../console/supply';
const { Option } = Select;



class DistributionContract extends React.Component{
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
                    title: '物流合同编号',
                    dataIndex: 'wid',
                    key: 'wid',
                },
                {
                    title: '物流公司',
                    dataIndex: 'wcompany',
                    key: 'wcompany',
                },
                {
                    title: '发起时间',
                    dataIndex: 'beginTime',
                    key: 'beginTime',
                },
                {
                    title: '签署时间',
                    dataIndex: 'signTime',
                    key: 'signTime',
                },
                {
                    title: '货物名称',
                    dataIndex: 'goodsName',
                    key: 'goodsName',
                },
                {
                    title: '货物数量（件）',
                    dataIndex: 'goodsNum',
                    key: 'goodsNum',
                },
                {
                    title: '物流费用（元）',
                    dataIndex: 'logisticsCost',
                    key: 'logisticsCost',
                },
                {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                },
                {
                    title: '操作',
                    dataIndex: 'operate',
                    key: 'operate',
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
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="物流合同编号">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">不限</Option>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="物流公司">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">不限</Option>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">不限</Option>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
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

export default DistributionContract;