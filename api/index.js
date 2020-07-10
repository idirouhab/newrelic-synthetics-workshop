require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

const action = process.argv[2];
const id = process.argv[3];

const SYNTHETICS_ENDPOINT = {
  EU: "https://synthetics.eu.newrelic.com/synthetics/api",
  US: "https://synthetics.newrelic.com/synthetics/api",
}[process.env.REGION];

const headers = { "X-Api-Key": process.env.ADMIN_API_KEY, "content-type": "application/json" };

const getAllMonitors = () => {
  return axios.get(`${SYNTHETICS_ENDPOINT}/v3/monitors`, { headers });
};

const createMonitor = () => {
  const rawdata = fs.readFileSync("./payloads/create.json");

  return axios.post(`${SYNTHETICS_ENDPOINT}/v3/monitors`, JSON.parse(rawdata), { headers });
};

const deleteMonitor = (id) => {
  return axios.delete(`${SYNTHETICS_ENDPOINT}/v3/monitors/${id}`, { headers });
};

const updateMonitor = (id) => {
  const rawdata = fs.readFileSync("./payloads/update.json");
  return axios.put(`${SYNTHETICS_ENDPOINT}/v3/monitors/${id}`, JSON.parse(rawdata), { headers });
};

switch (action) {
  case "create":
    createMonitor()
      .catch(err => {console.log(err.message);});
    break;
  case "list":
    getAllMonitors()
      .then(response => response.data)
      .then(data => {
        data.monitors.forEach(monitor => {
          console.log(`${monitor.id}: ${monitor.name} - ${monitor.type}`);
        });
      })
      .catch(err => {console.log(err.message);});
    break;
  case "update":
    updateMonitor()
      .catch(err => {console.log(err.message);});
    break;
  case "delete":
    deleteMonitor(id)
      .then(data => {
        console.log(data.statusCode);
      })
      .catch(err => {console.log(err.message);});
    break;

}





