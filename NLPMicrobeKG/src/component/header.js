import "./header.css"
import { Menu, Dropdown, Space, Input} from 'antd';
import { DownOutlined } from '@ant-design/icons';


//menu
const menu = ()=> (
    <Menu>
      <Menu.Item>
        1st
      </Menu.Item>
    </Menu>
  )

const Header = () =>{
    return (
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
    )
}

export default Header;