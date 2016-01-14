// shortcuts (kinda of the only reason I use jQuery anyway)
function $id(element) { return(document.getElementById(element)); }
function $tag(tag) { return(document.getElementsByTagName(tag)); }
function $log(thing) { $id('hrbrlog').value += thing + '\n'; $id('hrbrlog').style.display = "inline-block"; }

HTMLWidgets.widget({

  name: 'xmlview',
  type: 'output',

  initialize: function(el, width, height) {
    return {};
  },

  renderValue: function(el, param, instance) {

    glob = param;
    glob.serialize = new XMLSerializer();
    glob.orig = glob.xmlDoc;
    glob.parser = new DOMParser();
    glob.parsedOrig = glob.parser.parseFromString(glob.xmlDoc, "text/xml");

    var link = document.createElement("link");
    link.href  = "lib/highlightjs-9.0.0/styles/" + param.styleSheet + ".css";
    link.type  = "text/css";
    link.rel   = "stylesheet";
    link.media = "screen,print";

    $tag("head")[0].appendChild(link);

    var msg = "<div class='msgdiv' id='msg'></div>";

    var rcode = "<div class='rcodediv' id='rcode'></div>";

    var log = "<div id='logdiv'><textarea style='display:none;font-family:monospace' cols=80 rows=40 id='hrbrlog'></textarea></div>";

    var filter = "";

    if (param.addFilter) {
      filter = "<div class='filterdiv'>" +
               "<span class='xpathspan'>XPath:</span> " +
               "<input title='Enter XPath to test and hit ENTER/RETURN. Errors will indicate a bad XPath, otherwise the document contents will reflect the outcome of the XPath selection.' class='filterinput' type='text' size=69 id='xpath' onchange='filter_xpath();'/> " +
               "<button title='Reset XPath & restore original document' class='resetclass' onclick='reset_form(); return(false);'></button> " +
               "<button alt='Generate R xml2 code' title='Generate R xml2 code' class='rcodeclass' onclick='generate_rcode(); return(false);'></button>" +
               "<br/>";
    }

    el.innerHTML = filter + msg + rcode +
      "<pre><code class='html' id='xmldiv'></code></pre>" + log;

    var xml_div = $id('xmldiv');

    if (glob.applyXPath === null) {

      xml_div.innerText = vkbeautify.xml(param.xmlDoc);
      xml_div.textContent = vkbeautify.xml(param.xmlDoc);

      hljs.initHighlighting() ;
      hljs.highlightBlock($id('xmldiv'));

    } else {
      if (param.addFilter) { $id("xpath").value = glob.applyXPath }
      do_filter(glob.applyXPath);
    }

  },

  resize: function(el, width, height, instance) {},

});

function filter_xpath() {

  document.getElementById('msg').style.display = "none";

  do_filter($id("xpath").value.trim());

}

function do_filter(xpath) {

  if (xpath === "") return(reset_form());

  var out_xml = "" ;

  try {

    var nsResolver = glob.parsedOrig.createNSResolver(glob.parsedOrig);

    var results =
      glob.parsedOrig.evaluate(xpath,
                       glob.parsedOrig,
                       nsResolver,
                       XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
                       null);

    var res = results.iterateNext() ;

    while(res) {
      out_xml = out_xml + glob.serialize.serializeToString(res);
      res = results.iterateNext();
    }

    var xml_div = $id('xmldiv');
    xml_div.innerText = vkbeautify.xml(out_xml);
    xml_div.textContent = vkbeautify.xml(out_xml);

    hljs.highlightBlock($id('xmldiv'));

  } catch(err) {

    glob.err = err;

    $id('rcode').style.display = "none";
    $id('msg').innerText = "Invalid XPath";
    $id('msg').textContent = "Invalid XPath";
    $id('msg').style.display = "inline-block";

  }

}

function reset_form(doc) {

  $id('rcode').style.display = "none";
  $id('msg').style.display = "none";
  $id('xpath').value = "" ;

  var xml_div = $id('xmldiv');
  xml_div.innerText =  vkbeautify.xml(glob.xmlDoc);
  xml_div.textContent =  vkbeautify.xml(glob.xmlDoc);

  hljs.highlightBlock($id('xmldiv'));

}

function generate_rcode() {
  $id('rcode').innerText = "xml2::xml_find_all(doc, '" + $id('xpath').value + "', ns=xml2::xml_ns(doc))";
  $id('rcode').textContent = "xml2::xml_find_all(doc, '" + $id('xpath').value + "', ns=xml2::xml_ns(doc))";
  $id('rcode').style.display = "inline-block";
}
