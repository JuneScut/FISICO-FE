import React from 'react'
import { Card, Form, Select, Table,  DatePicker } from 'antd';
import "../../../common/style.scss"
import { findValue, formatTime } from '../../../utils/tool.js';
import $supply from '../../../console/supply';
import moment from 'moment';
// import moment from 'moment';
const { Option } = Select;
const { RangePicker } = DatePicker;

class SupplyContract extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            enterpriseList: [],
            contractIds: [],
            searchParms: {
                id: 0,
                beginTime:moment().valueOf(),
                endTime: moment().valueOf(),
                enterpriseId: 0
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
                    dataIndex: 'beginTime',
                    key: 'beginTime',
                    render: beginTime => (
                        <span>
                            { formatTime(beginTime) }
                        </span>
                    )
                  },
                  {
                    title: '货物名称',
                    dataIndex: 'goodsName',
                    key: 'goodsName',
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
                    dataIndex: 'signtory',
                    key: 'signtory',
                  },
                  {
                    title: '签署时间',
                    dataIndex: 'signTime',
                    key: 'signTime',
                    render: signTime => (
                        <span>
                            { formatTime(signTime) }
                        </span>
                    )
                  },
                  {
                    title: '合同状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: status => (
                        <span>
                            {findValue($supply.status, status)}
                        </span>
                    )
                  },
            ]
        }
    }
    async loadEnterprise() {
        const res = await $supply.enterpriseList();
        let list = res.data.result;
        list.unshift({id: 0, name: '不限'});
        this.setState({enterpriseList: list})
        // console.log(this.state.enterpriseList)

    }
    async loadList(extensions) {
        let params = {
            supplyId: 1
        }
        
        const res = await $supply.contractList(params);
        let list = res.data.result;
        let tempArr = [];
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
            let temp = {value:item.id, title:item.id}
            tempArr.push(temp);
        });
        tempArr.unshift({value: 0, title: '不限'})
        this.setState(() => ({
            list: list,
            contractIds: tempArr
        }));
        // console.log(this.state.list)
    }
    rangeChange = (range) => {
        let beginTime = range[0].valueOf();
        let endTime = range[1].valueOf();
        console.log(beginTime, endTime)
        let searchParms = Object.assign({}, this.state.searchParm);
        searchParms.beginTime = beginTime;
        searchParms.endTime = endTime;
        console.log(searchParms)
        this.setState({searchParms})
        console.log(this.state.searchParms.beginTime, this.state.searchParms.endTime)
    }
    handleContractIdChange = (id) => {
        console.log('contract id', id)
    }
    handleSignatoryChange = (sign) => {
        console.log('sign', sign)
    } 
    componentWillMount(){
        this.loadList();
        this.loadEnterprise();
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
                            <Select
                             showSearch
                             optionFilterProp="children"
                             filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                             }
                             onChange={this.handleContractIdChange}
                             value={this.state.searchParms.id}
                            >
                                {
                                    this.state.contractIds.map((contract) => (
                                        <Option value={contract.value} key={contract.value}>{contract.title}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="链上签署时间">
                            <RangePicker onChange={this.rangeChange}/>
                            <br />
                        </Form.Item>
                        <Form.Item label="合约签署方">
                            <Select onChange={this.handleSignatoryChange} value={this.state.searchParms.enterpriseId}>
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