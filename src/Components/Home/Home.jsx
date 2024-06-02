import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import BodyData from "../BodyData/BodyData";
import Swal from "sweetalert2";
import jsPDF from "jspdf";

function getDataFromLs() {
  const data = localStorage.getItem("Products");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

export default function Home() {
  //main array of obj state || products state
  const [Products, setProducts] = useState(getDataFromLs());

  const [name, setName] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Price, setPrice] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // form submit event
  const handleAddPrd = (e) => {
    e.preventDefault();

    //  To Check if any of the fields are empty
    if (!name || !Price || !Quantity) {
      Swal.fire("All inputs Are Required!");

      return;
    }

    // Validate that price and quantity are not negative
    if (Price < 0 || Quantity < 0) {
      Swal.fire("Price and Quantity cannot be negative!");
      return;
    }
    //create obj
    let product = {
      name: name,
      Price: Price,
      Quantity: Quantity,
    };

    if (editIndex !== null) {
      const updatedProducts = Products.map((prd, index) =>
        index === editIndex ? product : prd
      );
      setProducts(updatedProducts);
      setEditIndex(null);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your product has been updated",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      // Add new product
      setProducts([...Products, product]);
    }

    // Clear input fields
    setName("");
    setPrice("");
    setQuantity("");
  };

  useEffect(() => {
    localStorage.setItem("Products", JSON.stringify(Products));
  }, [Products]);

  //Update product from local storage
  function updatePrd(index) {
    const Product = Products[index];
    console.log("======Product=====", Product);
    setName(Product.name);
    setPrice(Product.Price);
    setQuantity(Product.Quantity);
    setEditIndex(index);
    setIsEditing(true);
  }

  //Delete product from local storage

  function deletePrd(idx) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const UpdatedPrd = Products.filter((_, index) => index !== idx);

        setProducts(UpdatedPrd);
        console.log("UpdatedPrd=======", UpdatedPrd);

        // Reset the form fields and button status
        setName("");
        setPrice("");
        setQuantity("");
        setEditIndex(null);
        setIsEditing(false);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  }

  // Function to download products as PDF
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("Products List", 10, 10);
    let y = 20;

    Products.forEach((product, index) => {
      doc.text(
        `${index + 1}. ${product.name} - Price: ${product.Price} - Quantity: ${
          product.Quantity
        }`,
        10,
        y
      );
      y += 10;
    });

    doc.save("products.pdf");
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 ">
        <form onSubmit={handleAddPrd}>
          <div className="row align-items-center justify-content-between ">
            <div className="col-md-3 w-25 col-lg-3">
              <div className="form-group mb-3">
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  name="name"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3 w-25 col-lg-3">
              <div className="form-group mb-3">
                <label htmlFor="Price">Price</label>
                <input
                  value={Price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  id="Price"
                  placeholder="Enter Your Price"
                  name="Price"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3 w-25 col-lg-3">
              <div className="form-group  mb-3">
                <label htmlFor="Quantity">Quantity</label>
                <input
                  value={Quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  id="Quantity"
                  placeholder="Enter Your Quantity"
                  name="Quantity"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-3 w-25 col-lg-3">
              <button className="AddBtn">
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

            <tbody>
              <BodyData
                Products={Products}
                deletePrd={deletePrd}
                updatePrd={updatePrd}
              />
            </tbody>
          </table>
          {Products.length < 1 && (
            <p className="text-center mt-5 alert alert-warning">
              No products are added yet
            </p>
          )}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button className="DownloadBtn  " onClick={downloadPdf}>
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
}
