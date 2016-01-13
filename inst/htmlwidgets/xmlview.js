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

    var msg = "<style>button:active { color: #fff; text-shadow: 0 -1px 0 #444, 0 0 5px #ffd, 0 0 8px #fff; box-shadow: 0 1px 0 #666, 0 2px 0 #444, 0 2px 2px rgba(0,0,0,0.9); -webkit-transform: translateY(3px); transform: translateY(3px); -webkit-animation: none; animation: none; }</style><div style='max-width:100%; width:100%; font-family:monospace; display:none; border: 1px solid; margin:0; margin-top:5px; padding:5px; color: #9f6000; background-color: #feefb3;' id='msg'></div>";

    var filter = "";

    if (param.addFilter) {
      filter = "<span style='font-family:monospace; font-weight:bold'>XPath:</span> <input alt=title='Enter XPath to test and hit ENTER/RETURN. Errors will indicate a bad XPath, otherwise the document contents will reflect the outcome of the XPath selection.' title='Enter XPath to test and hit ENTER/RETURN. Errors will indicate a bad XPath, otherwise the document contents will reflect the outcome of the XPath selection.' style='font-family: monospace; outline: none;' type='text' size=69 id='xpath' onchange='filter_xpath();'/> <button alt='Reset XPath & restore original document' title='Reset XPath & restore original document' style='transition: all 150ms ease; vertical-align:bottom; height:30px; width:30px; border: none; outline:0; background-color:#ffffff; background-image: url(lib/vkbeautify-0.99.00/./reset.png); background-repeat: no-repeat;' onclick='reset_form(); return(false);'></button><br/>";
    }

// <img alt='Reset' width='20px' src='lib/vkbeautify-0.99.00/./reset.png'/>

    el.innerHTML = filter + msg +
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

    document.getElementById('msg').innerText = "Invalid XPath";
    document.getElementById('msg').style.display = "inline-block";

  }

}

function reset_form(doc) {

  document.getElementById('msg').style.display = "none";
  document.getElementById('xpath').value = "" ;

  var xml_div = document.getElementById('xmldiv');
  xml_div.innerText =  vkbeautify.xml(glob.xmlDoc);

  hljs.highlightBlock(document.getElementById('xmldiv'));

}
