import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber } from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $contract from '../../console/supply';
const { Option } = Select;

class OutWarehouse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            columns:
                [
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
                        title: '收货公司',
                        dataIndex: 'getCompany',
                        key: 'getCompany',
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
                        title: '货物金额（元）',
                        dataIndex: 'goodsValue',
                        key: 'goodsValue',
                    },
                    {
                        title: '保险公司',
                        dataIndex: 'Insurance',
                        key: 'Insurance',
                    },
                    {
                        title: '出库状态',
                        dataIndex: 'outStatus',
                        key: 'outStatus',
                    },
                    {
                        title: '物流公司',
                        dataIndex: 'logisticsStatus',
                        key: 'logisticsStatus',
                    },
                    {
                        title: '出库时间',
                        dataIndex: 'inTime',
                        key: 'inTime',
                    },
                    {
                        title: '操作',
                        dataIndex: 'operate',
                        key: 'operate',
                    },
                ]
        }
    }
    async loadList() {
        let params = {
            supplyId: 1
        }
        const res = await $contract.list(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
        });
        this.setState(() => ({
            list: list
        }));
        console.log(this.state.list)
    }
    componentWillMount(){
        this.loadList();
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
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="出库状态">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">未出库</Option>
                                <Option value="test3">已出库</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="合同编号">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="货物名称">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">测试1</Option>
                                <Option value="test3">测试2</Option>
                                <Option value="test4">测试3</Option>
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

export default OutWarehouse;