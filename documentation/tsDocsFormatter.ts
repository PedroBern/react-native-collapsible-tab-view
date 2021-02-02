const { DocExcerpt } = require('@microsoft/tsdoc')

/**
 * This is a simplistic solution until we implement proper DocNode rendering APIs.
 */
class Formatter {
  public static renderDocNode(docNode: any): string {
    let result: string = ''
    if (docNode) {
      if (docNode instanceof DocExcerpt) {
        result += docNode.content.toString()
      }
      for (const childNode of docNode.getChildNodes()) {
        result += Formatter.renderDocNode(childNode)
      }
    }
    return result
  }

  public static renderDocNodes(docNodes: readonly any[]): string {
    let result: string = ''
    for (const docNode of docNodes) {
      result += Formatter.renderDocNode(docNode)
    }
    return result
  }
}

module.exports = Formatter

export {}


