/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col,DatePicker} from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $supply from '../../console/supply';
const {MonthPicker,RangePicker,WeekPicker}=DatePicker;
const { Option } = Select;

function onChange(date,dateString){
    console.log(date,dateString)
}

const columns=[
    {
        title: '序号',
        dataIndex: 'order',
        key: 'order',
    },
    {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '公司名称',
        dataIndex: 'company',
        key: 'company',
    },
    {
        title: '交易金额',
        dataIndex: 'amount',
        key: 'amount',
    },
    {
        title: '提交时间',
        dataIndex: 'submitTime',
        key: 'submitTime',
    },
    {
        title: '审核结果',
        dataIndex: 'result',
        key: 'result',
    },
    {
        title: '审核时间',
        dataIndex: 'checkTime',
        key: 'checkTime',
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

class DistributionContract extends React.Component{
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
                <header className="header2">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="公司名称">
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
                        <Form.Item label="交易类型">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <Select>
                                            <Option value="test1">不限</Option>
                                            <Option value="test1">兑付</Option>
                                            <Option value="test2">赎回</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </Form.Item>
                        <Form.Item label="审核日期">
                            <div className="gutter-example">
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={6}>
                                        <br />
                                        <RangePicker onChange={onChange} />
                                        <br />
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

export default DistributionContract;