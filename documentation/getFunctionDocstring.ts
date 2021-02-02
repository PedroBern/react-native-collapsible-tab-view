const { TSDocParser } = require('@microsoft/tsdoc')
const fs = require('fs')

const Formatter = require('./tsDocsFormatter')

function getFunctionDocstring(
  inputFile: string,
  functionName: string,
  raw: boolean = false
): void {
  const inputBuffer: string = fs.readFileSync(inputFile).toString()

  // need to skip empty lines between docstring and function name
  // the regex is wrong
  const regex = new RegExp(
    '\\/\\*\\*\n.*(const|function) ' + functionName,
    'gms'
  )
  let docstring = inputBuffer.match(regex)
  if (!docstring) {
    console.log(docstring)
    const errorMessage = 'Function not found for ' + functionName
    console.log(errorMessage)
    throw new Error('Function not found for ')
  }
  docstring = docstring[0].split('\n')
  docstring.pop()
  // @ts-ignore
  docstring = docstring.join('\n')

  // @ts-ignore
  if (raw) return docstring

  // NOTE: Optionally, can provide a TSDocConfiguration here
  const tsdocParser = new TSDocParser()
  const parserContext = tsdocParser.parseString(docstring)

  const docComment = parserContext.docComment

  return Formatter.renderDocNode(docComment.summarySection)
}

module.exports = getFunctionDocstring

export {}
