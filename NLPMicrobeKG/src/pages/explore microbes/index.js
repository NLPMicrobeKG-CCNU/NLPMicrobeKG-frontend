import './index.css';
import { Input , Select} from 'antd';
import Header from '../../component/header'
import Footer from '../../component/footer'

const Explore =()=>{
    const {Search} = Input
    const {Option} = Select
    return (
        <div className="body">
            <Header></Header>
            <main>
                <div className="container">
                    <div className="title">EXPLORE PETIDES</div>
                    <div className="context">balabala</div>
                    <Select defaultValue="Text Mining" className="select" >
                        <Option value="Text Mining">Text Mining</Option>
                        <Option value="Data fusion">Data fusion</Option>
                    </Select>
                    <Search className="filter" 
                    placeholder="Enter a filter term"
                    ></Search>
                    <div className="result">
                        There is no result for the search.
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </div>
    )
}

export default Explore;