import { useEffect, useState } from "react";
import Chart from "./chart";

function Table() {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState("");
  const [minState, setMinState] = useState(false)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("data"));
    if (stored && stored.length > 0) {
      setData(stored);
    } else setData([]);
  }, []);
  function filterData(e) {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("data"));
    const result = stored.filter((word) => word.category === e.target.value);
    setData(result);
  }

  function deleteItem(id) {
    let result = data.filter((val) => val.id !== id)
    setData(result)
    localStorage.setItem("data", JSON.stringify(result))
  }
  function minAmount(e) {
    e.preventDefault()
    if(minState)  window.location.reload()
    let display = []
    let min_Price = parseInt(price)
    let temp = 0;
    if (price >= 100) {
      for (let i = 0; i < data.length; i++) {
        if (temp < min_Price) {
          if (temp + parseInt(data[i].price) < min_Price) {
            temp = temp+parseInt(data[i].price);
            display.push(data[i]);
          } else continue
        }
      }
      setMinState(true)
      setData(display)
    }
  }
  const listItems = data.map((val) => (
    <tr key={val.id}>
      <td><button onClick={() => { deleteItem(val.id) }} style={{ border: "none" }} className="f6 link dim ba ph3 pv2 mb2 dib mid-gray mr4 ml2 pointer">Delete</button></td>
      <td className="tc">₹ {val.price}</td>
      <td className="tc">{`${val.description
        .charAt(0)
        .toUpperCase()}${val.description.slice(1)}`}</td>
      <td className="tc">{`${val.category
        .charAt(0)
        .toUpperCase()}${val.category.slice(1)}`}</td>
      <td className="tc">{new Date(val.date).toDateString()}</td>
    </tr>
  ));
  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="flex item-center">
            <table className="w-90">
              <tr>
                <th></th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>
                  <label>Filter: </label>
                  <br />
                  <div className="mt3" />
                  <select
                    placeholder="select category"
                    onChange={(e) => {
                      filterData(e);
                    }}
                  >
                    <option value="" selected disabled hidden>
                      Select category to filter
                    </option>
                    <option value="general">General</option>
                    <option value="food">Food N Dining</option>
                    <option value="utility">utility</option>
                    <option value="shopping">Shopping</option>
                    <option value="education">Education</option>
                  </select>
                </th>
                <th>
                  <div>
                    <label>Min Amount To spend:</label>
                    <form className="flex space-between items-center w-100 mt3" onSubmit={minAmount}>
                      <input
                        id="min bill"
                        className="input-reset ba b--black-20 pa2 mb2 db w-100"
                        type="number"
                        minLength="2"
                        disabled={minState}
                        vaule={price}
                        onChange={(e) => { setPrice(e.target.value) }
                        }
                      />
                      <button style={{ border: "none" }} type="Submit" className="f6 link dim ba ph3 pv2 mb2 dib mid-gray mr4 ml2 pointer br3">{minState ? "Cancel" : "Submit"}</button>
                    </form>
                  </div>
                </th>
              </tr>
              {listItems}
            </table>
          </div>
          <Chart data={data} />
        </>
      ) : (
        <h1 className="tc">Add item to the list</h1>
      )}
    </>
  );
}

export default Table;
