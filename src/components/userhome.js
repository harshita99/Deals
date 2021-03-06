import React,{Component} from 'react';
import firebase from "./Config";
import history from './../history';
import TreeCheck from './treecheck';
import moment from 'moment';
import ThreeTabs from './threetabs';

// const offers=[];
// const notifs=[];
const all=[];

class userhome extends Component{
	
	constructor(props){
		super(props);
		this.unsubscribe=null;
		this.state={
			offers:[],
			notifs:[],
			all:[]
		};
	}
  
	componentDidMount(){
		this.checkAuth();
		firebase.auth().onAuthStateChanged((user)=> {
			if (user) {
				  console.log(user.uid);
		
				  var x=[];

			  	firebase.firestore().collection("userDetails").doc(user.uid)
				.get()
				.then((doc)=> {
					this.setState({name : doc.data().name})
					this.setState({interests : doc.data().interests})
					sessionStorage.setItem('logTime', (doc.data().lastLogTime.toDate()).valueOf())
				}).then(()=>{

					this.refall=firebase.firestore().collection("offerDetails");
					this.refall.onSnapshot(this.onCollectionUpdate2);
					var y=this.state.interests;
					
					this.refall
					.get()
					.then(function(querySnapshot) {
						querySnapshot.forEach(function(doc) {
					
							if (y.includes(doc.data().Brand) || y.includes(doc.data().Category)|| y.includes(doc.data().SubCategory1) || y.includes(doc.data().SubCategory2) || y.includes(doc.data().Model)    ){
								// var logTime = (sessionStorage.getItem('logTime'));
								// z=doc.data()
								// z.push(logTime)

								x.push(doc.data())
							}

						});
						console.log(x);
				}).then(()=>{
						console.log(x);

						
						this.setState({notifs : x})
						console.log(this.state.notifs)

						})
					.catch(function(error) {
						console.log("Error getting documents: ", error);
					});
					console.log(x);
					console.log(this.state.notifs)



					// this.ref1=firebase.firestore().collection("offerDetails").where("Brand","in",this.state.interests);
					// this.ref1=this.state.notifs
					// this.ref1.onSnapshot(this.onCollectionUpdate);

					// this.ref2=firebase.firestore().collection("offerDetails").where("SubCategory1","in",this.state.interests);
					// this.ref2.onSnapshot(this.onCollectionUpdate);

					// this.ref=firebase.firestore().collection("offerDetails").where("Category","in",this.state.interests);
					
					// this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);

				})
				.catch(function(error) {
					history.push("/userhome");
					console.log("Error getting document:", error);
					console.log(user.uid)
				})


			}

		})

		
	}

	onCollectionUpdate2=(querySnapshot)=>{
		querySnapshot.forEach((doc)=>{
			const {Model, Name, Brand, Description, Price, Expiry, Category, Offer,imageurl,SubCategory1, SubCategory2, SubCategory3, producturl}=doc.data();
			all.push({
				key:doc.id,
				doc,
				Brand,
				Name,
				Description,
				Price,
				Category,
				Expiry,
				Model,
				SubCategory1,
				SubCategory2,
				SubCategory3,
				Offer,
				imageurl,
				producturl
			});
		});
		this.setState({all});
	}

	// onCollectionUpdate=(querySnapshot)=>{
	// 	querySnapshot.forEach((doc)=>{
	// 		const {Model, Name, Brand, Description, Price, Expiry, Category, Offer,imageurl, producturl, time,SubCategory1, SubCategory2, SubCategory3}=doc.data();
	// 		var logTime = (sessionStorage.getItem('logTime'));
	// 		offers.push({
	// 			key:doc.id,
	// 			doc,
	// 			Brand,
	// 			Name,
	// 			Description,
	// 			Price,
	// 			Category,
	// 			Expiry,
	// 			Model,
	// 			SubCategory1,
	// 			SubCategory2,
	// 			SubCategory3,
	// 			Offer,
	// 			imageurl,
	// 			producturl
	// 		});

	// 		notifs.push({
	// 			key:doc.id,
	// 			doc,
	// 			Brand,
	// 			Name,
	// 			Description,
	// 			Price,
	// 			Category,
	// 			Model,
	// 			SubCategory1,
	// 			SubCategory2,
	// 			SubCategory3,
	// 			Expiry,
	// 			Offer,
	// 			imageurl,
	// 			producturl,
	// 			content: 'New Offer: ',
    //         	offerD: `${Brand} ${Name} (${Offer})`,
    //         	time: time.toDate(),
	// 			logTime,
	// 		});
	// 	});

	// 	this.setState({offers});
	// 	this.setState({notifs});
	// }

	checkAuth(){
		var user = firebase.auth().currentUser;
		if(localStorage.getItem('usersession')){

		}
		else if(user){
			localStorage.setItem('usersession', user);
			console.log("User "+user.uid+" is logged in with");	
		}
		else{
			console.log("Successfully logged out");
			history.push("/");
		}
	}
  
  	logout(){
		var user = firebase.auth().currentUser;
		const db = firebase.firestore();
		const uid = user.uid;
		console.log("user is "+uid);

		db.collection('userDetails').doc(uid).update({	
			lastLogTime: firebase.firestore.FieldValue.serverTimestamp()
		}).then(() => {
			console.log('Profile Successfully Edited!');
		}).catch((error) => {
			console.log('Error updating the document:', error);
		})
		
		firebase.auth().signOut().then((u)=>{
			localStorage.removeItem('usersession');
			history.push("/"); 
		})
		.then(() => {
			console.log("User "+uid+" logged out successfully");
		}).catch((err)=>{
			console.log(err);
		});
	}

    render(){
  		return (

    		<div className="App body">
      			<div><br></br></div>
       			<div className="row">
					   
       				<div className="col-lg-3 lol">
					   <div className="card-post mb-4 card card-small">
						<div className="border-bottom text-center card-header">
							<h4>Welcome, {this.state.name}! </h4>
							<br></br>

							<p>Your current interests are:</p>
							<p>{this.state.interests+"  "}</p>

							{<TreeCheck propinterest={this.state.interests}  />}
				
							<button onClick={this.logout} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
								<i className="material-icons mr-1">LogOut</i> </button>
					
						</div><ul className="list-group list-group-flush"></ul></div>
						
						<div className="card-post mb-4 card card-small">
							<div className="border-bottom text-center card-header">
								<h5 className="mb-0">Notifications!</h5>
								<h6> New Offers From Your Interests</h6>
								<ul className="notifications">
									{ this.state.notifs.map(notif=> {
										console.log((notif.time).toDate())
										console.log(sessionStorage.getItem('logTime'))

										return (
											((sessionStorage.getItem('logTime')) <= (notif.time).toDate()) ? 
											(
												<li key={notif.id}>
													<span className="pink-text">{notif.Brand} {notif.Name} {notif.Offer} </span>
													<div className="grey-text note-date">
														{moment((notif.time).toDate()).fromNow()}
													</div>
													<a href={notif.producturl}> BUY NOW</a>	
												 </li>
											)
											 : ( 
												<span> { "" } </span>
											)	
										)
									})}
								</ul>	
								<br></br>
							</div>
						</div>
					</div>
                	
					<div className="col-lg-8">
					<div className="row">
						<ThreeTabs all={this.state.all} propnotifs={this.state.notifs}/>
					</div>
	 				</div>
    			</div>
			</div>
  		);
    }
}

export default userhome;
