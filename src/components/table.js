import { useEffect, useState } from "react";
import Chart from "./chart";

function Table() {
  const [data, setData] = useState([]);
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
  function deleteItem(id){
    let result = data.filter((val) => val.id !== id)
    setData(result)
    localStorage.setItem("data", JSON.stringify(result))
  }
  const listItems = data.map((val) => (
    <tr key={val.id}>
      <td><button onClick={() => {deleteItem(val.id)}}style={{border:"none"}} className="f6 link dim ba ph3 pv2 mb2 dib mid-gray mr4 ml2 pointer">Delete</button></td>
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
            <table className="w-70">
              <tr>
                <th></th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Date</th>
                <th>
                  <label for="category">Filter: </label>
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
                    <option value="food">FoodNDining</option>
                    <option value="utility">utility</option>
                    <option value="shopping">Shopping</option>
                    <option value="education">Education</option>
                  </select>
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
