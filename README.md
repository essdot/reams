# reams

React + front-end streams.

This project seeks to combine React with Node streams for creating web UIs. Streams are a nice abstraction for building web UIs -- input, output, and something happening in between. Streams are easy to combine, to achieve
interesting functionality in your app. They all have the same interface.

This project also seeks to repackage React's API to be more easily-consumed.
This includes HTML templates: JSX is alright, but really the best way to describe HTML is in HTML. (Also, this implies templates separate from JS
logic.)

This project uses `react-templatify` and `react-templates` to
complile HTML templates into React. This is transparent to React, so
nothing further is needed in order to start using HTML templates - just
the transform and its dependencies. The HTML compiles into a render function you can require and pass like any other.

This also includes reorienting the API around creating a single component.
Just call a function, and arguments are simple - element and template; initial state if you need it; and pass whatever else directly to React if you need 
that.


## React create functions

### react-component

```javascript
create_react_component(
	parent_element, template, _initial, _react_options
) -> ReactComponent
```

Simply repackages React's `render/createElement/CreateClass` dance.
Typically you create a `ReactClass`, then immediately call 
`React.createElement` with the class, then call `React.render` with an element.
This just simplifies that, but lets you pass whatever you want on to React.

Arguments:

- `parent_element`: Element for the React component to render into. If this
  element has any content it will be replaced by the template. This element is
  passed to `React.render`.

- `template`: A compiled template, or any React render function

- `_initial`: Initial state object, optional

- `_react_options`: Any additional options to pass to `React.createClass`

Properties:

- `parent_el`: The parent element above

Methods:

- `unrender()`: Calls `React.unmountComponentAtNode`.


[React Component API doc](http://facebook.github.io/react/docs/component-api.html)

### react-stream

```javascript
create_react_stream(
	parent_element, template, _initial, _react_options
) -> Stream
```

A `through` stream that wraps a React component. Writing to the stream calls
`setState` on the React component, and re-renders the component. When the 
stream ends, it unrenders the component.

The stream emits for the following lifecycle events on the component: 
`componentDidMount`, `componentWillMount`, `componentWillUnmount`, `componentWillReceiveProps`, `componentWillUpdate`, `componentDidUpdate`. You
can use `stream.on` to listen for those events, or you can pass your own 
event listeners directly to React, with the `_react_options` argument. 

- `parent_element`: Element for the React component to render into. If this
  element has any content it will be replaced by the template. This element is
  passed to `React.render`.

- `template`: A compiled template, or any React render function

- `_initial`: Initial state object, optional

- `_react_options`: Any additional options to pass to `React.createClass`

Properties:

- `component`: The ReactComponent.


==========


## Examples

### react-slider
`create_react_slider(parent_element, _initial) -> Stream`

Returns a stream with a React component. Writing a number to the stream
sets the value of the slider, and the stream emits every time the value
changes.

Arguments:
- `parent_element`: Element for the React component to render into. If this
  element has any content it will be replaced by the slider.
- `_initial`: Initial value for the slider (number). Optional, defaults to 0

Stream properties:
- `component`: React component

### autocomplete
Text search box with results listed below.

`create_autocomplete(parent_element, query_stream) -> Stream`

Returns a stream with a React component. Writing to the stream sends a query to
the query stream. The stream emits an item when it is selected.

Arguments:

- `parent_element`: Element for the React component to render into. If this
  element has any content it will be replaced by the slider.

- `query_stream`: A stream that receives a query (string) and emits the 
  results for the query (array of objects).

## demo

```
npm i
npm run bundle
open www/index.html
```