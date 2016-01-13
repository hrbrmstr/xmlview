
`xmlview` : View formatted and "pretty printed" HTML/XML in R

It is intended for interactive use. When working with XML data, it's often times
advantageous to be able to see the document and possibly even more advantageous to
see the results of XPath or CSS selector slicing & dicing. 

You can pass in:

- plain character HTML/XML
- an `xml2` `xml_document`
- an `xml2` `xml_nodeset`
- an `xml2` `xml_node`

and view the formatted & pretty-printed result in the RStudio viewer or web browser.

The widget uses  [vkbeautify](http://www.eslinstructor.net/vkbeautify/), [highlight.js](https://highlightjs.org) and [xml-viewer](https://github.com/juliangruber/xml-viewer) to do all the work.

The following functions are implemented:

- `xml_view`: view HTML/XML nodes
- `xml_tree_view`: view HTML/XML nodes

<hr/>

Please `devtools::install_github("ramnathv/htmlwidgets")` for this as we're now using the more modern (and bleeding edge `htmlwidgets` functionality).

<hr/>

### News

- Version 0.3.0 : @timelyportfolio added `xml_tree_view()` 
- Version 0.2.2 : added "generate R code" button
- Version 0.2.1 : support for namespaces
- Version 0.2.0 : added `add_filter` option to `xml_view()` for live XPath filtering (so you can see the results immediately and then just copy/paste the XPath string back into R)
- Version 0.1.0 released

### Installation


```r
devtools::install_github("hrbrmstr/xmlview")
```



### Usage


```r
library(xmlview)
library(xml2)

# available styles
highlight_styles()

# plain character
txt <- "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"

xml_view(txt)

# xml document
doc <- read_xml(txt)

xml_view(doc, style="obsidian")
xml_view(xml_find_all(doc, ".//to"), style="github-gist")

xml_view(read_xml(system.file("extdata/dwml.xml", package="xmlview")))
xml_view(read_xml(system.file("extdata/getHistory.xml", package="xmlview")), "androidstudio")
xml_view(read_xml(system.file("extdata/input.xml", package="xmlview")), "sunburst")

# SO: http://stackoverflow.com/questions/34664028/extract-xml-data-using-xmlsapply-in-r
doc <- read_xml("http://d396qusza40orc.cloudfront.net/getdata%2Fdata%2Frestaurants.xml")
xml_view(xml_find_all(doc, ".//*[contains(@_id, '7')]"), style="monokai_sublime")
```

### Screen shot (plain viewer)

![](example.png)

### Screen recording of filtering

Here is the R code (it's a bit hard to read):


```r
library(xml2)

doc <- read_xml("http://www.npr.org/rss/rss.php?id=1001")

str(doc)

xml_view(doc, add_filter=TRUE)

# The first copied code:
xml2::xml_find_all(doc, './/dc:creator', ns=xml2::xml_ns(doc))

# The second copied code:
xml_text(xml2::xml_find_all(doc, './/link[contains(., "soccer")]', ns=xml2::xml_ns(doc)))
```

![](xmlview.gif)
