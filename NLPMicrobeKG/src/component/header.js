import { Link } from "react-router-dom";
import "./header.css"

const Header = () =>{
    return (
        <header>
        <div className="header-container">
          <div className="header-title">MicrobeKG</div>
          <div className="header-content">
            <Link to ="/home" className="link"><div className="Home margin">Home </div></Link>
            <Link to ="/explore" className="link"><div className="Explore margin">Explore Microbes </div></Link>
            <Link to ="/visualization" className="link"><div className="Visualization margin">Visualization</div></Link>
            <Link to ="/contact" className="link"><div className="contact margin">Contact us </div></Link>
          </div>
        </div>
      </header>
    )
}

export default Header;