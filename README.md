This plugin allows webpack to correctly parse and handle the dependencies
of a piece of code in the following format, which would usually fail due
to require being redefined in the factory function parameters.


```javascript
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		/* AMD. Register as an anonymous module. */
		define(['require', 'exports'], factory);
	} else if (typeof exports === 'object') {
		/* CommonJS */
		factory(require, exports);
	} else {
		/* Browser globals - dangerous */
		factory(function(moduleName) { return root[moduleName]; }, root);
	}
}(this, function (require, exports) {
	var _ = require("lodash");
}))
```
