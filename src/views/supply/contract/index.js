import React from 'react'
import { Card, Form, Select, Table,  DatePicker } from 'antd';
import "../../../common/style.scss"
import { findValue, formatTime, setStateAsync } from '../../../utils/tool.js';
// import $supply from '../../../console/supply';
import $common from '../../../console/common';
import { getAuth, getUser,getUserName } from '../../../utils/authority';
import Search from 'antd/lib/input/Search';
const { Option } = Select;
const { RangePicker } = DatePicker;

class SupplyContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            enterpriseList: [],
            contractIds: [],
            searchParams: {
                id: 0,
                beginTime:0,
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
                    title: '合同编号',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: '发起时间',
                    dataIndex: 'time',
                    key: 'createTime',
                    render: beginTime => (
                        <span>
                            { formatTime(beginTime) }
                        </span>
                    )
                  },
                  {
                    title: '货物名称',
                    dataIndex: 'gName',
                    key: 'gName',
                  },
                  {
                    title: '供货量(件)',
                    dataIndex: 'supply',
                    key: 'supply',
                  },
                  {
                    title: '货物金额(元)',
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
                  {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: status => (
                        <span>
                            {findValue($common.status, status)}
                        </span>
                    )
                  },
            ]
        }
    }
    loadEnterpriseList = async() => {
        const res = await $common.enterpriseList();
        this.setState({enterpriseList: res.data.result});
    }
    async loadList(extensions) {
        let params = {
            from_id: getUser(getAuth).id
        }
        for(let item in this.state.searchParams){
            if(this.state.searchParams[item]){
                params[item] = this.state.searchParams[item];
            }
        }
        const res = await $common.getContractsList(params);
        if(res.data.success){
            let list = res.data.result;
            list.forEach((item,idx)=>{
                item.order = idx+1;
                item.key = item.id;
                item.gName = "goods"
            })
            this.setState({list})
        }
    }
    rangeChange = async(range) => {
        if(range.length){
            let searchParams = Object.assign({}, this.state.searchParams, {beginTime: range[0].valueOf(), endTime: range[1].valueOf()});
            await setStateAsync(this, {searchParams});
        }else{
            let searchParams = Object.assign({}, this.state.searchParams, {beginTime: 0, endTime: 0});
            await setStateAsync(this, {searchParams});
        }
        this.loadList();
    }
    handleContractIdChange = async(id) => {
        // let id = event.currentTarget.value;
        let searchParams = Object.assign({}, this.state.searchParams, {id:id})
        await setStateAsync(this, {searchParams})
        console.log(this.state.searchParams)
        this.loadList();
    }
    handleSignatoryChange = async (sign) => {
        let searchParams = Object.assign({}, this.state.searchParams, {to_id:sign})
        await setStateAsync(this, {searchParams: searchParams})  
        console.log(this.state.searchParams)

        this.loadList();
    } 
    componentWillMount(){
        this.loadList();
        this.loadEnterpriseList();
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
                            <Search onSearch={this.handleContractIdChange} allowClear></Search>
                        </Form.Item>
                        <Form.Item label="链上发起时间">
                            <RangePicker onChange={this.rangeChange}/>
                            <br />
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select onChange={this.handleSignatoryChange} allowClear>
                                {
                                    this.state.enterpriseList.map((enter) => (
                                        <Option value={enter.id} key={enter.id}>{enter.name}</Option>
                                    ))
                                }
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

export default SupplyContract;