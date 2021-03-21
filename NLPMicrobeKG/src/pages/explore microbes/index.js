import './index.css';
import React, { useState, useEffect } from 'react'
import { Input , Select} from 'antd';
import Header from '../../component/header'
import Footer from '../../component/footer'
import Fetch from '../../fecth.js';
import { Table } from 'antd';


const Explore =()=>{
    const [res, setRes] = useState(0);
    const [data, setData] = useState([]);
    const [type, setType] = useState('text');
    const [columns, setColumns] = useState([]);
    const onSearch = (value) => {
        Fetch(`search?search_type=${type}&query=${value}&limit=${1000}&page=${0}`)
            .then((response) => {
                setRes(1);
                if(type === 'data')
                setData(response.data?.map((item,index) =>(
                    {
                        key:index,
                        BacName: item.bacname,
                        ModuleName: item.modulename,
                        CompoundName: item.compoundname,
                        Mount: item.mount,
                        Unit: item.unit,
                        FoodName: item.foodname,
                        FoodId: item.foodid
                    }
                )))
                else
                    setData(response.data?.map((item, index) => (
                        {
                            key: index,
                            BacName:  item.bacname,
                            Bac2Name: {
                                name: item.bac2name,
                                ref: item.ref2
                            },
                            Bac3Name: {
                                name: item.bac3name,
                                ref: item.ref3
                            },
                            Bac4Name: {
                                name: item.bac4name,
                                ref: item.ref4
                            },
                            Disname: {
                                name: item.disname,
                                ref: item.reference
                            },
                            Reference: item.reference,
                            Ref2: item.ref2,
                            Ref3: item.ref3,
                            Ref4: item.ref4
                        }
                    ))) 
            })
    }
    const handleChange = (value) => {
       setType(value) 
    } 

    useEffect(() =>{
        if(type === 'data'){
            setColumns(
                [
                    {
                        title: 'BacName',
                        dataIndex: 'BacName',
                    },
                    {
                        title: 'ModuleName',
                        dataIndex: 'ModuleName',
                        sorter: {
                            compare: (a, b) => a.ModuleName - b.ModuleName,
                            multiple: 3,
                        },
                    },
                    {
                        title: 'CompoundName',
                        dataIndex: 'CompoundName',
                        sorter: {
                            compare: (a, b) => a.CompoundName - b.CompoundName,
                            multiple: 2,
                        },
                    },
                    {
                        title: 'Mount',
                        dataIndex: 'Mount',
                        sorter: {
                            compare: (a, b) => a.Mount - b.Mount,
                            multiple: 1,
                        },
                    },
                    {
                        title: 'Unit',
                        dataIndex: 'Unit',
                        sorter: {
                            compare: (a, b) => a.Unit - b.Unit,
                            multiple: 1,
                        },
                    },
                    {
                        title: 'FoodId',
                        dataIndex: 'FoodId',
                        sorter: {
                            compare: (a, b) => a.FoodId - b.FoodId,
                            multiple: 1,
                        },
                    }, 
                    {
                        title: 'FoodName',
                        dataIndex: 'FoodName',
                        sorter: {
                            compare: (a, b) => a.FoodName - b.FoodName,
                            multiple: 1,
                        },
                    },
                ] 
            )
        }
        else{
            setColumns(
                [
                    {
                        title: 'BacName',
                        dataIndex: 'BacName',
                    },
                    {
                        title: 'Bac2Name',
                        dataIndex: 'Bac2Name',
                        sorter: {
                            compare: (a, b) => a.Bac2Name - b.Bac2Name,
                            multiple: 3,
                        },
                        render: (obj) => <a href={obj.ref}>{obj.name}</a>,
                    },
                    {
                        title: 'Bac3Name',
                        dataIndex: 'Bac3Name',
                        sorter: {
                            compare: (a, b) => a.Bac3Name - b.Bac3Name,
                            multiple: 2,
                        },
                        render: (obj) => <a href={obj.ref}>{obj.name}</a>,
                    },
                    {
                        title: 'Bac4Name',
                        dataIndex: 'Bac4Name',
                        sorter: {
                            compare: (a, b) => a.Bac4Name - b.Bac4Name,
                            multiple: 1,
                        },
                        render: (obj) => <a href={obj.ref}>{obj.name}</a>,
                    },
                    {
                        title: 'Disname',
                        dataIndex: 'Disname',
                        sorter: {
                            compare: (a, b) => a.Disname - b.Disname,
                            multiple: 1,
                        },
                        render: (obj) => <a href={obj.ref}>{obj.name}</a>,
                    },
                ]
            )
        }
        setData([])
    },[type])


    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const {Search} = Input
    const {Option} = Select
    return (
        <div className="body">
            <Header></Header>
            <main>
                <div className="container">
                    <div className="title">EXPLORE MICROBES</div>
                    <div className="context">The following two parts of the data query are text mining and data fusion.
                    Give a bacteria name to get the results.
                    </div>
                    <Select defaultValue="text" className="select" onChange={handleChange}>
                        <Option value="text">Text Mining</Option>
                        <Option value="data">Data fusion</Option>
                    </Select>
                    <Search className="filter" 
                    placeholder="Enter a filter term"
                    onSearch={onSearch}
                    ></Search>
                    {!res?<div className="noneresult">
                        There is no result for the search.
                    </div>:
                        <Table columns={columns} pagination={{ pageSize: 5 }} dataSource={data} onChange={onChange} className="result"></Table>}
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Explore;