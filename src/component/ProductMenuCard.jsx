import React from 'react'
import { Col, Card } from "react-bootstrap";
import { convertMoney } from "../helper";
function ProductMenuCard(props) {
    return (
      <div
        className="card-product cursor-pointer"
        onClick={() => props.addToCart(props.product)}
      >
        <Card className="shadow mb-4">
          <Card.Img
            variant="top"
            src={props.product.image}
            style={{ objectFit: "cover", height: "10rem" }}
            className="fluid img-fluid"
          />
          <Card.Body>
            <Card.Title>
              {props.product.name} <strong>({props.product.code})</strong>
            </Card.Title>
            <Card.Text>{convertMoney(props.product.price)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
}

export default ProductMenuCard
