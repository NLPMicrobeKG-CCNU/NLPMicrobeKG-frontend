import React ,{useState,useEffect}from 'react';
import './index.css';
import Header from'../../component/header';
import Footer from '../../component/footer'
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { Input } from 'antd';
import Fetch from '../../fecth.js';
import '@antv/graphin/dist/index.css'; // Graphin CSS
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS


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


const Visualization = ({match}) =>{

  const [data, setData] = useState({
    nodes: [],
    edges: [],
});
  const [selected, setSelected] = useState({});
  useEffect(() => {
    setData({
      nodes:[],
      edges: [],
    })
  },[]);
  const clear = () => {
    setData({
      nodes: [],
      edges: [],
    })
  }
  const {Search} = Input
  const onSearch = (value) => { 
    Fetch(`graph?search_value=${value}`,'GET')
    .then((response) => {
        if (!response?.data.nodes && !response?.data.edges) {
          alert("没有找到想要的数据!");
        }
        let nodes = !response?.data.nodes ? [] : response.data.nodes.map(node=>{
          return {
            ...node,
            style: {
              fill: switch_color(node.color),
              nodeSize: node.size,
            }
          };
        });
        let edges = response.data.edges ? response.data.edges : [];
        setData({
          nodes: [...data.nodes,...nodes],
          edges: [...data.edges,...edges],
        });
    });
  }
  const graphRef = React.createRef(null);
  useEffect(()=>{
    const { graph } = graphRef.current;
    const handleNodeClick = e => {
      setSelected(
        e.item.get('model')
        );
      /* onSearch(e.item.get('model').label); */
  };
  graph.on('node:click', handleNodeClick);
  return () => {
      // 如果是每次渲染，那就需要解绑事件
      graph.off('node:click', handleNodeClick);
    };
  },[graphRef]);
  

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
            onClick={clear}
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
            layout={{ type: 'concentric' }}>
            <Toolbar></Toolbar>
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
