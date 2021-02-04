const { TSDocParser } = require('@microsoft/tsdoc')
const fs = require('fs')

const Formatter = require('./tsDocsFormatter')

/**
 * 
 * Returns the docstring of a specific function.
 * 
 * @param inputFile 
 * @param functionName 
 * @param raw 
 */
function getFunctionDocstring(
  inputFile: string,
  functionName: string,
  raw: boolean = false
): void {
  const inputBuffer: string = fs.readFileSync(inputFile).toString()

  const regex = new RegExp(
    '\n(\\/\\*\\*\n.*)(const|function) ' + functionName,
    'gms'
  )
  const matches = inputBuffer.match(regex)
  if (!matches) {
    console.log(matches)
    const errorMessage = 'Function not found for ' + functionName
    console.log(errorMessage)
    throw new Error('Function not found for ')
  }

  const docstring = matches[0]

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
