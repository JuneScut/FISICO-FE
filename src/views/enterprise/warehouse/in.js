import React from 'react'
import { Card, Form, Select, Table } from 'antd';
import './style.scss';
// import $enterprise from '../../../console/enterprise';
import $supply from '../../../console/supply';
const { Option } = Select;

class InWarehouse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            columns:
                [
                    {
                        title: '序号',
                        dataIndex: 'order',
                    },
                    {
                        title: '合同编号',
                        dataIndex: 'id',
                    },
                    {
                        title: '合同发起人',
                        dataIndex: 'id',
                    },
                    {
                        title: '签署时间',
                        dataIndex: 'signTime',
                    },
                    {
                        title: '货物名称',
                        dataIndex: 'goodsName',
                    },
                    {
                        title: '货物数量（件）',
                        dataIndex: 'goodsNum',
                    },
                    {
                        title: '货物金额（元）',
                        dataIndex: 'goodsValue',
                    },
                    {
                        title: '物流状态',
                        dataIndex: 'logisticsStatus',
                    },
                    {
                        title: '物流公司',
                        dataIndex: 'logistics',
                    },
                    {
                        title: '入库时间',
                        dataIndex: 'inTime',
                    },
                    {
                        title: '操作',
                        dataIndex: 'operate',
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
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
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

export default InWarehouse;