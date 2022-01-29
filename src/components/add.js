import { useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import DataContext from "../context/index";

function Add() {
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const { } = useContext(DataContext);

  function addToLocal(e) {
    e.preventDefault();
    if (description === "" || price === 0) {
      alert("Don't spam the site enter the right value");
      return;
    }
    let check = JSON.parse(localStorage.getItem("data"));
    if (!check) {
      var data = [];
      var data1 = { category, price, description, id: uuidv4(),date:Date.now()};
      data.push(data1);
      localStorage.setItem("data", JSON.stringify(data));
    } else {
      let stored = JSON.parse(localStorage.getItem("data"));
      let data1 = { category, price, description, id: uuidv4(),date:Date.now()};
      stored.push(data1);
      localStorage.setItem("data", JSON.stringify(stored));
    }
    window.location.reload();
  }
  const inputForm = () => {
    return(
      <form className="w-100 flex justiy-between" onSubmit={addToLocal}>
      <div className="pa4 black-80 w-25">
        <label for="name" className="f6 b db mb2">
          Description
        </label>
        <input
          maxLength="32"
          minLength="3"
          pattern="[A-Za-z\s]+"
          id="name"
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          aria-describedby="name-desc"
          type="text"
          vaule={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <small id="name-desc" className="f6 black-60 db mb2">
          Description
        </small>
      </div>
      <div className="pa4 black-80 w-25">
        <label for="name" className="f6 b db mb2">
          Cost <span className="normal black-60">(inr)</span>
        </label>
        <input
          id="name"
          className="input-reset ba b--black-20 pa2 mb2 db w-100"
          type="number"
          minLength="3"
          pattern="[0-9]+"
          aria-describedby="name-desc"
          vaule={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <small id="name-desc" className="f6 black-60 db mb2">
          Add cost
        </small>
      </div>
      <div className="w-25 flex items-center">
        <div>
          <label for="category">Choose a category: </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
          >
            <option value="general">General</option>
            <option value="food">FoodNDining</option>
            <option value="utility">utility</option>
            <option value="shopping">Shopping</option>
            <option value="education">Education</option>
          </select>
        </div>
      </div>
      <div className="flex">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <button
            style={{ border: "none" }}
            className="f6 link dim ph3 pv2 mb2 dib white bg-light-purple br3 pointer"
            type="Submit"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
    )
  }
  return (
   inputForm()
  );
}

export default Add;
