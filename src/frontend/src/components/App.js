import React, { useState, useEffect } from "react";
import './App.css';
import Ui from "./ui";


function App() {
  const initialData = {
    loaded: false,
    placeholder: "Loading..",
    error: false,
    cryptos: {
    }
  };
  const [oldData, newData] = useState(initialData, () => {
    console.log("useState will run only once while compnent update")
  },
    []);

  useEffect(() => {
    fetch("api/prices/")
      .then(response => {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      }).then(data => {
        if (data !== null) {
          newData(() => {
            return {
              cryptos: data,
              error: false,
              loaded: true
            };
          });
        }
      }).catch(error => {
        return newData(() => {
          return { placeholder: "Something went wrong!", error: true };
        });
      });

  }, [oldData]);


  return (
    <div>
      <Ui response={oldData} />
    </div>
  );
};

export default App;
