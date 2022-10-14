<img src="https://raw.githubusercontent.com/exte0427/varjs/master/logo_main.png" width=50 height=50></img>
---
```
PREDICTABLE
REUSABLE
TYPESCRIPT CODE
```
---
# WHAT IS VAR.TS
Var.Ts is a **web framework**\
you can easily use Var.Ts by installing it

Var.Ts is aimed at **easy of use** and **division**

---
# HOW TO INSTALL
first, you should download var-ts by using npm\
if you aren't experienced, write this command perfectly
```
npm i -g var-ts
```

and open the folder you're going to work on
then, write this command
```
var-ts new
```

you made your first **Var.Ts project!**\
you can simply run it by writing
```
npm start
```
---
# ABOUT THE FOLDERS
```
YOUR FOLDER
ㄴ Asset
ㄴ Build
ㄴ Work
  ㄴ router.tsx
  ㄴ main.css
  ㄴ app.tsx
```
**Asset** folder is for the assets used in your project\
**Work** folder is for the codes you write

Var.Ts recognizes your code by approaching **router.tsx**\
so be sure your **router.tsx** file isn't deleted

---
# HOW TO USE
## Before start..
you should import **var-web** in every **tsx** file
```tsx
import { Var } from "var-web";
```
and your file extension must be **tsx**

## Routing
```tsx
import { Var } from "var-web";
import { App } from "./app";

import "./main.css";
import "./bootstrap.min.css";

// your first app
Var.Path.start({
    "/": (<App />)
});
```
this is the code in **route.tsx** file\
as you can see, you can set pages by using **Var.Path.Start**
```tsx
Var.Path.start({
  path(string) : data(Virtual Dom),
  ...
});
```
if you want to make info page, you can code
```tsx
Var.Path.start({
  "/" : (Main),
  "/info" : (Info)
});
```
if users connect to your website with
`localhost:3000/?msg=hi`
`msg` is automatically added to `Main` dom's states
```tsx
// in Main class
this.states.msg // "hi"
```
you can use `localhost:3000#anything`\
`anything` will be automatically added to `Main` dom's states' hash
```tsx
// in main class
this.states.hash  // "anything"
```
you can make your webpage change by using `Var.Path.set`
```tsx
Var.Path.set(`/`,{
    "msg":"hi"
});
// this code will change your webpage
// localhost:3000/
// and msg will be automatically added to the class
```
## Dom
you can make custom element by using Var.Dom
```tsx
class Cat extends Var.Dom {
  onRender = () => (
    <div>
      cat
    </div>
  );

  onStart = () => {
    ...
  }
}
```
if you want to set variable, you can just set it
```tsx
class Cat extends Var.Dom {
  cat = 0;
  onRender = () => (
    <div>
      {this.cat}
    </div>
  );

  onStart = () => {
    this.cat++;
  }
}
```
you can use event system same as plain js'
```tsx
class Cat extends Var.Dom {
  cat = 0;
  catPlus = () => {
    this.cat++;
  }
  onRender = () => (
    <div>
      {this.cat}
    </div>
    <button onclick = {catPlus}>
      cat ++
    </button>
  );

  onStart = () => {
    this.cat++;
  }
}
```
**Warning** you should set functions like
```tsx
funcName = () => { ... }
```
not
```tsx
funcName(){...}
```
you can use **key** when you printing array
```tsx
class Cat extends Var.Dom {
  cat = [
    {
      data:"meow",
      key:0
    },
    {
      data:"야옹",
      key:1
    },
    {
      data:"喵",
      key:2
    }
  ];

  catPlus = () => {
    this.cat++;
  }
  onRender = () => (
    <div>
      {this.cat.map(e=>(
        <text key={e.key}>{e.data}</text>
      ))}
    </div>
  );
}
```
**Warning** don't use **key element** and **not key element**\
in the same parent
```tsx
<div>
  {this.cat.map(e=>(
        <text key={e.key}>{e.data}</text>
  ))}
  <div>
    cat
  </div>
</div>
// no!
```
you can get states by `this.states`
```tsx
// get state var
this.states.var

//state can be anything
typeof this.states.var.something === `object`
```
## Component
you can make component by using **Var.Component**\
you can use it just like a component(unity)
```tsx
class A extends Var.Component {
  private some = ...;
  method1 = () => {...}
  onStart = () => {...}
}
```
and **Dom** can use Components
```tsx
class Cat extends Var.Dom {
  myA = this.use(A);
  onRender = () => (
    <div>
      {myA.method1()}
    </div>
  );
}
```
## Css
you can use css by two ways\
### use main.css
you can code css in main.css file\
or you can import some css file by 
```tsx
import "./bootstrap.css"
```
### use Var.Css
if the dom's style needs variables\
you can use Var.Css
```tsx
class CatStyle extends Var.Component {
  variable1 = "white";
  style = () => ({
    color:this.variable1
  });
}

class myDom extends Var.Dom {
  catStyle = this.use(CatStyle);
  onRender = () => (
    <div style = {this.catStyle.style()}>
      hi
    </div>
  )
}
```
use `function` to make `your style` change by changing variable

## Some Tips
you can use `this.setInterval` or `this.setTimeOut` to avoid\
errors which occur when the page is changed

---
**thank you**