import Header from'../../component/header';
import Footer from '../../component/footer';
import logo from './img/logo.jpg';
import './index.css';

const Home = () => {
    return (
    <div className="body">
    <Header />
    <div className="main1">
    <div className="up">
        <div className="high">
            <div className="high-1">
                MicrobeKG
            </div>
            <div className="high-2">
                Last update：18/12/2020
            </div>
        </div>
        <div className="down">
                <div className="elem">
                    <div className="elemup">2186</div>
                    <div className="elemdown">Bacteria-Disease</div>
                </div>
                <div className="elem">
                    <div className="elemup">2855</div>
                    <div className="elemdown">Bacteria-Bacteria</div>
                </div>
                <div className="elem">
                    <div className="elemup">6988</div>
                    <div className="elemdown">Bacteria-Pathway</div>
                </div>
                <div className="elem">
                    <div className="elemup">4783</div>
                    <div className="elemdown">Reaction-Compound</div>
                </div>
                <div className="elem">
                    <div className="elemup">63341</div>
                    <div className="elemdown">Food-Compound</div>
                </div>
            </div>
            </div>
            <div className="mid">
            <div className="mid-left">
                <img src={logo} alt="logo"  className="img" />
            </div>
            <div className="mid-right">
                <div className="mid-right-1">
                    <div className="mid-right-1-top">What is MicrobeKG</div>
                    <div className="mid-right-1-main">
                        <li className="mid-right-1-main-li">MicrobeKG is a domain graph based on text mining technology, which aims to provide an open resource for gut microbes in the fields of human metabolism, nutrition and disease intervention.</li>
                        <li className="mid-right-1-main-li">The microbe-gut-brain axis plays a key role in human metabolism. Intestinal microbes influence human health or disease states through metabolism. Food nutrition can also regulate metabolic reactions to provide a mild disease treatment plan. The knowledge graph technology is used to construct a complex associated semantic network, providing semantic retrieval, knowledge reasoning, and future application services such as association prediction.</li>
                        <li className="mid-right-1-main-li">We designed the ontology association of microbe-metabolism-nutrition-disease based on the domain structured knowledge, and used text mining methods to extract the associated triples from the biomedical text automatically.</li>
                        <li className="mid-right-1-main-li">MicrobeKG contains a total of <span className="tt">5,490,576</span> triples, of which <span className="tt">3,627,417</span> triple associations are obtained through automatic inference.</li>
                    </div>
                </div>
                <div className="mid-right-2"></div>
            </div>
            </div>
        </div>
        <Footer />
        </div>
        )
}

export default Home;