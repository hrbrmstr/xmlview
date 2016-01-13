HTMLWidgets.widget({

  name: 'xmlview',
  type: 'output',

  initialize: function(el, width, height) { return {}; },

  renderValue: function(el, param, instance) {

    glob = param;
    glob.orig = glob.xmlDoc;
    glob.parser = new DOMParser();
    glob.parsedOrig = glob.parser.parseFromString(glob.xmlDoc, "text/xml");

    var link = document.createElement("link");
    link.href  = "lib/highlightjs-9.0.0/styles/" + param.styleSheet + ".css";
    link.type  = "text/css";
    link.rel   = "stylesheet";
    link.media = "screen,print";

    document.getElementsByTagName("head")[0].appendChild(link);

    var msg = "<div class='msgdiv' id='msg'></div>";

    var rcode = "<div class='rcodediv' id='rcode'></div>";

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
      "<pre><code class='html' id='xmldiv'></code></pre>";

    var xml_div = document.getElementById('xmldiv');
    xml_div.innerText = vkbeautify.xml(param.xmlDoc);

    hljs.initHighlighting() ;
    hljs.highlightBlock(document.getElementById('xmldiv'));

  },

  resize: function(el, width, height, instance) {},

});

function filter_xpath() {

  document.getElementById('msg').style.display = "none";

  var xpath = document.getElementById("xpath").value.trim();

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
      out_xml = out_xml + res.outerHTML;
      res = results.iterateNext();
    }

    var xml_div = document.getElementById('xmldiv');
    xml_div.innerText = vkbeautify.xml(out_xml);

    hljs.highlightBlock(document.getElementById('xmldiv'));

  } catch(err) {

    glob.err = err;

    document.getElementById('rcode').style.display = "none";
    document.getElementById('msg').innerText = "Invalid XPath";
    document.getElementById('msg').style.display = "inline-block";

  }

}

function reset_form(doc) {

  document.getElementById('rcode').style.display = "none";
  document.getElementById('msg').style.display = "none";
  document.getElementById('xpath').value = "" ;

  var xml_div = document.getElementById('xmldiv');
  xml_div.innerText =  vkbeautify.xml(glob.xmlDoc);

  hljs.highlightBlock(document.getElementById('xmldiv'));

}

function generate_rcode() {
  document.getElementById('rcode').innerText =
    "xml2::xml_find_all(doc, '" +
    document.getElementById('xpath').value +
    "', ns=xml2::xml_ns(doc))";
  document.getElementById('rcode').style.display = "inline-block";
}
