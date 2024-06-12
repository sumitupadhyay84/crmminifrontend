import React, { useEffect, useState } from "react";
import api from "../api";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    api
      .get("/api/campaigns")
      .then((response) => setCampaigns(response.data))
      .then(res => console.log(res))
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, []);

  return (
    <div class="border border-primary">
      <h2>Campaigns</h2>
      <table class="table table-success table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Audience Size</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
        {campaigns.map(campaign => (
          <tr key={campaign.id}>
           <td>{campaign.id}</td>
           <td>{campaign.audienceSize}</td>
           <td>{campaign.createdAt}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Campaign;
