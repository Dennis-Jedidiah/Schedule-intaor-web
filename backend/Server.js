
import express from "express";

export default class Server {
  constructor(app, port, filepath) {
    this.app = app;
    this.port = port;
    this.path = filepath;
  }

  test(testValue) {
    console.log(testValue);
  }
  use(middleware) {
    this.app.use(middleware);
  }
  get(route, ...handlers) {
    this.app.get(route, ...handlers);
  }
  post(route, ...handlers) {
    this.app.post(route, ...handlers);
  }
  static(root, options = null) {
    this.app.use(express.static(root, options));
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    //   res.status(200)
    });
  }
  isOn(){
    return this.app.listening;
  }
}
