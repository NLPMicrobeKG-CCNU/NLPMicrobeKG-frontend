import './index.css';
import Graphin, { Utils } from '@antv/graphin';
import { Toolbar } from '@antv/graphin-components';
import { Menu, Dropdown, Space, Input} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import '@antv/graphin/dist/index.css'; // Graphin CSS
import '@antv/graphin-components/dist/index.css'; // Graphin 组件 CSS

//menu
const menu = ()=> (
  <Menu>
    <Menu.Item>
      1st
    </Menu.Item>
  </Menu>
)


const Index = (props) =>{
  const data = Utils.mock(10).circle().graphin();
  const {Search} = Input
  return(
    <div className="body">
      <header>
        <div className="header-container">
          <div className="header-title">中医药知识图谱</div>
          <Space className="header-space">
            <Dropdown overlay={menu}><div className="kno-map margin">知识图谱 <DownOutlined/></div></Dropdown>
            <Dropdown overlay={menu}><div className="kno-service margin">知识服务 <DownOutlined/></div></Dropdown>
            <div className="search-context margin">文献检索</div>
            <Dropdown overlay={menu}><div className="item margin">项目 <DownOutlined/></div></Dropdown>
            <Dropdown overlay={menu}><div className="document" margin>文档 <DownOutlined/></div></Dropdown>
          </Space>
        </div>
      </header>
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
  </div>
  )
}

export default Index;
