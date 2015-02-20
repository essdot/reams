# reams

React + front-end streams.

This project seeks to combine React with Node streams for creating web UIs. Streams are a nice abstraction for building web UIs -- input, output, and something happening in between. Streams are easy to combine, to achieve interesting functionality in your app. They all have the same interface.

This is an opinionated project, which seeks to repackage React's API to be more easily-consumed.

This includes HTML templates: JSX is alright, but really the best way to describe HTML is in HTML. HTML templates are used with React simply by including the `react-templatify` transform. The templates are compiled into a render function you can require and pass like any other.

This also includes reorienting the API around creating a single component. Just call a function, and arguments are simple - element and template; initial state if you need it; and pass whatever else directly to React if you need that.

Having `props` and `state` is weird -- `state` should almost always be enough. For the consumer of the API, `initial_state` should simply be an object, not a function that returns an object. (What's the point of that?)

Also, npm and Browserify work well as build tools for JavaScript.


## React create functions

### react-component

```javascript
react_component(parent_el, template, _initial, _react_options) -> ReactComponent
```

Returns a React component object. Simply repackages React's `render/createElement/CreateClass` dance: Typically you create a `ReactClass`, then immediately call `React.createElement` with the class, then call `React.render` with an element. This just simplifies that, but lets you pass whatever you want on to React.

Arguments:

- `parent_el`: Element for the React component to render into. If this
  element has any content it will be replaced by the template. This element is
  passed to `React.render`.

- `template`: A compiled template, or any React render function

- `_initial`: Initial state object, optional

- `_react_options`: Any additional options to pass to `React.createClass`

Properties:

- `parent_el`: The parent element above

Methods:

- `unrender()`: Calls `React.unmountComponentAtNode(parent_el)`.


[React Component API doc](http://facebook.github.io/react/docs/component-api.html)

### react-stream

```javascript
react_stream(parent_el, template, _initial, _react_options) -> Stream
```

A `through` stream that wraps a React component. Writing to the stream calls `setState` on the React component, and re-renders the component. When the stream ends, it unrenders the component.

Arguments:

- `parent_el`: Element for the React component to render into. If this element has any content it will be replaced by the template. This element is passed to `React.render`.

- `template`: A compiled template, or any React render function

- `_initial`: Initial state object, optional

- `_react_options`: Any additional options to pass to `React.createClass`

Properties:

- `component`: The ReactComponent.

Events: 

The stream emits for the following lifecycle events on the component: 

`componentDidMount(component)`

`componentWillMount(component)`

`componentWillUnmount(component)`

`componentWillReceiveProps(component, next_props)`

`componentWillUpdate(component, next_props, next_state)`

`componentDidUpdate(component, prev_props, prev_state)`


You can use `stream.on` to listen for these events, or you can pass your own event listeners directly to React, with the `_react_options` argument. 



## Examples

### react-slider

An `<input type="range">` for selecting number values.

`react_slider(parent_el, _initial) -> Stream`

Returns a stream with a React component. Writing a number to the stream sets the value of the slider, and the stream emits every time the value changes.

Arguments:
- `parent_el`: Element for the React component to render into. If this element has any content it will be replaced by the slider.
- `_initial`: Initial value for the slider (number). Optional, defaults to 0

Stream properties:
- `component`: React component

### autocomplete
A widget with a text search box (`<input type="search">`) and results listed below.

`autocomplete(parent_el, query_stream) -> Stream`

Returns a stream with a React component. Writing to the stream sends a query to the query stream. The stream emits an item when it is selected.

Arguments:

- `parent_el`: Element for the React component to render into. If this element has any content it will be replaced by the slider.

- `query_stream`: A stream that receives a query (a string) and emits the results for the query (array of objects).

## demo

```
npm i
npm run bundle
open www/index.html
```