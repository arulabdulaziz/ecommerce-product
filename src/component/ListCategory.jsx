import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { ListGroup, Spinner } from "react-bootstrap";
import axios from "../axios/axios";
function ListCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(useLocation().search);
  const history = useHistory();
  useEffect(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("categories");
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return () => {
      setCategories([]);
    };
  }, []);
  function isActive(name) {
    //   console.log(name, "<<< name")
    if (!name) {
      if (!query) return true;
      return false;
    }
    let queryCategory = "";
    if (query) {
      queryCategory = query.replace("?category.name=", "");
    }
    if (queryCategory == name) return true;
    return false;
  }
  const Icon = ({ name }) => {
    if (!name) {
      return <FontAwesomeIcon icon={faAlignJustify} className="m-0 p-0 mr-2" />;
    }
    if (name.toLowerCase() === "makanan")
      return <FontAwesomeIcon icon={faUtensils} className="m-0 p-0 mr-2" />;
    if (name.toLowerCase() === "minuman")
      return <FontAwesomeIcon icon={faCoffee} />;
    if (name.toLowerCase() === "cemilan")
      return <FontAwesomeIcon icon={faCheese} className="m-0 p-0 mr-2" />;

    return <FontAwesomeIcon icon={faAlignJustify} className="m-0 p-0 mr-2" />;
  };
  function changeCategory(name) {
    // console.log(name)
    if(!name){
        history.push({search: ""})
        setQuery("")
    }else{
        history.push({search: `?category.name=${name}`})
        setQuery(`?category.name=${name}`);
    }
  }
  return (
    <div>
      <h4>
        <strong>List Category</strong>
      </h4>
      <hr/>
      <ListGroup>
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={isActive(null)}
          onClick={() => changeCategory(null)}
        >
          <h5>
            <Icon nama={null} />
            All
          </h5>
        </ListGroup.Item>
        {loading && <Spinner animation="border" role="status"></Spinner>}
        {categories.map((category) => {
          return (
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              active={isActive(category.name)}
              key={category.id}
              onClick={() => changeCategory(category.name)}
            >
              <h5>
                <Icon name={category.name} /> {category.name}
              </h5>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}

export default ListCategory;
