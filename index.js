const express = require("express");
const { Provider } = require("oidc-provider");
const path = require("path");

const app = express();
require("dotenv").config();

const port = process.env.SERVER_PORT || 8000;

// Middleware
app.use(express.static("/public"));
app.set("view", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const configuration = {
  clients: [
    {
      client_id: "oidcCLIENT",
      client_secret: "super_user_secret",
      grant_type: ["authorization_code"],
      redirect_uri: [
        "http://localhost:8000/auth/login/callback",
        "https://oidcdebugger.com/debug",
      ],
      response_type: ["code"],
    },
  ],
  pkce: {
    required: () => false,
  },
};

const oidc = new Provider("http://localhost:8000", configuration);

app.use("/oidc", oidc.callback());

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
