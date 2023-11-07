import "./inventory.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* import { useState, useEffect } from "react";
import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
baseURL: baseURL,
  timeout: 10000
}); */

const Inventory = () => {

/*   useEffect(() => {
    API.get(`/inventory`)
      .then((response) => {
        //populate divs
      });
  }, []); */

  return (
    <>
      <div className="inventory">
        <div className="inventory__header">
          <h1>Ingredients</h1>
          <i>
            <FontAwesomeIcon icon="square-plus" size="2x" style={{color: "#0d6f06",}} />
          </i>
        </div>

        <div className="inventory__items">
          
          {/* THESE ARE JUST EXAMPLE - NEED TO USE A COMPONENTS AND FETCH FROM DB */}

          <div className="inventory__items-item">
            <button>
              <p>90%</p>
            </button>
            <p>Milk</p>
          </div>

          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>
          <div className="inventory__items-item">
            <button>
              <p>60%</p>
            </button>
            <p>Ice</p>
          </div>


        </div>
      </div>
    </>
  );
};

export default Inventory;
