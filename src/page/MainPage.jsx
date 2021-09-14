import React, { useState, useEffect } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import ListCategory from "../component/ListCategory";
import { useLocation, useHistory } from "react-router";
import Menu from "../component/Menu";
import Result from "../component/Result";
import axios from "../axios/axios";
import swal from "sweetalert";
export default function MainPage(props) {
  const [charts, setCharts] = useState([]);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [errorCharts, setErrorCharts] = useState(null);
  useEffect(async () => {
    fetchCharts()
    return () => {
      setCharts([]);
    };
  }, []);
  const fetchCharts = async () => {
    try {
      setLoadingCharts(true);
      const { data } = await axios.get("charts");
      console.log(data, "<< data charts");
      setCharts(data);
    } catch (error) {
      console.log(error);
      setErrorCharts(error);
    } finally {
      setLoadingCharts(false);
    }
  };
  const addToCart = async (value) => {
    try {
      const { data } = await axios.get("charts?product.id=" + value.id);
      if (data.length == 0) {
        const payload = {
          amount: 1,
          total_price: value.price,
          product: value,
          note: "",
        };
        const { data: dataAdd } = await axios.post("charts", payload);
        const newChart = JSON.parse(JSON.stringify(charts));
        newChart.push(dataAdd);
        setCharts(newChart);
      } else {
        const payload = {
          amount: +data[0].amount + 1,
          total_price: data[0].total_price + value.price,
          product: value,
          note: data[0].note,
        };
        const { data: dataPut } = await axios.put(
          "charts/" + data[0].id,
          payload
        );
        const newChart = charts.map((e) => {
          if (e.id == dataPut.id) {
            e = dataPut;
          }
          return e;
        });
        setCharts(newChart);
      }
      console.log(charts);
      swal({
        title: "Success Add To Chart",
        text: value.name + " has been added to chart",
        icon: "success",
        button: false,
        timer: 1500,
      });
    } catch (error) {
      swal({
        title: "Error",
        icon: "error",
        text: JSON.stringify(error),
      });
    }
  };
  return (
    <div className="mt-3">
      {/* <Image
        src="success.svg"
        style={{ objectFit: "cover", height: "20rem" }}
        className="fluid img-fluid"
      /> */}
      <Container fluid>
        <Row>
          <Col md={2}>
            <ListCategory />
          </Col>
          <Col md={7}>
            <Menu addToCart={addToCart} />
          </Col>
          <Col md={3}>
            <Result
              loading={loadingCharts}
              error={errorCharts}
              charts={charts}
              fetchCharts={fetchCharts}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
