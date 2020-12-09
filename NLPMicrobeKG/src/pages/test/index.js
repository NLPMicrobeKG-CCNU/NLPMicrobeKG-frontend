import './index.css';
import Header from'../../component/header';
import Footer from '../../component/footer'
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { Input } from 'antd';
import '@antv/graphin/dist/index.css'; // Graphin CSS
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS


const Index = (props) =>{
  const data = Utils.mock(10).circle().graphin();
  const {Search} = Input
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
            ></Search>
            <div className="kno-map-recommend">
              推荐：123 234 234
            </div>
          </div>
        </div>
        <div className="kno-map-graphin">
          <Graphin data={data}>
            <Toolbar></Toolbar>
          </Graphin>
        </div>
        <div className="kno-map-text">
          <div className="kno-map-text-title">Title
          <div className="kno-map-text-description">Description</div>
          </div>
          <div className="kno-map-text-context">
            balabala
            </div>
        </div>
      </main>
      <Footer></Footer>
  </div>
  )
}

export default Index;
