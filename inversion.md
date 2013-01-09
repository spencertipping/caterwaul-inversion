Caterwaul inversion | Spencer Tipping
Licensed under the terms of the MIT source code license

# Introduction

Inversions are a way to non-destructively introduce edits into structures of objects and arrays. The basic transformation looks like this:

    root                        = {foo: {bar: [1, 2, 3]}}
    invert(root, '.foo.bar[1]') = {context: {foo: {bar: [1, 2, 3]}}, path: ['foo', 'bar', 1], value: 2}

You can then change the value and 'un-invert' the result to zip up a new root:

    uninvert({context: {foo: {bar: [1, 2, 3]}}, path: ['foo', 'bar', 1], value: 5}) = {foo: {bar: [1, 5, 3]}}

Inversions are instances of a particular class so that they can be differentiated from other objects. This allows you to use inversions as contexts, which is important for chaining. Note, however, that
this means you can't use an inversion to modify an inversion. Not that you would.

    caterwaul.module('inversion', ':all', function ($) {
      ($.inversion = given[context, path, v][this.base = context, this.path = path, this.v = v, null]).prototype /-$.merge/ methods,
      $.inversion /-$.merge/ statics,

# Path expressions

Paths can be specified either as strings or as arrays. In string form, a path is a concatenation of navigation actions, each of which is either of the form '.name' or '[index]'. The '.name' form looks up
a property with the given name, and the [index] form indexes into an array. Which one you use matters: modifying something down an [index] path will cause an array to be created, whereas the .name path
will create an object.

Note that you can't use large integer path components to create sparse arrays.

      where [statics = wcapture[path_component          = /\.[^\[.]+|\[\d+\]/g,
                                parse_path_component(s) = /^\[(\d+)\]$/.exec(s) -re [it ? +it[1] : s.substr(1)],
                                parse_path(s)           = s === '' ? [] : s.match(path_component) *parse_path_component -seq -rescue- raise[new Error('invalid path syntax: #{s}')],
                                make_path(x)            = x.constructor === String ? parse_path(x) : x,

                                patch(object, path, v)  = path.length === 0              ? v
                                                        : path[0].constructor === String ? object /pairs + [[k, patch(object[k], path.slice(1), v)]] -object -seq -where [k = path[0]]
                                                        : path[0] >= object.length       ? object + [patch(null, path.slice(1), v)] -seq
                                                        :                                  object *[xi === i ? patch(x, path.slice(1), v) : x] -seq -where [i = path[0]],

                                resolve(object, path)   = path.length === 0 ? object : resolve(object[path[0]], path.slice(1)),
                                as_object(object)       = object.constructor === $.inversion ? object.uninvert() : object,

                                invert(object, path)    = new $.inversion(object, p, resolve(object /!as_object, p)) -where [p = make_path(path)]],

# Zipping and rebasing

Every inversion contains a 'root' or 'base' that keeps its context valid, but you can change this dynamically. The only requirement is that the new base support the current path (i.e. not map any prefix
path onto null or undefined). If the inversion is based on another inversion, the context will be zipped against the new root if you specify one.

             methods = capture [context(root)  = this.base instanceof $.inversion ? this.base.uninvert(root) : root || this.base,
                                uninvert(root) = $.inversion.patch(this.context(root), this.path, this.v),

                                rebase(root)   = new $.inversion(root, this.path, this.v),
                                edit(value)    = new $.inversion(this.base, this.path, value),

# Relative inversions

You can create a linked list of edits that you can later zip onto a new base. To do this, use the relative up() and down() methods. These create new inversions linked to the receiver (and therefore
modifying the same root), but with different paths. The 'root()' method navigates all the way up to the root and the 'at()' method resets the path.

                                at(path)          = $.inversion.invert(this, $.inversion.make_path(path)),
                                root()            = $.inversion.invert(this, []),
                                up(n, n = n || 1) = $.inversion.invert(this, this.path.slice(0, n.constructor === Number ? this.path.length - n
                                                                                                                         : this.path.lastIndexOf(n))),
                                down(path)        = $.inversion.invert(this, this.path + $.inversion.make_path(path) -seq)]]});