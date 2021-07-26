import React from "react";
import STATE_NAMES from "./states";
import STATE_CODES from "./statecodes";

function Trail() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  var [covid_data, setCoviddata] = React.useState();

  var dateref = React.useRef("");
  var [date, setDate] = React.useState("2021-07-21");
  console.log(date);

  React.useEffect(() => {
    fetch(`https://u8mndf.deta.dev/state-data/${date}`)
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
  }, [date]);
  if (loading) return "Loading...";
  if (error) return "Error!";
  return (
    <div>
      <input class="form-control" ref={dateref} placeholder="yyyy-mm-dd" />
      <button
        type="button"
        class="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          console.log("inside app component", dateref.current.value);
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
