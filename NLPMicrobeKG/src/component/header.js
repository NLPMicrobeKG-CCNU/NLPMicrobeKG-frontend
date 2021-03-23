/* eslint-disable jsx-a11y/anchor-is-valid */
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import "./header.css"

const menu = (mode) => (
  <Menu>
    <Menu.Item>
      <Link to={`/${mode}/MicrobeKG`} className="link">
        MicrobeKG
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={`/${mode}/MDepressionKG`} className="link">
        MDepressionKG
      </Link>
    </Menu.Item>
  </Menu>
);



const Header = (props) =>{
  const {title} =props
    return (
        <header>
        <div className="header-container">
          <img src="https://www.ccnu.edu.cn/images/footer_logo.png" alt="" className="logo" />
          <div className="header-title">{title || "MicrobeKG"}</div>
          <div className="header-content">
            <Link to ="/home" className="link"><div className="Home margin">Home </div></Link>
            <Dropdown overlay={menu('explore')}>
              <Link to="/explore" className="ant-dropdown-link link margin" onClick={e => e.preventDefault()}>
                Explore Microbes <DownOutlined />
              </Link>
            </Dropdown>
            <Dropdown overlay={menu("visualization")}>
              <Link to="/visualization" className="ant-dropdown-link link margin" onClick={e => e.preventDefault()}>
                Visualization <DownOutlined />
              </Link>
            </Dropdown>
            <Link to ="/contact" className="link"><div className="contact margin">Contact us </div></Link>
          </div>
        </div>
      </header>
    )
}

export default Header;