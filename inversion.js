caterwaul.module( 'inversion' , function ($) { (function () {var statics = (function () {var path_component = /\.[^\[.]+|\[\d+\]/g , parse_path_component =function (s) { ; return(function (it) {return it ? +it[1]: s.substr(1)}) .call(this, ( /^\[(\d+)\]$/ .exec(s)))} , parse_path =function (s) { ; return s === '' ? [ ]: (function () {try {return(function (xs1) {var x1, x01, xi1, xl1, xr1;for (var xr1 = new xs1.constructor() , xi1 = 0, xl1 = xs1.length; xi1 < xl1; ++xi1) x1 = xs1[xi1] , xr1.push( (parse_path_component(x1))) ; return xr1}) .call(this, s.match(path_component))} catch (e) {return(function () {throw new Error( ( 'invalid path syntax: ' + (s) + ''))}) .call(this)}}) .call(this)} , make_path =function (x) { ; return x.constructor === String ? parse_path(x): x} , patch =function (object, path, v) { ; return path.length === 0 ? v: path[0] .constructor === String ? (function () {var k = path[0] ; return(function (o) {for (var r = {} , i = 0, l = o.length, x; i < l; ++i) x = o[i] , r[x[0]] = x[1] ; return r}) .call(this, ( ( (function (o) {var ps = [] ; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && ps.push( [k, o[k]]) ; return ps}) .call(this, ( ( (object) || ( {}))))) .concat( ( [ [k, patch(object && object[k] , path.slice(1) , v)]]))))}) .call(this): object && path[0] < object.length ? (function () {var i = path[0] ; return(function (xs) {var x, x0, xi, xl, xr;for (var xr = new xs.constructor() , xi = 0, xl = xs.length; xi < xl; ++xi) x = xs[xi] , xr.push( (xi === i ? patch(x, path.slice(1) , v): x)) ; return xr}) .call(this, object)}) .call(this): (Array.prototype.slice.call( ( ( (object) || ( []))))) .concat( ( [patch(null, path.slice(1) , v)]))} , resolve =function (object, path) { ; return path.length === 0 ? object: resolve( (object || {}) [path[0]] , path.slice(1))} , as_object =function (object) { ; return object.constructor === $.inversion ? object.uninvert(): object} , piece_matches =function (p, x) { ; return p === String || p === Number ? x.constructor === p: p.constructor === Function ? p(x): p.constructor === RegExp ? p.exec(x): p.constructor === String || p.constructor === Number ? p === x: (function () {throw new Error( ( 'unknown selector type: ' + (p) + ''))}) .call(this)} , invert =function (object, path) { ; return(function () {var p = make_path(path) ; return new $.inversion(object, p, resolve(as_object(object) , p))}) .call(this)} ; return{path_component:path_component, parse_path_component: parse_path_component, parse_path: parse_path, make_path: make_path, patch: patch, resolve: resolve, as_object: as_object, piece_matches: piece_matches, invert: invert}}) .call(this) , methods = {context:function () { ; return this.base instanceof $.inversion ? this.base.uninvert(): this.base} , uninvert:function () { ; return this.uninversion !== void 0 ? this.uninversion: this.uninversion = $.inversion.patch(this.context() , this.path, this.v)} , get:function (path) { ; return statics.resolve(this.v, $.inversion.make_path(path))} , is:function (offset, p) { ; return statics.piece_matches(p, this.path[this.path.length + offset])} , path_string:function () { ; return(function (it) {return it.join( '')}) .call(this, ( (function (xs) {var x, x0, xi, xl, xr;for (var xr = new xs.constructor() , xi = 0, xl = xs.length; xi < xl; ++xi) x = xs[xi] , xr.push( (x.constructor === String ? ( '.' + (x) + ''): ( '[' + (x) + ']'))) ; return xr}) .call(this, this.path)))} , path_at:function (n) { ; return this.path[this.path.length + n]} , reset:function (root) { ; return new $.inversion(root, this.path, this.v)} , rebase:function (root) { ; return root === this.base ? this: this.base instanceof $.inversion ? this.reset(this.base.rebase(root)): this.reset(root)} , edit:function (value, path) { ; return(function () {var newpath = $.inversion.make_path(path || []) , changed = new $.inversion(this.base, ( this.path) .concat( ( newpath)) , value) , result = newpath.length ? changed.at(this.path): changed; return result}) .call(this)} , at:function (path) { ; return $.inversion.invert(this, $.inversion.make_path(path))} , root:function () { ; return $.inversion.invert(this, [])} , up:function (n) {var n = n || 1; return $.inversion.invert(this, this.path.slice(0, n.constructor === Number ? this.path.length - n: this.path.lastIndexOf(n)))} , down:function (path) { ; return $.inversion.invert(this, ( this.path) .concat( ( $.inversion.make_path(path))))}} ; return $.merge( ($.inversion = (function (context, path, v) {return this.base = context, this.path = path, this.v = v, null})) .prototype, methods) ,$.merge( $.inversion, statics)}) .call(this)}) ;