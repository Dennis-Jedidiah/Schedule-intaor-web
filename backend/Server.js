
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
  get(route, handler) {
    this.app.get(route, handler);
  }
  post(route, handler) {
    this.app.post(route, handler);
  }
  static(root, [options]) {
    this.app.use(express.static(root, options));
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`);
    });
  }
}
