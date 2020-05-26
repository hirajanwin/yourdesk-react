import React, {useEffect, useState} from 'react';
import { Form, Modal, Button, Image, InputGroup, Dropdown, ListGroup, DropdownButton, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { deleteDeskProduct, addDeskProductProperties, hideProductModal, deselectAllDeskProducts } from '../../redux/actions';
import { useQuery } from '@apollo/react-hooks';
import './ProductModal.css';
import { GET_PRODUCTS } from '../../util/api';

const productTypes = ["Computer", "Keyboard", "Mouse", "Monitor","Desk", "Chair", "Accessory", "Decoration", "Miscellaneous"];
const emptyProduct = { brand: "", model: "", category: "", url: "", img: "", price: ""}

export default function ProductModal() {
  const {currentDeskProduct} = useSelector(store => store.currentDeskProduct);
  const showModal = useSelector(store => store.currentDeskProduct.show);

  const { data } = useQuery(GET_PRODUCTS);
  const products = data ? data.productMany : [];

  const [selectedProduct, setSelectedProduct] = useState(emptyProduct);
  const [selectedCategory, setSelectedCategory] = useState(productTypes[0]);

  const [query, setQuery] = useState([]);
  const [showProductList, setShowProductList] = useState(false);
  const dispatch = useDispatch();
  
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

  const handleSearch = (e) => {
    setShowProductList(true);
    let query = e.target.value;

    if (query === "") {
      setShowProductList(false);
    }

    setQuery(query);
  }
  let disabled = selectedProduct.brand;

  return (
    <Modal show={showModal} onHide={handleCancelClose} animation={true} backdrop={true} dialogClassName='CustomDialogue'>
    <Modal.Header closeButton>
      <Modal.Title>What is this product?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
        <Form.Label>Sorry, only four sample products available right now! I need to work on product search!</Form.Label>

        <Form.Group controlId="product">
            <InputGroup className="mb-3">
              {/* <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-primary"
                title={selectedCategory}
                id="input-group-dropdown-1">
                {productTypes.map((type, i) => (
                  <Dropdown.Item onClick={() => {
                    setShowProductList(true);
                    setSelectedCategory(type)
                  }} key={i}>{type}</Dropdown.Item>
                ))}
              </DropdownButton> */}
              <Col>
                <Form.Control placeholder="Search for the product" onChange={handleSearch} value={query}/>
                <ListGroup className="ProductDropDown" style={showProductList ? {zIndex: 1050} : {display: "none"}}>
                    {products.map((product, i) => 
                      <ListGroup.Item key={i} onClick={() => {
                        setShowProductList(false);
                        setSelectedProduct(product);
                        setQuery(product.brand + " " + product.model);
                        }} className="ProductDropDownItem">
                        {product.brand + " " + product.model}
                      </ListGroup.Item>)}
                </ListGroup>
              </Col>
              <Button variant="primary" onClick={() => setShowProductList(state => !state)}>Search</Button>
            </InputGroup>
          </Form.Group>

          {selectedProduct.img && 
          <div className="ProductImageContainer">
            <Image src={selectedProduct.img} rounded fluid className="ProductImage"/>
          </div>}

          <Form.Group controlId="pros">
            <Form.Label>Pros</Form.Label>
            <Form.Control onChange={(e) => { console.log(e)}}as="textarea" rows="1" value={currentDeskProduct.pros}/>
          </Form.Group>

          <Form.Group controlId="cons">
            <Form.Label>Cons</Form.Label>
            <Form.Control as="textarea" rows="1" value={currentDeskProduct.cons} />
          </Form.Group>

          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button> &nbsp;
          <Button disabled={ !disabled } variant="primary" type="submit">
            Save
          </Button>
        
        </Form>
        </Modal.Body>
  </Modal>
  );
}