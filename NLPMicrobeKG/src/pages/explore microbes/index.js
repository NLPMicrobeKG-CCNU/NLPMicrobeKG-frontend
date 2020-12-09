import './index.css';
import { Input , Select} from 'antd';
import Header from '../../component/header'
import Footer from '../../component/footer'

const Index =()=>{
    const {Search} = Input
    const {Option} = Select
    return (
        <div className="body">
            <Header></Header>
            <main>
                <div className="container">
                    <div className="title">EXPLORE PETIDES</div>
                    <div className="context">balabala</div>
                    <Select defaultValue="Organism" className="select" >
                        <Option value="Organism">Organism</Option>
                        <Option value="Other">Other</Option>
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

export default Index;