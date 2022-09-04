import { Var } from "var-web";
import { App } from "./app";

// your first app
Var.Path.start({
    "/": App,
});
