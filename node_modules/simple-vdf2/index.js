// a simple parser for Valve's KeyValue format
// https://developer.valvesoftware.com/wiki/KeyValues
//
// author: Rossen Popov, 2014-2016
// contributor: Tom Shaver, 2017

function parse (text) {
  if (typeof text !== 'string') {
    throw new TypeError('VDF.parse: Expecting parameter to be a string')
  }

  var lines = text.split('\n')

  var obj = {}
  var stack = [obj]
  var expectBracket = false
  var line = ''
  var m = ''

  var reKV = new RegExp(
    '^("((?:\\\\.|[^\\\\"])+)"|([a-z0-9\\-\\_]+))' +
    '([ \t]*(' +
    '"((?:\\\\.|[^\\\\"])*)(")?' +
    '|([a-z0-9\\-\\_]+)' +
    '))?'
  )

  var i = 0
  var j = lines.length

  for (; i < j; i++) {
    line = lines[i].trim()

    // skip empty and comment lines
    if (line === '' || line[0] === '/') {
      continue
    }

    // one level deeper
    if (line[0] === '{') {
      expectBracket = false
      continue
    }

    if (expectBracket) {
      throw new SyntaxError('VDF.parse: expected bracket on line ' + (i + 1))
    }

    // one level back
    if (line[ 0 ] === '}') {
      stack.pop()
      continue
    }

    let done = false

    // parse keyvalue pairs
    while (!done) {
      m = reKV.exec(line)

      if (m === null) {
        throw new SyntaxError('VDF.parse: invalid syntax on line ' + (i + 1))
      }

      // qkey = 2
      // key = 3
      // qval = 6
      // vq_end = 7
      // val = 8
      var key = (typeof m[ 2 ] !== 'undefined') ? m[ 2 ] : m[ 3 ]
      var val = (typeof m[ 6 ] !== 'undefined') ? m[ 6 ] : m[ 8 ]

      if (typeof val === 'undefined') {
        // chain (merge) duplicate key
        if (!stack[stack.length - 1][ key ]) {
          stack[stack.length - 1][ key ] = {}
        }

        stack.push(stack[stack.length - 1][ key ])
        expectBracket = true
      } else {
        if (!m[ 7 ] && !m[ 8 ]) {
          line += '\n' + lines[ ++i ]
          continue
        }

        stack[stack.length - 1][ key ] = val
      }

      done = true
    }
  }

  if (stack.length !== 1) {
    throw new SyntaxError('VDF.parse: open parentheses somewhere')
  }

  return obj
}

function _dump (obj, pretty, level) {
  if (typeof obj !== 'object') {
    throw new TypeError('VDF.stringify: a key has value of type other than string or object')
  }

  var indent = '\t'
  var buf = ''
  var lineIndent = ''

  if (pretty) {
    for (var i = 0; i < level; i++) {
      lineIndent += indent
    }
  }

  for (let key in obj) {
    if (typeof obj[ key ] === 'object') {
      buf += [lineIndent, '"', key, '"\n', lineIndent, '{\n', _dump(obj[key], pretty, level + 1), lineIndent, '}\n'].join('')
    } else {
      buf += [lineIndent, '"', key, '"', indent, indent, '"', String(obj[ key ]), '"\n'].join('')
    }
  }

  return buf
}

function stringify (obj, pretty) {
  if (typeof obj !== 'object') {
    throw new TypeError('VDF.stringify: First input parameter is not an object')
  }

  pretty = (typeof pretty === 'boolean' && pretty)

  return _dump(obj, pretty, 0)
}

exports.parse = parse
exports.dump = stringify
exports.stringify = stringify
