import './index.css';
import React, { useState, useEffect } from 'react'
import { Input , Select} from 'antd';
import Header from '../../component/header'
import Footer from '../../component/footer'
import Fetch from '../../fecth.js';
import { Table } from 'antd';
import { Link } from "react-router-dom";

const Explore =(props)=>{
    const { name , column ,init , text} = props
    const [res, setRes] = useState(0);
    const [data, setData] = useState([]);
    const [type, setType] = useState(init);
    const [columns, setColumns] = useState([]);
    const [initStatus, setInitStatus] = useState(false);

    const mkgInitValues = ["Prevotella intermedia",
        "Haemophilus influenzae",
        "Staphylococcus aureus",
        "Escherichia coli",
        "Shigella flexneri"];

    const mdInitValues = [""];

    let initData = [];
    let initDataLen = 0;

    const shuffle = (arr) =>  {
        let m = arr.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = arr[m];
            arr[m] = arr[i];
            arr[i] = t;
        }
        return arr;
    }

    const setRespData = (respData, init) => {
        if (init) {
            initDataLen ++;
            if (respData !== undefined) {
                initData = [...initData, ...respData];
            }
            if (initDataLen === mkgInitValues.length) {
                initData = shuffle(initData);
                initData.map((value, index) => {
                    value.key = index;
                })
                setData(initData);
                setRes(1);
            }
        } else {
            setData(respData);
            setRes(1);
        }
    }

    // init -> append
    const fetchData = (value, init) => {
        let limit = 1000;
        if (init) {
            limit = 10;
        }

        let respData;
        if(name === "MicrobeKG"){
            Fetch(`search/microbe?search_type=${type}&query=${value}&limit=${limit}&page=${0}`,`GET`)
                .then((response) => {
                    // setRes(1);
                    if(type === 'data'){
                        respData = response?.data?.map((item,index) =>(
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
                        ))
                    } else if(type === 'text')
                        respData = response?.data?.map((item, index) => (
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
                        ))
                    setRespData(respData, init);
                })
        } else {
            Fetch(`search/mdepression?search_type=${type}&query=${window.btoa(value)}&limit=${limit}&page=${0}`,`GET`)
                .then((response) =>{
                    // setRes(1);
                    if(type === 'diseases'){
                        respData = response?.data?.map((item, index) => ({
                            key: index,
                            MDD: 'Major depressive disorder',
                            Bacteria: item.bacname,
                            Relevant_Disease: {
                                name:item.relevant_disease,
                                ref: item.syndrome
                            },
                            Type: item.type
                        }))
                    }else{
                        respData = response?.data?.map((item, index) => ({
                            key: index,
                            MDD: 'Major depressive disorder',
                            Bacteria: item.bacname||'NULL',
                            Compound: item.compoundname,
                            Food: item.food,
                            Type: item.type
                        }))
                    }

                    setRespData(respData, init);
                })
        }
    }

    const onSearch = (value) => {
        fetchData(value, false);
    }

    const handleChange = (value) => {
        initData = [];
        initDataLen = 0;
        setData([]);
        setType(value);
        setInitStatus(false);
    }

    const initPage = () => {
        if (!initStatus) {
            if(name === "MicrobeKG"){
                mkgInitValues.map((value, index) => {
                    fetchData(value, true)
                });
                setInitStatus(true);
            } else {
                mdInitValues.map((value, index) => {
                    fetchData(value, true)
                });
                setInitStatus(true);
            }
        }
    }

    useEffect(() =>{
        if(type === 'data' || type === 'diseases'){
            setColumns(column[0])
        }
        else{
            setColumns(column[1])
        }
        setData([])
    },[type])

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    const {Search} = Input
    const {Option} = Select

    initPage();
    return (
        <div className="body">
            <Header title={name}></Header>
            <main>
                <div className="container">
                    <div className="title">EXPLORE {name === "MicrobeKG" ?"MICROBES":"DEPRESSION"}</div>
                    <div className="context">{text}
                    </div>
                    {name === "MicrobeKG" ? <Select defaultValue="text" className="select" onChange={handleChange}>
                        <Option value="text">Text Mining</Option>
                        <Option value="data">Data fusion</Option>
                    </Select>:
                        <Select defaultValue="diseases" className="select" onChange={handleChange}>
                            <Option value="diseases">Diseases</Option>
                            <Option value="food">Food</Option>
                        </Select>
                    }
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

const Index = ({ match }) => {
    const { name } = match.params;
    const columnMicrobe = [[{
        title: 'BacName',
        dataIndex: 'BacName',
        render: (names) => <Link to={{pathname: `/visualization/${name}`,state:{nodeName : names}}} >{names}</Link>
    },
        {
            title: 'ModuleName',
            dataIndex: 'ModuleName',
            sorter: {
                compare: (a, b) => a.ModuleName - b.ModuleName,
                multiple: 3,
            },
            render: (names) => <Link to={{ pathname: `/visualization/${name}`, state: { nodeName: names } }} >{names}</Link>
        },
        {
            title: 'CompoundName',
            dataIndex: 'CompoundName',
            sorter: {
                compare: (a, b) => a.CompoundName - b.CompoundName,
                multiple: 2,
            },
            render: (names) => <Link to={{ pathname: `/visualization/${name}`, state: { nodeName: names } }} >{names}</Link>
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
            render: (names) => <Link to={{ pathname: `/visualization/${name}`, state: { nodeName: names } }} >{names}</Link>
        },], [{
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
            },]];
    const textMicrobe = "The following two parts of the data query are text mining and data fusion.Give a bacteria name to get the results."
    const textDepression ="The following two parts of the data query are concurrent diseases and nutrition food. Giving a standard term can get the results."
    const columnDepression = [
        [{
        title: 'MDD',
        dataIndex: 'MDD',
    },{
        title: 'Bacteria',
        dataIndex: 'Bacteria',
        render: (names) => <Link to={{ pathname: `/visualization/${name}`, state: { nodeName: names } }} >{names}</Link>

    },{
        title: 'Relevant Disease',
        dataIndex: 'Relevant_Disease',
            render: (obj) => <a href={obj.ref} target="_blank" rel="noopener norefer noreferrer">{obj.name}</a>,
    },{
        title: 'Type',
        dataIndex: 'Type',
    }],
    [{
        title: 'MDD',
        dataIndex: 'MDD',
    },{
        title: 'Bacteria',
        dataIndex: 'Bacteria',
        render: (names) => (names ==="NULL"? "NULL" :<Link to={{ pathname: `/visualization/${name}`, state: { nodeName: names } }} >{names}</Link>)
    },{
        title: 'Compound',
        dataIndex: 'Compound',
        render: (names) => <Link to={{ pathname: `/visualization/${name}`, state: { nodeName: names } }} >{names}</Link>
    },{
        title: 'Food',
        dataIndex: 'Food'
    }, {
        title: 'Type',
        dataIndex: 'Type',
    }]];
    return(
        <>
     {"MicrobeKG" === name ?
        <Explore name={name} column={columnMicrobe} init = "text" text = {textMicrobe} />
     :
     <Explore name={name} column ={columnDepression} init = "diseases" text = {textDepression}/>
    }</>
    )
}

export default Index;
