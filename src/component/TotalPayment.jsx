import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { convertMoney } from "../helper";
import axios from "./../axios/axios";
import { useHistory } from "react-router-dom";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function TotalPayment(props) {
  const history = useHistory();
  const totalPayment = props.charts.reduce(function (result, item) {
    return result + item.total_price;
  }, 0);
  function submitTotalPayment(payload) {
    const { charts } = props;
    const promiseAllCharts = [];
    charts.forEach((e) => {
      promiseAllCharts.push(axios.delete("charts/" + e.id));
    });
    Promise.all(promiseAllCharts).then((data) => {
      console.log(data);
    });
    history.push("/success");
  }
  const content = (
    <Row>
      <Col
        md={{ span: 3, offset: 9 }}
        className="px-4"
        style={{ overfloWrap: "break-word" }}
      >
        <h4>
          Total Payment :
          <strong className="float-right mr-2">
            {convertMoney(totalPayment)}
          </strong>
        </h4>
        <Button
          variant="primary"
          block
          className="mb-2 mt-4 mr-2"
          size="lg"
          onClick={() => submitTotalPayment(totalPayment)}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> <strong>PAY</strong>
        </Button>
      </Col>
    </Row>
  );
  return (
    <>
      <div className="fixed-bottom d-none d-md-block">{content}</div>
      <div className="d-sm-block d-md-none">{content}</div>
    </>
  );
}

export default TotalPayment;
