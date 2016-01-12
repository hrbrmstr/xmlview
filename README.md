
`xmlview` : View formatted and "pretty printed" HTML/XML in R 

The following functions are implemented:

- `xml_view`: view HTML/XML nodes

### News

- Version 0.1.0 released

### Installation


```r
devtools::install_github("hrbrmstr/xmlview")
```



### Usage


```r
library(xmlview)
library(xml2)

# current verison
packageVersion("xmlview")
```

```
## [1] '0.1.0'
```

```r
# available styles
highlight_styles()
```

```
##  [1] "agate"                     "androidstudio"             "arta"                      "ascetic"                  
##  [5] "atelier-cave-dark"         "atelier-cave-light"        "atelier-cave.dark"         "atelier-cave.light"       
##  [9] "atelier-dune-dark"         "atelier-dune-light"        "atelier-dune.dark"         "atelier-dune.light"       
## [13] "atelier-estuary-dark"      "atelier-estuary-light"     "atelier-estuary.dark"      "atelier-estuary.light"    
## [17] "atelier-forest-dark"       "atelier-forest-light"      "atelier-forest.dark"       "atelier-forest.light"     
## [21] "atelier-heath-dark"        "atelier-heath-light"       "atelier-heath.dark"        "atelier-heath.light"      
## [25] "atelier-lakeside-dark"     "atelier-lakeside-light"    "atelier-lakeside.dark"     "atelier-lakeside.light"   
## [29] "atelier-plateau-dark"      "atelier-plateau-light"     "atelier-plateau.dark"      "atelier-plateau.light"    
## [33] "atelier-savanna-dark"      "atelier-savanna-light"     "atelier-savanna.dark"      "atelier-savanna.light"    
## [37] "atelier-seaside-dark"      "atelier-seaside-light"     "atelier-seaside.dark"      "atelier-seaside.light"    
## [41] "atelier-sulphurpool-dark"  "atelier-sulphurpool-light" "atelier-sulphurpool.dark"  "atelier-sulphurpool.light"
## [45] "brown_paper"               "brown-paper"               "codepen-embed"             "color-brewer"             
## [49] "dark"                      "darkula"                   "default"                   "docco"                    
## [53] "far"                       "foundation"                "github-gist"               "github"                   
## [57] "googlecode"                "grayscale"                 "hopscotch"                 "hybrid"                   
## [61] "idea"                      "ir_black"                  "ir-black"                  "kimbie.dark"              
## [65] "kimbie.light"              "magula"                    "mono-blue"                 "monokai_sublime"          
## [69] "monokai-sublime"           "monokai"                   "obsidian"                  "paraiso-dark"             
## [73] "paraiso-light"             "paraiso.dark"              "paraiso.light"             "pojoaque"                 
## [77] "railscasts"                "rainbow"                   "school_book"               "school-book"              
## [81] "solarized_dark"            "solarized_light"           "solarized-dark"            "solarized-light"          
## [85] "sunburst"                  "tomorrow-night-blue"       "tomorrow-night-bright"     "tomorrow-night-eighties"  
## [89] "tomorrow-night"            "tomorrow"                  "vs"                        "xcode"                    
## [93] "zenburn"
```

```r
# plain character
txt <- "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>"

xml_view(txt)
```

<!--html_preserve--><div id="htmlwidget-2265" style="width:672px;height:480px;" class="xmlview"></div>
<script type="application/json" data-for="htmlwidget-2265">{"x":{"xmlDoc":"<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>","styleSheet":"default"},"evals":[]}</script><!--/html_preserve-->

```r
# xml document
doc <- read_xml(txt)

xml_view(doc, style="obsidian")
```

<!--html_preserve--><div id="htmlwidget-7144" style="width:672px;height:480px;" class="xmlview"></div>
<script type="application/json" data-for="htmlwidget-7144">{"x":{"xmlDoc":"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>\n","styleSheet":"obsidian"},"evals":[]}</script><!--/html_preserve-->

```r
xml_view(xml_find_all(doc, ".//to"), style="github-gist")
```

<!--html_preserve--><div id="htmlwidget-5827" style="width:672px;height:480px;" class="xmlview"></div>
<script type="application/json" data-for="htmlwidget-5827">{"x":{"xmlDoc":"<to>Tove</to>","styleSheet":"github-gist"},"evals":[]}</script><!--/html_preserve-->
