import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Image, InputGroup, ListGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { deleteDeskProduct, addDeskProductProperties, hideProductModal, deselectAllDeskProducts } from '../../redux/actions';
import { useQuery, useMutation } from '@apollo/react-hooks';
import './ProductModal.css';
import { GET_PRODUCTS, productSearch, CREATE_PRODUCT } from '../../util/api';

import { similaritySearch } from '../../util/search';

const emptyProduct = { brand: "", model: "", category: "", url: "", img: "", price: "" }

export default function ProductModal() {
  const { currentDeskProduct } = useSelector(store => store.currentDeskProduct);
  const showModal = useSelector(store => store.currentDeskProduct.show);

  const { data } = useQuery(GET_PRODUCTS);
  const products = data ? data.productMany : [];

  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(emptyProduct);

  const [query, setQuery] = useState([]);
  const dispatch = useDispatch();

  const [createProduct] = useMutation(CREATE_PRODUCT);

  useEffect(() => {
    if (currentDeskProduct.saved) {
      setSelectedProduct(currentDeskProduct.product);
    }
  }, [currentDeskProduct]);

  const handleCancelClose = () => {
    if (!currentDeskProduct.saved) {
      dispatch(deleteDeskProduct(currentDeskProduct));
    }
    dispatch(hideProductModal());
    setSelectedProduct(emptyProduct);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    currentDeskProduct.pros = form.elements["pros"].value;
    currentDeskProduct.cons = form.elements["cons"].value;
    currentDeskProduct.product = selectedProduct;
    currentDeskProduct.saved = true;

    dispatch(addDeskProductProperties(currentDeskProduct));
    dispatch(deselectAllDeskProducts());
    dispatch(hideProductModal());
    setSelectedProduct(emptyProduct);
  }

  function handleSearchType(e) {
    setShowSearchResults(true);
    let query = e.target.value;
    setQuery(query);
  }

  function handleSearchButton(e) {
    // productSearch(query).then(response => {
    //   let newProduct;
    //   console.log(response);
    //   let numProducts = response.data.search_results.length;
    //   for (let i = 0; i < numProducts; i++) {
    //     newProduct = response.data.search_results[i];
    //     createProduct({
    //       variables: {
    //         newProduct: newProduct
    //       }
    //     }
    //     );
    //   }
    // }).catch(error => {
    //   console.log(error);
    // })
  }

  let disabled = selectedProduct.title;

  const searchedProducts = similaritySearch(query, products);

  return (
    <Modal show={showModal} onHide={handleCancelClose} animation={true} backdrop={true} dialogClassName='CustomDialogue'>
      <Modal.Header closeButton>
        <Modal.Title>What is this product?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>

        {/* Product selection/search */}
          <Form.Group controlId="product">
            <InputGroup className="mb-3">
              <Form.Control placeholder="Search for the product" onChange={handleSearchType} value={query} />
              <Button disabled={true} variant="primary" onClick={handleSearchButton}>Search</Button>
            </InputGroup>

              {/* Product search results */}
            <ListGroup className="ProductDropDown" style={{ zIndex: 1050 }}>
              {showSearchResults && searchedProducts.map((product, i) =>
                <ListGroup.Item key={i} onClick={() => {
                  setShowSearchResults(false);
                  setSelectedProduct(product);
                  setQuery(product.title);
                }} className="ProductDropDownItem">
                  {product.title}
                </ListGroup.Item>)}
            </ListGroup>

          </Form.Group>
          

          {/* Image of the selected product */}
          {selectedProduct.image &&
            <div className="ProductImageContainer">
              <Image src={selectedProduct.image} rounded fluid className="ProductImage" />
            </div>}

          {/* Pros */}
          <Form.Group controlId="pros">
            <Form.Label>Pros</Form.Label>
            <Form.Control onChange={(e) => { console.log(e) }} as="textarea" rows="1" value={currentDeskProduct.pros} />
          </Form.Group>

          {/* Cons */}
          <Form.Group controlId="cons">
            <Form.Label>Cons</Form.Label>
            <Form.Control as="textarea" rows="1" value={currentDeskProduct.cons} />
          </Form.Group>


          {/* Cancel/Save buttons */}
          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button> &nbsp;
          <Button disabled={!disabled} variant="primary" type="submit">
            Save
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
}