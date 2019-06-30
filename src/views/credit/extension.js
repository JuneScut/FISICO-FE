/* eslint-disable no-unused-vars */
import React from 'react'
import {Card, Form, Select, Input, Button, Table, Upload, Icon, Row, Col} from 'antd';
import './style.scss';
import $enterprise from '../../console/enterprise';
import $supply from '../../console/supply';
const { Option } = Select;


class Exensions extends React.Component{
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
                    title: '公司名称',
                    dataIndex: 'company',
                    key: 'company',
                },
                {
                    title: '授信额度',
                    dataIndex: 'quota',
                    key: 'quota',
                },
                {
                    title: '修改时间',
                    dataIndex: 'changeTime',
                    key: 'changeTime',
                },
                {
                    title: '修改历史',
                    dataIndex: 'changeLog',
                    key: 'changeLog',
                }
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
                        <Form.Item label="公司名称">
                          <Select>
                              <Option value="test1">不限</Option>
                              <Option value="test2">1</Option>
                              <Option value="test3">2</Option>
                              <Option value="test4">3</Option>
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

export default Exensions;