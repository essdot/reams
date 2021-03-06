# reams

React + front-end streams.

This project seeks to combine React with Node streams for creating web UIs. Streams are a nice abstraction for building UIs -- input, output, and something happening in between. You worry about what happens when data comes in, and when it should go out, and the system worries about what functions should be called when. Streams are easy to combine, to achieve interesting functionality in your app. They all have the same interface.

This is an opinionated project, which seeks to repackage React's API to be more easily-consumed.

This includes HTML templates: the best way to describe HTML is in HTML, not JSX. This implies templates separate from code. The React team has pulicly stated their belief that the markup and code for a component should live together, and I think that's a fine idea. Unfortunately, the syntax devised for this, JSX, is too clunky. Simple things like iterating over an array turn your `render` function into a mish-mash of code and faux-markup. The issue isn't the colocation of "markup" and code - the issue is that JSX is inexpressive and inelegant. HTML is much easier to read at a glance.

In this project, HTML templates are used with React by including the [`react-templatify`](https://github.com/gja/react-templatify) transform. This transform uses the [`react-templates`](https://github.com/wix/react-templates) project to compile the HTML into a React render function, which you can require and pass like any other function. You can put `{}` expressions in the template just like JSX, and `ref="refName"` will add an element to the component's `refs` object like you would expect. ([Read more about `refs` here.](http://facebook.github.io/react/docs/more-about-refs.html))

This also includes reorienting the API to make creating a single component simpler - just call one function. And the arguments are simple - pass in an element plus a template, get a rendered component back. You can pass initial state if you need it, and pass whatever else directly to React if you need that.

Also, npm and Browserify work well as build tools for JavaScript. So let's use them!


## React create functions

### react-component

```javascript
react_component(parent_el, template, _initial, _props, _extra) -> ReactComponent
```

Returns a React component object. Simply repackages React's `render`/`createElement`/`createClass` dance: Typically you create a class with `React.createClass`, then pass the class to `React.createElement`, then pass the ReactElement to `React.render` with a DOM element to finally get a React component. This API simplifies that process - call one function and get a component back. But you can still pass whatever options you want directly to React.

#### Arguments:

- `parent_el`: Element for the React component to render into. If this
  element has any content it will be replaced by the template. This element is
  passed to `React.render`.

- `template`: A compiled template, or any React render function

- `_initial`: Initial state object, optional

- `_props`: Any default props, optional

- `_extra`: Any additional options to pass to `React.createClass`

#### Properties:

- `parent_el`: The parent element passed to the create function

#### Methods:

- `unrender()`: Calls `React.unmountComponentAtNode(parent_el)`.


[React Component API doc](http://facebook.github.io/react/docs/component-api.html)

----

### react-stream

```javascript
react_stream(parent_el, template, _initial, _props, _extra) -> Stream
```

A `through` stream that wraps a React component. Writing to the stream calls `setState` on the React component, and re-renders the component. When the stream ends, it unrenders the component.

#### Arguments:

- `parent_el`: Element for the React component to render into. If this element has any content it will be replaced by the template. This element is passed to `React.render`.

- `template`: A compiled template, or any React render function

- `_initial`: Initial state object, optional

- `_props`: Any default props, optional

- `_extra`: Any additional options to pass to `React.createClass`

#### Properties:

- `component`: The ReactComponent.

#### Events: 

The stream emits events for the following React lifecycle events on the component:

- Event: `componentWillUnmount` Argument: `component`

- Event: `componentWillReceiveProps` Arguments: `component, next_props`

- Event: `componentWillUpdate` Arguments: `component, next_props, next_state`

- Event: `componentDidUpdate` Arguments: `component, prev_props, prev_state`


You can use `stream.on` to listen for these events, or you can pass your own event listeners directly to React, with the `_react_options` argument. The events are emitted inside "lifecycle methods" passed to React, so for any lifecycle methods you pass directly to React, the stream will not emit events. 

(e.g., if you pass a `componentDidUpdate` method to React, the stream will not emit `componentDidUpdate` events. Read more about the lifecycle methods [here](http://facebook.github.io/react/docs/component-specs.html#lifecycle-methods).)

## Examples included in this repo

### react-slider

An `<input type="range">` for selecting number values.

`react_slider(parent_el, _initial, _min, _max) -> Stream`

Returns a stream that wraps a React component. Writing a number to the stream sets the value of the slider, and the stream emits every time the value changes.

Arguments:

- `parent_el`: element - Element for the React component to render into. If this element has any content it will be replaced by the slider.
- `_initial`: number - Optional initial value for the slider. Defaults to 0.
- `_min`: number - Optional min for the slider. Defaults to 0.
- `_max`: number - Optional max for the slider. Defaults to 100.

Stream properties:

- `component`: React component

----

### autocomplete

A widget with a text search box (`<input type="search">`) and results listed below.

`autocomplete(parent_el, query_stream) -> Stream`

Returns a stream that wraps a React component. Writing to the stream sends a query to the query stream. The stream emits an item when it is selected.

Arguments:

- `parent_el`: element - Element for the React component to render into. If this element has any content it will be replaced by the slider.

- `query_stream`: stream - A readable/writable stream that receives a query (a string) and emits the results for the query (array of objects).

----

### swipe-compare

A widget that lets you compare/diff two images by swiping horizontally. The images are layered on top of one another.

`swipe_compare(parent_el, image_1, image_2) -> Stream`

Returns a stream wrapping a React component. Writing to the stream with a number between 0 and 1 sets the left/right percentage. 0 means all right/bottom image, 1 means all left/top image. The stream will emit when the percentage changes.

Arguments:

- `parent_el`: element - Element for the widget to render into. If this element has any content it will be replaced by the swiper.

- `image_1`: string - The URL for the left (or top) image. Can be a data URI.

- `image_2`: string - The URL for the right (or bottom) image. Can be a data URI.

----

### onion-skin compare

A widget that lets you compare/diff two images via opacity. The images are layered on top of one another, and a slider controls the opacity of the top image.

`onion_skin_compare(parent_el, image_1, image_2) -> Stream`

Returns a stream wrapping a React component. Writing to the stream with a number between 0 and 1 sets the top/bottom percentage. 0 means all bottom image, 1 means all top image. The stream also emits when the percentage changes.

Arguments:

- `parent_el`: element - Element for the widget to render into. If this element has any content it will be replaced by the swiper.

- `image_1`: string - The URL for the top image. Can be a data URI.

- `image_2`: string - The URL for the bottom image. Can be a data URI.

## demo

```
npm i
npm run bundle
open www/index.html
```
