import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Audience = () => {
  const [rules, setRules] = useState({ field: "", operator: "", value: "" });
  const [audienceSize, setAudienceSize] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRules({ ...rules, [name]: value });
  };

  const evaluateAudience = () => {
    if (!rules.field || !rules.operator || !rules.value) {
      alert("Please enter values");
    } else {
      api
        .post("/api/audiences/evaluate", { ...rules })
        .then((response) => setAudienceSize(response.data))
        .catch((error) => console.error("Error evaluating audience:", error));
    }
  };

  const saveAudience = () => {
    if (!rules.field || !rules.operator || !rules.value) {
      alert("Please enter values");
    } else {
      api
        .post("/api/audiences/addrule", { ...rules})
        .then(() => {
          alert("Audience saved successfully");
          navigate("/Campaign");
        })
        .catch((error) => console.error("Error saving audience:", error));
    }
  };

  return (
    <div class="row">
      <h2>Create Audience</h2>
      <div class="row mb-2">
        <div class="col">
          <select
            class="form-select"
            name="field"
            value={rules.field}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Field</option>
            <option value="total_spends">Total Spends</option>
            <option value="total_visits">Max Visits</option>
            <option value="last_visit_date">Last Visit Date</option>
          </select>
        </div>

        <div class="col">
          <select
            class="form-select"
            name="operator"
            value={rules.operator}
            onChange={(e) => handleChange(e)}
          >
            <option value="">Select Operator</option>
            <option value=">">{">"}</option>
            <option value="<">{"<"}</option>
            <option value="=">{"="}</option>
          </select>
        </div>

        <div class="col">
          <input
            class="form-control"
            type="text"
            placeholder="Value according first field"
            name="value"
            value={rules.value}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>

      <div class="d-grid gap-2 d-md-flex justify-content-md-start">
        <button
          type="button"
          class="btn btn-primary"
          onClick={evaluateAudience}
        >
          Check Audience Size
        </button>
        <button type="button" class="btn btn-success" onClick={saveAudience}>
          Save Audience
        </button>
      </div>
      <div class="p-2 mb-2 mt-2">
        {audienceSize !== null && <p>Audience Size: {audienceSize}</p>}
      </div>
    </div>
  );
};

export default Audience;
