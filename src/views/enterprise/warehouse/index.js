/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber } from 'antd';
import '../../../common/style.scss';
import $enterprise from '../../../console/enterprise';
import { getEnterId } from '../../../utils/authority';
import { formatTime, setStateAsync } from '../../../utils/tool.js';
const { Option } = Select;
const { Search } = Input;


class EnterWarehouse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            searchName: '',
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '货物名称',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: '当前库存量(件)',
                    dataIndex: 'stock',
                    key: 'stock',
                },
                {
                    title: '最新变动时间',
                    dataIndex: 'lastModified',
                    render: time => (
                        <span>
                            { formatTime(time) }
                        </span>
                    )
                }
            ]
        }
    }
    async loadList() {
        let params = {
            enterpriseId: getEnterId()
        }
        if(this.state.searchName){
            params['goodsName'] = this.state.searchName;
        }
        const res = await $enterprise.goodsList(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
        });
        this.setState(() => ({
            list: list
        }));
    }
    handleNameChange = async (name) => {
        await setStateAsync(this, {searchName:name})
        this.loadList();
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
                        <Form.Item label="货物名称">
                            <Search
                                placeholder="请输入货物名称"
                                onSearch={this.handleNameChange}
                                style={{ width: 200 }}
                            />
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

export default EnterWarehouse;