import React, {Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Link } from "react-router-dom";
import * as axios from "axios";
import { PROPERTY_MANAGER_DATA } from "./dummyData/pManagerData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search/index"

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

export class Managers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      managers: PROPERTY_MANAGER_DATA,
      filteredManagers: [],
      isFiltered: false
    }
  }

  setIsFilteredManagersFalse = async () => {
    await this.setState({isFiltered: false});
  }

  setOutputState = async (output, isTrue) => {
    await  this.setState({
      filteredManagers: output,
      isFiltered: isTrue
    });
  }

  componentDidMount() {
    this.setState({managers: PROPERTY_MANAGER_DATA})
  }

  // re-purpose getProperties once API is configured to retrieve tenant and properties for Property Managers
  // eslint-disable-next-line no-unused-vars
  getProperties = (context) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/properties`, {
        headers: { Authorization: `Bearer ${context.user.accessJwt}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  render() {
    return (
        <div className="managers">
          <div className="section-header">
            <h2 className="page-title">Property Managers</h2>
            <Link className="button is-rounded" to="/manage/managers">
              + ADD NEW
            </Link>
          </div>

          <Search
              input={this.state.managers} outputLocation={this.state.filteredManagers}
              isFilteredLocation={this.state.isFiltered}
              setIsFilteredStateFalse={this.setIsFilteredManagersFalse}
              setOutputState={this.setOutputState}
              placeholderMessage="Search properties by name, address, or property manager"
          />

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
              data={ this.state.isFiltered === true ? this.state.filteredManagers : this.state.managers }
              columns={columns}
              selectRow={selectRow}
              bootstrap4={true}
              headerClasses="table-header"
              wrapperClasses="managers__table"
          />
        </div>

    );
  }
};

