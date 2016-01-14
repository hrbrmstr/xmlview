#' XML tree viewer
#'
#' This uses \code{xml-viewer} to provide a simple collapsible
#' tree viewer for HTML/XML documents, nodes, node sets and plain character
#' HTML/XML in an \code{htmlwidget} pane.
#'
#' @param doc \code{xml2} document, node, nodeset or atomic character vector
#'        of HTML/XML content
#' @param width widget \code{div} width
#' @param height widget \code{div} height
#' @param elementId element id
#' @export
#' @references \href{https://github.com/juliangruber/xml-viewer}{xml-viewer}
#' @example inst/examples/examples-xml_tree_view.R
xml_tree_view <- function(
  doc = NULL,
  width = "100%", height = NULL,
  elementId = NULL
) {

  if (inherits(doc, "character")) {
    doc <- paste0(doc, collapse="")
  } else if (inherits(doc, "xml_nodeset")) {
    doc <- paste0(as.character(doc), collapse="")
  } else if (inherits(doc, "xml_document") | inherits(doc, "xml_node")) {
    doc <- as.character(doc)
  }

  params <- list(
    xmlDoc = doc
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'xmltreeview',
    x = params,
    width = width,
    height = height,
    package = 'xmlview',
    elementId = elementId
  )
}
