/* eslint-env browser */

import React from "react";
import ReactDOM from "react-dom";
import es6BindAll from "es6bindall";
import ReactBootstrapSlider from "./react-bootstrap-slider.jsx";

const wrapperDivStyles = {
   "backgroundColor": "#E0E0E0",
   "padding": "20px",
   "width": "300px"
};


const DemoSingleValueSpan = ( {id, value } ) => (
   <span>
        Value: <span id={"valueSpan" + id}>{ value }</span>
    </span>
);

const DemoMultiValueSpan = ( {id, value } ) => (
   <div>
        Lower Value: <span id={"valueSpan" + id + "Low"}>{ value[0] }</span><br />
        Upper Value: <span id={"valueSpan" + id + "High"}>{ value[1] }</span><br />
    </div>
);

class Demo extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         ...this.props,
         currentValue: props.startValue
      };
      delete this.state.startValue;
      es6BindAll(this, ["changeValue", "changeAxes"]);
   }
   changeValue(e) {
      this.setState({ currentValue: e.target.value });
   }
   changeAxes() {
      this.setState({
         currentValue: 500,
         min: 0,
         max: 2000,
         step: 100
      });
   }
   render() {
      var newValue = this.state.currentValue;
      var id = this.props.id;
      var valueSpan, changeAxesButton;
      if (Array.isArray(newValue)) {
         valueSpan = <DemoMultiValueSpan
                    id = { id }
                    value = { newValue } />;
      } else {
         valueSpan = <DemoSingleValueSpan
            id = { id }
            value = { newValue } />;
        changeAxesButton = <button id = {"but" + id} onClick = { this.changeAxes } > Change axes </button>;
      }
      return (
         <div>
            <div style={wrapperDivStyles}>
               <ReactBootstrapSlider
                    { ...this.state }
                    value = { this.state.currentValue }
                    handleChange = { this.changeValue } />
            </div>
             <br /> <br />
             { valueSpan }
            <br /><br />
            { changeAxesButton }
        </div>
      );
   }

}

ReactDOM.render(
   <div>
      <div className = "demoWrapper">
        <h3>Horizontal (default) demo</h3>
        <Demo
            id = "horizontalSlider"
            startValue = { 3000 }
            max = { 20000 }
            min = { 1000 }
            step = { 1000 } />
      </div>
      <div className = "demoWrapper">
      <h3>Vertical Demo</h3>
        <Demo startValue = { 3000 }
            id = "verticalSlider"
            orientation = "vertical"
            max = { 20000 }
            min = { 1000 }
            step = { 1000 }
            reversed = { true } />
      </div>
      <div className = "demoWrapper">
        <h3>Dual demo</h3>
        <Demo startValue = { [3000, 10000] }
            range = { true }
            id = "dualSlider"
            max = { 20000 }
            min = { 1000 }
            step = { 1000 } />
      </div>
      <div className = "demoWrapper">
        <h3>Ticks Demo</h3>
        <Demo id = "ticksSlider"
          startValue= { 200 }
          ticks = {[0, 100, 200, 300, 400]}
          ticks_labels = {["$0", "$100", "$200", "$300", "$400"]}
          ticks_snap_bounds = { 30 }
        />
      </div>
    </div>, document.getElementById("main"));


