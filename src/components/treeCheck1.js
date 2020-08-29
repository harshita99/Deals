import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { TreeSelect } from 'antd';
// import firebase from "./Config";

const { SHOW_PARENT } = TreeSelect;

var treeData = [
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

treeData=treeData[0].children[1].children;

const offers=[];


class TreeCheck1 extends Component {

  constructor(props){
    super(props);
    this.state = {
       value:[] ,
       offers:[]
    };
  }


  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });

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
    console.log(this.state.value) //this is where selected checkbox value is stored for examples Mobiles. but how to send it to add.js?
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

      </div>
    )
  }
}

export default TreeCheck1;