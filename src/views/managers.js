import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "./dummyData/pManagerData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Toast from '../utils/toast';

const columns = [
  {
    dataField: "fullName",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <Link key={row.id} to={`/manage/manager/${row.id}`}>
          {row.fullName}
        </Link>
      );
    },
    text: "Name",
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    },
  },
  {
    dataField: "properties",
    formatter: (cell, row, rowIndex, formatExtraData) => {
      return (
        <ul>
          {row.properties.map((property) => (
            <li key={property.name}>{property.name}</li>
          ))}
        </ul>
      );
    },
    text: "Properties",
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    },
  },
  {
    dataField: "email",
    text: "Email",
    sort: true,
    headerStyle: () => {
      return { width: "20%" };
    },
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    },
  },
  {
    dataField: "lastUsage",
    text: "Last Usage",
    sort: true,
    headerStyle: () => {
      return { width: "10%" };
    },
  },
];

const selectRow = {
  mode: "checkbox",
  clickToSelect: true,
  sort: true,
  headerColumnStyle: () => {
    return { width: "5%" };
  },
};

const Managers = () => {

  // re-purpose getProperties once API is configured to retrieve tenant and properties for Property Managers
  // eslint-disable-next-line no-unused-vars
  const getProperties = (context) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/properties`, {
        headers: { Authorization: `Bearer ${context.user.accessJwt}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        Toast(error, "error");
        console.log(error);
      });
  };

  return (
    <div className="managers">
      <div className="section-header">
        <h2 className="page-title">Property Managers</h2>
        <Link className="button is-rounded" to="/manage/managers">
          + ADD NEW
        </Link>
      </div>
      <div>
        <input></input>
      </div>
      <div className="invite-button">
        <button className="button is-rounded" type="submit">
          <FontAwesomeIcon
            className="button__envelope-icon"
            icon={faEnvelope}
          />{" "}
          Invite
        </button>
      </div>
      <BootstrapTable
        keyField="id"
        data={PROPERTY_MANAGER_DATA}
        columns={columns}
        selectRow={selectRow}
        bootstrap4={true}
        headerClasses="table-header"
        wrapperClasses="managers__table"
      />
    </div>
  );
};

export default Managers;
