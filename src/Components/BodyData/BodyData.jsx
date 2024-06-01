import React from 'react'

export default function BodyData({Products, deletePrd,updatePrd}) {


 

  return Products.map( (product,index) => (

    <tr key={index}>
    <td >{product.name}</td>
    <td>{product.Price}</td>
    <td>{product.Quantity}</td>
    <td>
      <button onClick={()=> updatePrd(index)}  className=" BtnEdit ">Edit</button>
      <button onClick={()=> deletePrd(index)} className="btnDelete">Delete</button>
    </td>
  </tr>


  ) )
}
