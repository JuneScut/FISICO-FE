/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col} from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $contract from '../../console/contract';
const { Option } = Select;

const columns=[
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
        title: '货物保险合同编号',
        dataIndex: 'insuranceId',
        key: 'insuranceId',
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
        title: '保险费用（元）',
        dataIndex: 'InsuranceCost',
        key: 'InsuranceCost',
    },
    {
        title: '保险合同状态',
        dataIndex: 'Insurancestatus',
        key: 'Insurancestatus',
    },
    {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
    },
];

const data = [
    {
        key: '1',
        order: '1',
    },
    {
        key: '1',
        order: '2',
    },
    {
        key: '1',
        order: '3',
    },
];

class InsuranceContract extends React.Component{
    async getData() {
        const res = await $enterprise.getData();
        // console.log(res);
    }
    async loadList() {
        const res = await $contract.list();

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
                    <Form {...formItemLayout} labelAlign={"left"}>
                        <Form.Item label="保险合同编号">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary">不限</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>选择+</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="链上签署时间">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary">不限</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>选择+</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary">不限</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>选择+</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">1</Option>
                                            <Option value="test2">2</Option>
                                            <Option value="test3">3</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Button type="primary">不限</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>选择+</Button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <Button>选择+</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                    </Form>
                </header>


                <Table
                    /* rowSelection={rowSelection}*/
                    columns={columns}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
                />

            </Card>
        )
    }
}


export default InsuranceContract;