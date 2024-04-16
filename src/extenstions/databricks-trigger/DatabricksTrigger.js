import React, { useEffect, useState } from "react";
import { Button, TextField, TextFieldGroup } from "@tableau/tableau-ui";
import { triggerDatabricksAPI } from "../ExtensionsRestService";
import { Link } from "react-router-dom";

function DatabricksTrigger() {
  const [response, setResponse] = useState("");
  const [dashboard, setDashboard] = useState("");
  const [worksheets, setWorksheets] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [filters, setFilters] = useState([]);
  const [email, setEmail] = useState("");
  const [istriggered, setIsTriggered] = useState(false);

  useEffect(() => {}, []);
  const handleClick = () => {
    setIsTriggered(true);
    tableau.extensions.initializeAsync().then(() => {
      const worksheetContent = tableau.extensions.worksheetContent;
      console.log(worksheetContent);

      const dashboard = tableau.extensions.dashboardContent.dashboard;
      setDashboard(dashboard.name);
      const worksheets = dashboard.worksheets.map(
        (worksheet) => worksheet.name
      );
      setWorksheets(worksheets);

      const filters = dashboard.worksheets[0].getFiltersAsync();
      console.log(filters);
      filters.then((filters) => {
        setFilters(
          filters.map((filter) => {
            const fieldName = filter.fieldName;
            const appliedValues =
              filter.appliedValues.length > 0
                ? filter.appliedValues
                    .map((appliedValue) => appliedValue.value)
                    .join(", ")
                : filter.isAllSelected == true
                ? "All"
                : "None";

            return `${fieldName}: ${appliedValues}`;
          })
        );
      });
    });
    const requestBody = {
      notebook_params: {
        age_list:
          "18 to 24|25 to 29|30 to 34|35 to 39|40 to 44|45 to 49|50 to 54|55 to 59|60 to 64|65 to 69|70 to 74|75 to 79|80 to 84|85 plus",
        camp_length: "8 Weeks",
        cpm_ctv: "",
        cpm_olv: "",
        cpm_yt: "",
        cpp_ltv: "",
        freq_ctv: "",
        freq_ltv: "",
        freq_olv: "",
        freq_yt: "",
        gender_list: "Female|Male",
        province_list:
          "Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland and Labrador|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon",
        split_ctv: "10",
        split_ltv: "40",
        split_olv: "30",
        split_yt: "20",
        total_budget: "1000000",
        session_id: "sample_test_extension1",
        email: email,
      },
      job_id: 693911085357332,
      dashboardUrl:
        "https://tableau.mediaiqdigital.com/t/MediaAnalyticsSite/views/CATotalVideoPlanner/TVOptimizer?:size=1200,1900&:render=true&:refresh=y",
    };
    setEmail("");
    setResponse("");
    triggerDatabricksAPI(requestBody).then((response) => {
      setResponse(response.data.trustedTicket);
    });
  };
  const textFieldProps = {
    label: "",
    onChange: (e) => setEmail(e.target.value),
    onClear: () => setEmail(""),
    placeholder: "Enter your Email Address",
    style: { width: 300 },
    value: email,
  };

  return (
    <>
      <TextFieldGroup
        button={
          <Button
            kind="outline"
            density="low"
            children="Trigger Databricks"
            onClick={handleClick}
          />
        }
        textField={<TextField kind="outline" {...textFieldProps} />}
      />
      {response != "" && (
        <div
          style={{
            position: "absolute",
            marginTop: "30px",
          }}
        >
          <div>Job ran successful.</div>
          <div>Response(Trusted Ticket): {response}</div>
          <Link
            style={{
              position: "absolute",
              marginTop: "30px",
            }}
            to="/"
          >
            <button>Back to Home</button>
          </Link>
        </div>
      )}
      {response == "" && istriggered && (
        <div
          style={{
            position: "absolute",
            marginTop: "30px",
          }}
        >
          <div>Email: {email}</div>
          <div>Dashboard: {dashboard}</div>
          <div>Worksheets: {worksheets.join(", ")}</div>
          <div>
            Filters:
            {filters.map((filter, index) => (
              <div key={index}>{filter}</div>
            ))}
          </div>
          <div style={{ marginTop: "20px" }}>
            Job Triggered. Waiting for Response...
          </div>
          <Link
            style={{
              position: "absolute",
              marginTop: "30px",
            }}
            to="/"
          >
            <button>Back to Home</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default DatabricksTrigger;
