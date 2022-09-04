import { Var } from "var-web";

import "./main.css"
import { Css } from "./css";

export class App extends Var.Dom {

    onRender = () => (
        <div style={Css.div1}>
            <div style={Css.div2}>
                Var App
            </div>
        </div>
    );
}