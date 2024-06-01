import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import './Home.css'
import Navbar from "../Navbar/Navbar";
import BodyData from "../BodyData/BodyData";




function getDataFromLs(){
  const data = localStorage.getItem('Products')
  if(data){
    return JSON.parse(data)
  }else{
    return []
  }
}

export default function Home() {


  //main array of obj state || products state 
  const [Products, setProducts] = useState(getDataFromLs());



  const [name, setName] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Price, setPrice] = useState('');
  const [editIndex, setEditIndex] = useState(null);



// useEffect(() => {
//   const storedProducts = JSON.parse(localStorage.getItem('products'));
//   if (storedProducts) setProducts(storedProducts);
// }, []);

// useEffect(() => {
//   localStorage.setItem('products', JSON.stringify(products));
// }, [products]);

// const handleAddOrUpdate = () => {
//   const newProduct = { name, Quantity, Price};

//   if (editIndex !== null) {
//     const updatedProducts = [...products];
//     updatedProducts[editIndex] = newProduct;
//     setProducts(updatedProducts);
//     setEditIndex(null);
//   } else {
//     setProducts([...products, newProduct]);
//   }

//   setName('');
//   setQuantity('');
//   setPrice('');
// };

// const handleEdit = (index) => {
//   const product = products[index];
//   setName(product.name);
//   setQuantity(product.quantity);
//   setPrice(product.price);
//   setEditIndex(index);
// };

// const handleDelete = (index) => {
//   const updatedProducts = products.filter((_, i) => i !== index);
//   setProducts(updatedProducts);
// };





// useEffect(() => {
//   const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//   setProducts(storedProducts);
// }, []);



// form submit event 
const handleAddPrd = (e)=> {
e.preventDefault();

//create obj 
let product = {
  name: name,
  Price: Price,
  Quantity: Quantity
}

if (editIndex !== null) {
   
  const updatedProducts = Products.map((prd, index) => 
    index === editIndex ? product : prd
  );
  setProducts(updatedProducts);
  setEditIndex(null);  
} else {
  // Add new product
  setProducts([...Products, product]);
}

// Clear input fields
setName('');
setPrice('');
setQuantity('');

}


useEffect( ()=> {

  localStorage.setItem('Products', JSON.stringify(Products))
} , [Products])


//Update product from local storage 
function updatePrd(index){
const Product = Products[index]
console.log("======Product=====",Product);
setName(Product.name)
setPrice(Product.Price)
setQuantity(Product.Quantity)
setEditIndex(index);
}


//Delete product from local storage 
 


function deletePrd(idx) {
  const UpdatedPrd = Products.filter((_, index) => index !== idx);
  setProducts(UpdatedPrd);
  console.log("UpdatedPrd=======",UpdatedPrd);

}

  return (
    <>
      <Navbar />
      <div className="container mt-5 ">


        <form onSubmit={handleAddPrd} >
    <div className="row align-items-center justify-content-between ">
      <div className="col-md-3 w-25 col-lg-3">

       
      <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" placeholder="Enter Your Name" name="name" className="form-control" />
          </div>
      </div>
      <div className="col-md-3 w-25 col-lg-3">
      <div className="form-group mb-3">
            <label htmlFor="Price">Price</label>
            <input value={Price} onChange={(e)=> setPrice(e.target.value)} type="number" id="Price" placeholder="Enter Your Price" name="Price" className="form-control" />
          </div>
      </div>
      <div className="col-md-3 w-25 col-lg-3">
      <div className="form-group  mb-3">
            <label htmlFor="Quantity">Quantity</label>
            <input value={Quantity} onChange={(e)=> setQuantity(e.target.value)} type="number" id="Quantity" placeholder="Enter Your Quantity" name="Quantity" className="form-control" />
          </div>
      </div>
      <div className="col-md-3 w-25 col-lg-3">
      <button  className="AddBtn"> 
      {editIndex != null ? "Update" : "Add"}
      </button>
      </div>
    </div>
      </form>
    <hr />



    <div className="tableCst text-center ">
      <table className="table table-borderless  ">
        <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>

        </thead>
 

        <tbody >
         
        <BodyData Products={Products} deletePrd={deletePrd} updatePrd={updatePrd} />
         
      
        </tbody>
         

      
      
      </table>
        {Products.length < 1 && <p className="text-center mt-5 alert alert-warning">No products are added yet </p>}
    </div>



       
      </div>
    </>
  );
}
