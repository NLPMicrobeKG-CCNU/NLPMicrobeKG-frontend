/* eslint-disable react-hooks/exhaustive-deps */
import React ,{useState,useEffect}from 'react';
import './index.css';
import Header from'../../component/header';
import Footer from '../../component/footer'
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar} from '@antv/graphin-components';
import { Input } from 'antd';
import Fetch from '../../fecth.js';
import '@antv/graphin/dist/index.css'; // Graphin CSS
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS
import {
  ZoomOutOutlined,
  ZoomInOutlined,
} from '@ant-design/icons';

const handleClick = (graphinContext, config) => {
  const { apis } = graphinContext;
  const { handleZoomIn, handleZoomOut } = apis;
  if (config.key === 'zoomIn') {
    handleZoomIn();
  } else if (config.key === 'zoomOut') {
    handleZoomOut();
  }
};
const options = [
  {
    key: 'zoomOut',
    name: (
      <span>
        <ZoomInOutlined />
      </span>
    ),
    icon: <ZoomInOutlined />,
  },
  {
    key: 'zoomIn',
    name: <ZoomOutOutlined />,
  },
];

const switch_color = (number) => {
  switch (number) {
    case 0: return '#ff8080';
    case 1: return '#a1cbdf';
    case 2: return '#d7fe88';
    case 3: return '#fed684';
    case 4: return '#a5a5e0';
    case 5: return '#8dfd8d';
    case 6: return '#deabce';
    case 7: return '#e1b0b0';
    case 8: return '#96dafc';
    case 9: return '#92fdd9';
    default: return '#d4e1b6';
  }
}


const Visualization = ({match, location}) =>{
  const [data, setData] = useState({
    nodes: [],
    edges: [],
});
  const [searched,setSearched] = useState([])
  const [selected, setSelected] = useState({});
  const [initStatus, setInitStatus] = useState(false);
  useEffect(() => {
    setData({
      nodes:[],
      edges: [],
    });
    setSearched([])
  },[]);
  useEffect(() => {
    if(location.state?.nodeName){
      onSearch(location.state?.nodeName)
    }
  },[location.state?.nodeName])

  const {Search} = Input
  const onSearch = (value) => {
    let index = searched.indexOf(value);
    if(index === -1){
      Fetch(`graph?search_value=${value}`,'GET')
      .then((response) => {
          if (!response?.data.nodes && !response?.data.edges) {
            alert("没有找到想要的数据!");
          }
          let nodes = !response?.data.nodes ? [] : response?.data.nodes.map(node=>{
            return {
              ...node,
              style: {
                fill: switch_color(node.color),
                nodeSize: node.size,
              }
            };
          });
          let edges = response?.data.edges ? response?.data.edges : [];
          let edge = Utils.processEdges(edges).map(e => ({
            source: e.source,
            target: e.target,
            style: {
              label:{
                value: e.label,
              }
            },
            data: e.data
          }));
          setData({
            nodes: [...data.nodes,...nodes],
            edges: [...data.edges,...edge],
          });
      });
      setSearched([...searched, value]);
    }
  }
  const graphRef = React.createRef(null);
  useEffect(()=>{
    const { graph } = graphRef.current;
    const handleNodeClick = e => {
      setSelected(
        e.item.get('model')
        );
      onSearch(e.item.get('model').label);
  };
  graph.on('node:click', handleNodeClick);
  return () => {
      // 如果是每次渲染，那就需要解绑事件
      graph.off('node:click', handleNodeClick);
    };
  },[graphRef]);


  const initPageValues = ["Prevotella intermedia",
    "Haemophilus influenzae",
    "Staphylococcus aureus",
    "Escherichia coli",
    "Shigella flexneri"];
  const initPage = () => {
    if (!initStatus) {
      setInitStatus(true);
      let randomIndex = Math.round(Math.random() * (initPageValues.length - 1));
      onSearch(initPageValues[randomIndex]);
    }
  }
  useEffect(()=>{
    initPage();
  },[])
  
  return(
    <div className="body">
      <Header title={match.params.name}></Header>
      <main>
        <div className="kno-map-main">
          <div className="kno-map-title">
            <div className="kno-map-zh">知识图谱</div>
            <div className="kno-map-en">Knowledge Graph</div>
          </div>
          <div className="kno-map-search">
            <Search className="kno-map-search-input"
            placeholder="" allowClear
            onSearch={onSearch}
            ></Search>
            <div className="kno-map-recommend">
              Example：Porphyromonas cangingivalis, Prevotella intermedia, Bergeyella cardium
            </div>
          </div>
        </div>
        <div className="kno-map-graphin">
          <Graphin
            data={data}
            ref={graphRef}
            options={{
              autoPolyEdge: true,
            }}
            layout={{
              type: 'graphin-force',
              preset: {
                type: 'concentric',
              },
              animation: true,
            }}>
            <Toolbar
            options={options}
            onChange={handleClick} />
          </Graphin>
        </div>
        <div className="kno-map-text">
          <div className="kno-map-text-title">{selected?.label}
          </div>
          <div className="kno-map-text-type">
            Types:<br/>
            {selected.type?selected.type[0]:null}<br/>
            URI:<br/>
            {selected.id?selected?.id:null}<br/>
            </div>
        </div>
      </main>
      <Footer></Footer>
  </div>
  )
}

export default Visualization;
