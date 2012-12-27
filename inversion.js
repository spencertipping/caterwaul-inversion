caterwaul.module( 'inversion' , function ($) { (function () {var statics = (function () {var path_component = /\.[^\[.]+|\[\d+\]/g , parse_path_component =function (s) { ; return(function (it) {return it ? +it[1]: s.substr(1)}) .call(this, ( /^\[(\d+)\]$/ .exec(s)))} , parse_path =function (s) { ; return(function () {try {return(function (xs1) {var x1, x01, xi1, xl1, xr1;for (var xr1 = new xs1.constructor() , xi1 = 0, xl1 = xs1.length; xi1 < xl1; ++xi1) x1 = xs1[xi1] , xr1.push( (parse_path_component(x1))) ; return xr1}) .call(this, s.match(path_component))} catch (e) {return(function () {throw new Error( ( 'invalid path syntax: ' + (s) + ''))}) .call(this)}}) .call(this)} , make_path =function (x) { ; return x.constructor === String ? parse_path(x): x} , patch =function (object, path, v) { ; return path.length === 0 ? v: path[0] .constructor === String ? (function () {var k = path[0] ; return(function (o) {for (var r = {} , i = 0, l = o.length, x; i < l; ++i) x = o[i] , r[x[0]] = x[1] ; return r}) .call(this, ( (function (xs) {var x, x0, xi, xl, xr;for (var xr = new xs.constructor() , xi = 0, xl = xs.length; xi < xl; ++xi) x = xs[xi] , xr.push( (x[0] === k ? [k, patch(x[1] , path.slice(1) , v) ]: x)) ; return xr}) .call(this, (function (o) {var ps = [] ; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && ps.push( [k, o[k]]) ; return ps}) .call(this, ( object)))))}) .call(this): (function () {var i = path[0] ; return(function (xs) {var x, x0, xi, xl, xr;for (var xr = new xs.constructor() , xi = 0, xl = xs.length; xi < xl; ++xi) x = xs[xi] , xr.push( (xi === i ? patch(x, path.slice(1) , v): x)) ; return xr}) .call(this, object)}) .call(this)} , resolve =function (object, path) { ; return path.length === 0 ? object: resolve(object[path[0]] , path.slice(1))} , as_object =function (object) { ; return object.constructor === $.inversion ? object.uninvert(): object} , invert =function (object, path) { ; return(function () {var p = make_path(path) ; return new $.inversion(object, p, resolve(as_object(object) , p))}) .call(this)} ; return{path_component:path_component, parse_path_component: parse_path_component, parse_path: parse_path, make_path: make_path, patch: patch, resolve: resolve, as_object: as_object, invert: invert}}) .call(this) , methods = {context:function (root) { ; return this.base instanceof $.inversion ? this.base.uninvert(root): root || this.base} , uninvert:function (root) { ; return $.inversion.patch(this.context(root) , this.path, this.v)} , rebase:function (root) { ; return new $.inversion(root, this.path, this.v)} , edit:function (value) { ; return new $.inversion(this.base, this.path, value)} , up:function (n) { ; return $.inversion.invert(this, this.path.slice(0, this.path.length - (n || 1)))} , down:function (path) { ; return $.inversion.invert(this, ( this.path) .concat( ( $.inversion.make_path(path))))}} ; return $.merge( ($.inversion = (function (context, path, v) {return this.base = context, this.path = path, this.v = v, null})) .prototype, methods) ,$.merge( $.inversion, statics)}) .call(this)}) ;