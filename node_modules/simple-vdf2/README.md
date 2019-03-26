# simple-vdf2

[![Travis-CI Build Status](https://travis-ci.org/l3laze/vdf-parser.svg?branch=master)](https://travis-ci.org/l3laze/vdf-parser?branch=master) [![Codecov branch](https://img.shields.io/codecov/c/github/l3laze/vdf-parser.svg)](https://codecov.io/gh/l3laze/vdf-parser/list/master/) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/031fda68bad64e7aa16fbbcf6b4718b5)](https://www.codacy.com/app/l3laze/vdf-parser)

[![Dev Dependencies](https://img.shields.io/david/dev/expressjs/express.svg)](https://github.com/l3laze/vdf-parser/tree/master) [![Peer Dependencies](https://img.shields.io/david/peer/webcomponents/generator-element.svg)](https://github.com/l3laze/vdf-parser/tree/master)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

----

> A Simple library for Text-based VDF (Valve Data Format) (de)serialization.

Based on Rossen Georgiev's [simple-vdf](https://www.npmjs.com/package/simple-vdf).

## methods

### parse(string)
Parse a string containing VDF and returns an object

### stringify(obj) / dump(obj)
Serializes an object to a string of VDF
