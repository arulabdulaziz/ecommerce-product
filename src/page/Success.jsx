import React from 'react'
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
function Success() {
    return (
      <div className="mt-4 text-center">
        <Image src="success.svg" width="500" />
        <h2>Success To Order</h2>
        <p>Thanks For your Order!</p>
        <Button variant="primary" as={Link} to="/">
          Back
        </Button>
      </div>
    );
}

export default Success
