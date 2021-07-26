import React from "react";
import STATE_NAMES from "./states";
import STATE_CODES from "./statecodes";

function Trail({ url }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  var [covid_data, setCoviddata] = React.useState();
  var [change, setChange] = React.useState(false);
  var dateref = React.useRef("");
  var selectref = React.useRef();
  var [date, setDate] = React.useState("2021-07-21");
  console.log(date);

  React.useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw response;
        }
      })
      .then((data) => {
        console.log(data);
        setCoviddata(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [change]);
  if (loading) return "Loading...";
  if (error) return "Error!";
  return (
    <div>
      <input class="form-control" ref={dateref} placeholder="yyyy-mm-dd" />
      <select
        class="form-select"
        aria-label="Default select example"
        ref={selectref}
      >
        <option selected>Open this select menu</option>
        <option value="total-data">Total</option>
        <option value="state-data">Statewise</option>
      </select>
      <button
        type="button"
        class="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          console.log("inside app component", dateref.current.value);

          console.log("select", selectref.current.value);
          url =
            "https://u8mndf.deta.dev/" +
            selectref.current.value +
            dateref.current.value;
          setDate(dateref.current.value);
        }}
      >
        Submit
      </button>{" "}
      <h2>{covid_data.Date}</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">state</th>
            <th scope="col">Confirmed</th>
            <th scope="col">Deceased</th>
            <th scope="col">Recovered</th>
          </tr>
        </thead>
        <tbody>
          {STATE_CODES.map((state) => {
            return (
              <tr>
                <td>{STATE_NAMES[state]}</td>
                <td>{covid_data["Confirmed"][state]}</td>
                <td>{covid_data["Deceased"][state]}</td>
                <td>{covid_data["Recovered"][state]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Trail;
