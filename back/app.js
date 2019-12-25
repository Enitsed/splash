require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Routes = require("./controllers/Main/MainRouter");
const ejs = require("ejs");
const path = require("path");

class App {
  /**
   *
   *
   * Sets the properties to be used by this class to create the server
   *
   */
  constructor() {
    this.expressApp = express();

    //Literal object containing the configurations
    this.configs = {
      get port() {
        return process.env.PORT || 3010;
      }
    };
  }

  /**
   *
   *
   * Applies any middleware to be used by this app
   *
   */
  applyMiddleware() {
    //Allows the server to parse json
    this.expressApp.use(bodyParser.json());

    // set view path
    this.expressApp.set("views", "./src");
    this.expressApp.set("view engine", "ejs");
    this.expressApp.engine("html", ejs.renderFile);
    this.expressApp.use(express.static("./src"));

    //Registers the routes used by the app
    new Routes(this.expressApp);
    // set app view Directory and template engine
  }

  /**
   *
   *
   * Runs the app
   *
   */
  run() {
    this.expressApp.listen(this.configs.port, () => {
      console.log(
        "Express server running project on port " + this.configs.port + "."
      );
      console.log(`Environment: ${process.env.STAGE || "development"}`);
    });
  }
}

//Runs the thing
const app = new App();
app.applyMiddleware();
app.run();
