import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
import firebase from "./Config";

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  {
    title: "Electronics",
    value: "Electronics",
    id: "E",
    children: [
      {
        title: "Apple",
        value: "Apple",
        id: "EA",
        parent: "E",
        children: [
          { 
            title: "Laptops", 
            value: "Laptops", 
            parent: "EA", 
            id: "EAL" 
          },
          { 
            title: "Earphones", 
            value: "Earphones", 
            parent: "EA", 
            id: "EAE" 
          }
        ]
      },
      {
        title: "Samsung",
        value: "Samsung",
        id: "ES",
        parent: "E",
        children: [
          { 
            title: "Mobiles", 
            value: "Mobiles",
            id: "ESM",
            parent: "ES",
          },
          { 
            title: "AirConditioner", 
            value: "AirConditioner",
            id: "ESA",
            parent: "ES",
          }
        ]
      },
    ]
  },
  {
    title: "Flights",
    value: "Flights",
    id: "F",
    children: [
      {
        title: "Indigo",
        value: "Indigo",
        id: "FI",
        parent: "F",
        children: [
          { 
            title: "DEL-BLR Flights", 
            value: "DEL-BLR Flights",
            id: "FIDB",
            parent: "FI",
          },
          { 
            title: "DEL-MUM Flights", 
            value: "DEL-MUM Flights",
            id: "FIDM",
            parent: "FI",
          }
        ]
      },
      {
        title: "Spicejet",
        value: "Spicejet",
        id: "FS",
        parent: "F",
      }
    ]
  },
  {
    title: "Footwear",
    value: "Footwear",
    id: "I",
    children: [
      {
        title: "Bata",
        value: "Bata",
        id: "IB",
        parent: "I",
        children: [
          {
            title: "FormalFootwear",
            value: "FormalFootwear",
            id: "IBF",
            parent: "IB",
          },
          {
            title: "CasualFootwear",
            value: "CasualFootwear",
            id: "IBC",
            parent: "IB",
          }
        ]
      },
      {
        title: "Adidas",
        value: "Adidas",
        id: "IA",
        parent: "I",
        children: [
          {
            title: "SportsFootwear",
            value: "SportsFootwear",
            id: "IAS",
            parent: "IA",
          }
        ]
      }
    ]
  }
];

const offers=[];
  

class TreeCheck1 extends Component {

  constructor(props){
    super(props);
    this.state = {
       value:[] ,
       offers:[]
    };
  }

  saveButton=value=>{
    window.location.reload(true);
  }

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });

        firebase.firestore().collection("productDetails").get()
        .then(()=>{

            this.ref1=firebase.firestore().collection("productDetails").where("Brand","in",this.state.value);
            this.ref1.onSnapshot(this.onCollectionUpdate);

            this.ref2=firebase.firestore().collection("productDetails").where("SubCategory","in",this.state.value);
            this.ref2.onSnapshot(this.onCollectionUpdate);

            this.ref=firebase.firestore().collection("productDetails").where("Category","in",this.state.value);
            console.log(this.state.value);
            
            this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
        })
  };
  
  onCollectionUpdate=(querySnapshot)=>{

    querySnapshot.forEach((doc)=>{
        const {Name, Brand, Description, Price, Category,imageurl, producturl,SubCategory}=doc.data();

        offers.push({
            key:doc.id,
            doc,
            Brand,
            Name,
            Description,
            Price,
            Category,
            SubCategory,
            imageurl,
            producturl
        });
    });

    this.setState({offers});
    console.log(this.state.offers);
}

  componentDidUpdate(prev){
    if (this.props.propinterest !== prev.propinterest) {
      this.setState({value: this.props.propinterest})
      console.log(this.props);
    }
  }

  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: 'Select nodes where you want to add',
      style: {
        width: "80%"
      }    
    };
    return( 
      <div>
        <TreeSelect {...tProps} />
        <button onClick={this.saveButton} className="mb-2 btn btn-outline-primary btn-sm btn-pill">
          <i className="material-icons mr-1">Add</i> 
        </button>
      </div>
    )
  }
}

export default TreeCheck1;