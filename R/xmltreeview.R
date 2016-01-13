#' XML tree viewer
#'
#' This uses \code{xml-viewer} to provide a simple collapsible
#' tree viewer for HTML/XML documents, nodes, node sets and plain character
#' HTML/XML in an \code{htmlwidget} pane.
#'
#' @example inst/examples/examples-xml_tree_view.R
#'
#' @import htmlwidgets
#'
#' @export
#' @references \href{https://github.com/juliangruber/xml-viewer}{xml-viewer}

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

#' Shiny bindings for xmltreeview
#'
#' Output and render functions for using xmltreeview within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \\code{'100\%'},
#'   \\code{'400px'}, \\code{'auto'}) or a number, which will be coerced to a
#'   string and have \\code{'px'} appended.
#' @param expr An expression that generates a xmltreeview
#' @param env The environment in which to evaluate \\code{expr}.
#' @param quoted Is \\code{expr} a quoted expression (with \\code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name xmltreeview-shiny
#'
#' @export
xmltreeviewOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'xmltreeview', width, height, package = 'xmlview')
}

#' @rdname xmltreeview-shiny
#' @export
renderXmltreeview <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, xmltreeviewOutput, env, quoted = TRUE)
}