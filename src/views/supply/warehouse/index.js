import React from 'react'
import { Card, Form, Input,Table } from 'antd';
import './style.scss';
import { formatTime, setStateAsync } from '../../../utils/tool.js';
import $supply from '../../../console/supply';
// const { Option } = Select;
const { Search } = Input;

class SupplierWarehouse extends React.Component{
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
            supplyId: 1
        }
        if(this.state.searchName){
            params['goodsName'] = this.state.searchName;
        }
        console.log(params);
        const res = await $supply.goodsList(params);
        let list = res.data.result;
        list.forEach((item, idx) => {
            item.order = idx+1;
            item.key = item.id;
        });
        // console.log(list)
        this.setState(() => ({
            list: list
        }));
        // console.log(this.state.list)
    }
    
    
    handleNameChange = async (value) => {
        // console.log(value)
        // console.log(this.setState)
        // this.setState(()=>({
        //     searchName: value
        // }))
        await setStateAsync(this, {searchName:value})
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
        return(
            <Card>
                <header className="header">
                    <Form {...formItemLayout} labelAlign="left">
                        <Form.Item label="货物名称">
                            {/* <Select onChange={this.handleNameChange}>
                                <Option value="0">不限</Option>
                                {
                                    this.state.list.map((item) => (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    ))
                                }
                            </Select> */}
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

export default SupplierWarehouse;