#' XML pretty printer & viewer
#'
#' This uses \code{vkbeautify} and \code{highlight.js} to format and
#' "pretty print" HTML/XML documents, nodes, node sets and plain character
#' HTML/XML in an \code{htmlwidget} pane.
#'
#' @param doc \code{xml2} document, node, nodeset or atomic character vector
#'        of HTML/XML content
#' @param style CSS stylesheet to use (see \code{higlight_styles()})
#' @export
#' @references \href{https://highlightjs.org/}{highlight.js},
#'             \href{http://www.eslinstructor.net/vkbeautify/}{vkbeautify}
#' @examples
#' library(xml2)
#' txt <- paste0("<note><to>Tove</to><from>Jani</from><heading>Reminder</heading>",
#'               "<body>Don't forget me this weekend!</body></note>")
#' xml_view(txt)
#' doc <- read_xml(txt)
#' xml_view(doc, style="obsidian")
#' xml_view(xml_find_all(doc, ".//to"), style="github-gist")
#' xml_view(read_xml(system.file("extdata/dwml.xml", package="xmlview")))
#' xml_view(read_xml(system.file("extdata/getHistory.xml", package="xmlview")),
#'          "androidstudio")
#' xml_view(read_xml(system.file("extdata/input.xml", package="xmlview")),
#'          "sunburst")
xml_view <- function(doc, style="default") {

  width <- "100%"
  height <- 300

  style <- trimws(tolower(style))

  if (!style %in% highlight_styles()) {
    style <- "default"
    warning(sprintf("Style '%s' not found, using 'default'", style))
  }

  if (inherits(doc, "character")) {
    doc <- paste0(doc, collapse="")
  } else if (inherits(doc, "xml_nodeset")) {
    doc <- paste0(as.character(doc), collapse="")
  } else if (inherits(doc, "xml_document") | inherits(doc, "xml_node")) {
    doc <- as.character(doc)
  }

  params <- list(
    xmlDoc = doc,
    styleSheet = style
  )

  htmlwidgets::createWidget(
    name = 'xmlview',
    params,
    width = width,
    height = height,
    package = 'xmlview'
  )

}


#' List available styles
#'
#' Returns a character vector of available style sheets to use when displaying
#' an XML document.
#'
#' @references See \url{https://highlightjs.org/static/demo/} for a demo of all
#'             highlight.js styles
#' @export
#' @examples
#' highlight_styles()
highlight_styles <- function() {
  gsub("\\.css$", "",
       grep("\\.css$",
            list.files(system.file("htmlwidgets/lib/highlightjs/styles", package="xmlview")),
            value=TRUE))
}
