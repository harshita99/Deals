import React from "react";
import { Tabs } from "antd";
import '../index.css';

const { TabPane } = Tabs;

class ThreeTabs extends React.Component {
  
  render() {
    return (
      <div className="lol ">
        <Tabs tabPosition="top"  >
          <TabPane  tab="New offers" key="1" >
            <div className="col-sm-12">
              <h6>Here are new offers from your interests: </h6>
              { this.props.propnotifs.map(notif=> {
                // const elapsedTime = ((notif.time).valueOf() - notif.logTime)
                // console.log("OfferTime is "+ (notif.time).valueOf() + " and LogTime is "+notif.logTime)
                // console.log ("Elapsed time is "+ elapsedTime)
                return (
                  // (notif.logTime <= (notif.time).valueOf()) ? 
                  ((sessionStorage.getItem('logTime')) <= (notif.time).toDate()) ?
                  (	
                    <div className="card-post mb-4 card card-small">
                      <div className="card-body">
                      <h7 className="card-title">{notif.Category} -{">"} {notif.Brand} -{">"} {notif.SubCategory1} -{">"} {notif.Model}</h7>
  
                        <h5 className="card-title">
                          {notif.Name}
                        </h5>
                        <img src= {notif.imageurl} alt="DealArena" width="100px" height="100px"/>
                        <h6 className="card-title"> {notif.Description}</h6>
  
                      </div>
  
                      <div className="border-top d-flex card-footer">
                      <div className="card-post__author d-flex">
                        <a href="/" className="card-post__author-avatar card-post__author-avatar--small" >
                          Offer: {notif.Offer} </a>
                      <div className="d-flex flex-column justify-content-center ml-3"><span className="card-post__author-name">Rs.{notif.Price}</span><small className="text-muted"> Offer expires:{notif.Expiry}</small></div></div><div className="my-auto ml-auto"><a href={notif.producturl}> BUY NOW</a></div></div>
                    </div>
                  )
                   : ( 
                    <span> { "" } </span>
                  )	
                )
              })}
            </div>
          </TabPane>

          <TabPane tab="Old offers" key="2">
          <div className="col-sm-12">
							<h6>Here are old offers from your interests: </h6>
              { this.props.propnotifs.map(notif=> {
                return (
                  // (notif.logTime > (notif.time).valueOf()) ? 
                  ((sessionStorage.getItem('logTime')) > (notif.time).toDate()) ? 
                  (	
                    <div className="card-post mb-4 card card-small">
                      <div className="card-body">
                        <h7 className="card-title">{notif.Category} -{">"} {notif.Brand} -{">"} {notif.SubCategory1} -{">"} {notif.Model}</h7>
                        <h5 className="card-title">
                          {notif.Name}
                        </h5>
                        <img src= {notif.imageurl} alt="DealArena" width="100px" height="100px"/>
                        <h6 className="card-title"> {notif.Description}</h6>
                      </div>

                      <div className="border-top d-flex card-footer">
                      <div className="card-post__author d-flex">
                        <a href="/" className="card-post__author-avatar card-post__author-avatar--small" >
                          Offer: {notif.Offer} </a>
                      <div className="d-flex flex-column justify-content-center ml-3"><span className="card-post__author-name">Rs.{notif.Price}</span><small className="text-muted"> Offer expires:{notif.Expiry}</small></div></div><div className="my-auto ml-auto"><a href={notif.producturl}> BUY NOW</a></div></div>
                    </div>
                  )
                   : ( 
                    <span> { "" } </span>
                  )	
                )
              })}
            </div>
          </TabPane>
          
          <TabPane tab="All offers" key="3">
          <div className="col-sm-12">
              <h6> Here are all other offers: </h6>
                { this.props.all.map(off=> 
                    <div className="card-post mb-4 card card-small">
                      <div className="card-body">
                        <h7 className="card-title">{off.Category} -{">"} {off.Brand} -{">"} {off.SubCategory1} -{">"} {off.Model}</h7>
                        <h5 className="card-title">
                          {off.Name}
                        </h5>
                        <img src= {off.imageurl} alt="DealArena" width="100px" height="100px"/>
                        <h6 className="card-title"> {off.Description}</h6>
                      </div>

                      <div className="border-top d-flex card-footer">
                      <div className="card-post__author d-flex">
                        <a href="/" className="card-post__author-avatar card-post__author-avatar--small" >
                          Offer: {off.Offer} </a>
                      <div className="d-flex flex-column justify-content-center ml-3"><span className="card-post__author-name">Rs.{off.Price}</span><small className="text-muted"> Offer expires:{off.Expiry}</small></div></div><div className="my-auto ml-auto"><a href={off.producturl}> BUY NOW</a></div></div>
                    </div>
                )}
            </div> 
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
export default ThreeTabs;
