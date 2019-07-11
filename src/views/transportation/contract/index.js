/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Form, Select, Input, Button, Table, Upload, Icon, InputNumber,DatePicker } from 'antd';
import '../../../common/style.scss';
import { getTransId } from '../../../utils/authority';
import $transportation from '../../../console/transportation';
import $common from '../../../console/common';
import { formatTime, findValue } from '../../../utils/tool.js';
import { getAuth, getUser, getUserName } from '../../../utils/authority';


const { Option } = Select;
const { RangePicker } = DatePicker;

function onChange (date,dateString) {
    console.log(date,dateString)
}

class TransContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            companyList: [],
            searchParams: {
                id: 0,
                beginTime: 0,
                endTime: 0,
                to_id: 0
            },
            columns: [
                {
                    title: '序号',
                    dataIndex: 'order',
                    key: 'order',
                },
                {
                    title: '物流合同编号',
                    dataIndex: 'id',
                    key: 'id',
                },
                {
                    title: '合同编号',
                    dataIndex: 'contract_id',
                    key: 'contract_id',
                },
                {
                    title: '发起时间',
                    dataIndex: 'time',
                    key: 'time',
                    render: (time) => (
                        <span>{ formatTime(time) }</span>
                    )
                },
                {
                    title: '物流费用（元）',
                    dataIndex: 'price',
                    key: 'price',
                },
                {
                    title: '签署人',
                    dataIndex: 'to_id',
                    key: 'to_id',
                    render: (to_id) => (
                        <span>{getUserName(to_id)}</span>
                    )

                },
                // {
                //     title: '物流合同签署时间',
                //     dataIndex: 'signTime',
                //     key: 'signTime',
                // },
                {
                    title: '物流合同状态',  
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => (
                        <span>{findValue($common.status, status)}</span>
                    )
                }
            ]
        }
    }
    loadList = async() => {
        let params = {
            from_id: getUser(getAuth).id            
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $common.logisticConsList(params);
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
    handleIdChange = (e)=>{
        let id = e.currentTarget.value;
        let searchParams = Object.assign({}, this.state.searchParams, {id:id})
        this.setState({searchParams})
    }
    handleSupplyChange = (id) => {
        let searchParams = Object.assign({}, this.state.searchParams, {to_id:id})
        this.setState({searchParams})
    }
    handleRangeChange = (time) => {
        let searchParams = Object.assign({}, this.state.searchParams, {beginTime:time[0].valueOf(),endTime:time[1].valueOf()})
        this.setState({searchParams})
    }
    loadCompanyList = async()=>{
        const res = await $common.supplyList();
        this.setState({companyList: res.data.result})
    }
    componentWillMount(){
        this.loadList();
        this.loadCompanyList();
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
                        <Form.Item label="物流合同编号">
                            <Input style={{'width': '230px'}}  onChange={this.handleIdChange}/>                                                        
                        </Form.Item>
                        <Form.Item label="链上签署时间">
                            <RangePicker onChange={this.handleRangeChange} style={{'width': '230px'}}/>
                            <br />
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select onChnage={this.handleSupplyChange} style={{'width': '230px'}}>
                                {
                                    this.state.companyList.map((company) => (
                                        <Option value={company.id} key={company.id}>{company.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Button onClick={this.loadList}>查询</Button>
                    </Form>
                </header>

                <main>
                    <Table dataSource={this.state.list} columns={this.state.columns} bordered/>;
                </main>
            </Card>
        )
    }
}

export default TransContract;