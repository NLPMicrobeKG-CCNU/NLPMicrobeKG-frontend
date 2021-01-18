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
    case 0: return 'red';
    case 1: return 'lightgreen';
    case 2: return 'lightblue';
    case 3: return 'purple';
    case 4: return 'orange';
    case 5: return 'yellow';
    case 6: return 'pink';
    case 7: return 'green';
    case 8: return 'lightred';
    case 9: return 'azure';
    default: return 'blue';
  }
}


const Visualization = (props) =>{

  const [data, setData] = useState({
    nodes: [],
    edges: [],
});
  const [selected, setSelected] = useState({});
  useEffect(() => {
    setData({
      nodes:[
        {
          id: "1",
          data : {},
          label: "155"
        },
        {
          id: "2",
          data : {},
          label: "122"
        },],
      edges:[{data:{},source:"1",target:"2",label:"123"}],
    })
  },[]);

  const {Search} = Input
  const onSearch = value => { 
    Fetch(`graph?search_value=${value}`,'GET')
    .then((response) => {
      console.log(response);
      let nodes = response.data.nodes.map(node=>{
        return {
          ...node,
          style: {
            dark: switch_color(node.color),
            nodeSize: node.size,
          }
        };
      });
      let edges = response.data.edges;
      setData({
        nodes:nodes,
        edges:edges,
      })
    });
  }
  const graphRef = React.createRef(null);
  useEffect(()=>{
    const { graph } = graphRef.current;
    const handleNodeClick = e => {
      console.log('node:click', e);
      setSelected(
        e.item.get('model')
        );
  };
  graph.on('node:click', handleNodeClick);
  return () => {
      // 如果是每次渲染，那就需要解绑事件
      graph.off('node:click', handleNodeClick);
    };
  },[graphRef])
  


  return(
    <div className="body">
      <Header></Header>
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
              推荐：123 234 234
            </div>
          </div>
        </div>
        <div className="kno-map-graphin">
          <Graphin data={data} ref={graphRef}>
            <Toolbar></Toolbar>
          </Graphin>
        </div>
        <div className="kno-map-text">
          <div className="kno-map-text-title">{selected?.label}
          <div className="kno-map-text-description">{selected?.label}</div>
          </div>
          <div className="kno-map-text-type">
            Types:<br/>
            {selected.type?selected.type[0]:null}<br/>
            RDF rank:<br/>
            {selected?selected?.rank:null}<br/>
            {selected.id?selected?.id:null}<br/>
            {selected.node_properties?selected?.node_properties[0].title:null}<br/>
            {selected.label?selected?.label:null}
            </div>
        </div>
      </main>
      <Footer></Footer>
  </div>
  )
}

export default Visualization;
