require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");
const Routes = require("./controllers/Main/MainRouter");
const ejs = require("ejs");
const session = require("express-session");
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
      get stage() {
        return process.env.STAGE || "development";
      },

      get port() {
        return process.env.PORT || 3010;
      },

      get secret() {
        return process.env.SECRET || "secret";
      },
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

    //Allows the server to  parse cookie
    this.expressApp.use(cookieParser());

    //Allows the server to parse application/x-www-form-urlencoded
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));

    //Allows the server to parse form-data
    this.expressApp.use(multer().array());

    //Set JWT secret key
    this.expressApp.set("jwt-secret", this.configs.secret);

    //Use Express Session
    this.expressApp.use(
      session({
        secret: process.env.UNIQUE_KEY || "test",
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: this.configs.stage === "production",
          maxAge: 1000 * 60 * 30, // 30분
        },
      })
    );

    // set view path
    this.expressApp.set("views", path.relative("./", "src"));

    // set app view Directory and template engine
    this.expressApp.set("view engine", "ejs");
    this.expressApp.engine("html", ejs.renderFile);
    this.expressApp.use(express.static(path.relative("./", "src")));

    //Registers the routes used by the app
    new Routes(this.expressApp);
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
      console.log(`Environment: ${this.configs.stage}`);
    });
  }
}

//Runs the thing
const app = new App();
app.applyMiddleware();
app.run();
