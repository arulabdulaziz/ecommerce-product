import React, { useEffect, useState } from "react";
import ProductMenuCard from "./ProductMenuCard";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Spinner, Row, Col } from "react-bootstrap";
import axios from "../axios/axios";
function Menu(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const queryCategory = useLocation().search;
  useEffect(async () => {
    try {
      setError(null);
      setLoading(true);
      const { data } = await axios.get(`products${queryCategory}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
      setError(Error);
    } finally {
      setLoading(false);
    }
    return () => {
      setProducts([]);
      setLoading(false);
      setError(false);
    };
  }, [queryCategory]);
  const title = (
    <div>
      <h4>
        <strong>List Menu</strong>
      </h4>
      <hr />
    </div>
  );
  if (loading) {
    return (
      <div className="text-center">
        {title}
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  } else if (error) {
    return (
      <div>
        {title}
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }
  return (
    <div>
      {title}
      <Row>
        {products.map((e, i) => (
          <Col md={4} xs={6} className="mb-4" key={i}>
            <ProductMenuCard
              product={e}
              addToCart={(value) => props.addToCart(value)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Menu;
