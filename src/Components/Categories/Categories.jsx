import React, { useEffect, useState } from "react";
import styles from "./Categories.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serachList, setSerachList] = useState([]);
  console.log(searchTerm);
  useEffect(() => {
    setSerachList(
      data?.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  useEffect(() => {
    setSerachList(data);
  }, []);

  async function allCategories() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return data.data;
  }
  const { isError, error, isLoading, data } = useQuery(
    "Categories",
    allCategories
  );
  useEffect(() => {
    allCategories();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5 text-success">All-Categories</h2>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-5"
          id="search"
          name="search"
        />
        <div className="row g-3">
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{error}</div>}
          {serachList &&
            serachList?.map((cat) => (
              <div className="col-md-3">
                <div
                  className="card "
                  onClick={() => {
                    window.location = `/categories/${cat.id}`;
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={cat.image} className="" alt={cat.name} />
                  <div className="card-body">
                    <h4 className="card-title text-center ">{cat.name}</h4>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
