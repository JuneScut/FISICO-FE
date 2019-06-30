/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber } from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $supply from '../../console/supply';
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
                    title: '支出/收入',
                    dataIndex: 'flow',
                    key: 'flow',
                },
                {
                    title: '交易金额(Token)',
                    dataIndex: 'amount',
                    key: 'amount',
                },
                {
                    title: '交易时间',
                    dataIndex: 'time',
                    key: 'time',
                }
            ]
        }
    }
    async loadList() {
        let params = {
            supplyId: 1
        }
        const res = await $supply.contractList(params);
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
                        <Form.Item label="交易类型">
                            <Select>
                                <Option value="test1">不限</Option>
                                <Option value="test2">订单</Option>
                                <Option value="test3">物流</Option>
                                <Option value="test4">保险</Option>
                                <Option value="test5">银行兑付</Option>
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
                    </Form>
                    <div className="header3" >
                        <p>公司Token余额：</p>
                    </div>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                </main>
            </Card>
        )
    }
}

export default CreateContract;