import Header from'../../component/header';
import Footer from '../../component/footer'
import './index.css';

const Contact = ()=>{
    return (
        <div className="body">
            <Header />
            <div className="main">
        <div className="mainb">
            <div className="contact">
                <div className="boxc"></div> 
                <div className="boxb">
                    
                    <div className="boxaa">
                         contact us   
                    </div> 
                </div> 
             </div>
     
             <div className="comment">
                 
                 <div className="commentmain">
                    
                     <div className="commentmainb">
                         <li className="ca">Please send comments concerning</li>
                         <li className="cb">General development and scientific contents to ccfu@mails.ccnu.edu.cn</li>
                         <li className="cc">Computer and user interface to core developer and database administrator ccfu@mails.ccnu.edu.cn </li>
                     </div>
                     <div className="commentmainc"></div>
                 </div>
             </div>
             <div className="address">
                 <div className="top">Our addresses</div>
                 <div className="bottom">
                     <div className="lift">
                        <div className="second"><span className="big">Division：</span> School of Computer</div>
                        <div className="second"><span className="big">Organization：</span>Central China Normal University</div>
                        <div className="second"><span className="big">Address：</span>Wuhan, 430079, China</div>
                     </div>
                     <div className="right">
                     <div className="second"><span className="big">Division：</span> Hubei Key Laboratory of Artificial Intelligence and Smart Learning</div>
                     <div className="second"><span className="big">Organization：</span>Central China Normal University</div>
                     <div className="second"><span className="big">Address：</span>Wuhan, 430079, China</div>
                     </div>
                 </div> 
             </div>
             <div className="address">
                <div className="top">Team</div>
                <div className="bottom">
                <div className="second"><span className="big">Project leader：</span> Chengcheng Fu</div>
                <div className="second"><span className="big">Members：</span><br />Xiaobin Jiang<br /> Chenlong Han<br />Hongxu Zhang <br />Junjie Zhang<br /> Wenjian Wang</div>
                <div className="second"><span className="big">email：</span>ccfu@mails.ccnu.edu.cn</div>
                </div> 
            </div>
        </div>
    </div>
    <Footer />
        </div>
    )
}

export default Contact;