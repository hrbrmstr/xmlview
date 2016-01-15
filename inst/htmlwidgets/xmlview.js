// shortcuts (kinda the only reason I use jQuery anyway)
function $id(element) { return(document.getElementById(element)); }
function $tag(tag) { return(document.getElementsByTagName(tag)); }
function $qs(css) { return(document.querySelector(css)) }

HTMLWidgets.widget({

  name: 'xmlview',
  type: 'output',
  thel: {},

  initialize: function(el, width, height) { return {} },

  renderValue: function(el, param, instance) {

    var self = this;

    this.thel = el;

    if (typeof(glob) === "undefined") { glob = {} }

    function filter_xpath() {
      var msg = $qs("div#" + self.thel.id + " > div.msgdiv");
      var xpath = $qs("div#" + self.thel.id + " > div.filterdiv > input.filterinput").value;
      msg.style.display = "none";
      do_filter(xpath.trim());
    }

    function do_filter(xpath) {

      var rcode = $qs("div#" + self.thel.id + " > div.rcodediv");
      var msg = $qs("div#" + self.thel.id + " > div.msgdiv");

      if (xpath === "") return(reset_form());

      var out_xml = "" ;

      try {

        var nsResolver = glob[self.thel.id].parsedOrig.createNSResolver(
                                    glob[self.thel.id].parsedOrig);

        var results =
          glob[self.thel.id].parsedOrig.evaluate(xpath,
                           glob[self.thel.id].parsedOrig,
                           nsResolver,
                           XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
                           null);

        var res = results.iterateNext() ;

        while(res) {
          out_xml = out_xml + glob[self.thel.id].serialize.serializeToString(res);
          res = results.iterateNext();
        }

        var xml_div = $qs("div#" + el.id + " > pre > code.xmldiv");
        xml_div.innerText = vkbeautify.xml(out_xml);
        xml_div.textContent = vkbeautify.xml(out_xml);

        hljs.highlightBlock(xml_div);

      } catch(err) {

        rcode.style.display = "none";

        msg.innerText = "Invalid XPath";
        msg.textContent = "Invalid XPath";
        msg.style.display = "inline-block";

      }

    }

    function reset_form(doc) {

      var rcode = $qs("div#" + self.thel.id + " > div.rcodediv");
      var msg = $qs("div#" + self.thel.id + " > div.msgdiv");
      var xpath = $qs("div#" + self.thel.id + " > div.filterdiv > input.filterinput");

      rcode.style.display = "none";
      msg.style.display = "none";
      xpath.value = "" ;

      var xml_div = $qs("div#" + self.thel.id + " > pre > code.xmldiv");

      xml_div.innerText = vkbeautify.xml(glob[self.thel.id].xmlDoc);
      xml_div.textContent = vkbeautify.xml(glob[self.thel.id].xmlDoc);

      hljs.highlightBlock(xml_div);

      return(false);

    }

    function generate_rcode() {

      var rcode = $qs("div#" + self.thel.id + " > div.rcodediv");
      var xpath = $qs("div#" + self.thel.id + " > div.filterdiv > input.filterinput");

      rcode.innerText = "xml2::xml_find_all(doc, '" +
                               xpath.value + "', ns=xml2::xml_ns(doc))";
      rcode.textContent = "xml2::xml_find_all(doc, '" +
                                 xpath.value + "', ns=xml2::xml_ns(doc))";
      rcode.style.display = "inline-block";

      return(false);

    }

    var serializer = new XMLSerializer();
    var domparser =  new DOMParser();

    glob[el.id] = {};
    glob[el.id].xmlDoc     = param.xmlDoc;
    glob[el.id].applyXPath = param.applyXPath;
    glob[el.id].orig       = param.xmlDoc;
    glob[el.id].serialize  = serializer;
    glob[el.id].parser     = domparser;
    glob[el.id].parsedOrig = domparser.parseFromString(param.xmlDoc, "text/xml");

    var link = document.createElement("link");
    link.href  = "lib/highlightjs-9.0.0/styles/" + param.styleSheet + ".css";
    link.type  = "text/css";
    link.rel   = "stylesheet";
    link.media = "screen,print";

    $tag("head")[0].appendChild(link);

    if (param.scroll) { el.style.overflow = "scroll" }

    var msg = '<div class="msgdiv"></div>';
    var rcode = '<div class="rcodediv"></div>';

    var filter = "";

    if (param.addFilter) {
      filter = '<div class="filterdiv">' +
               '<span class="xpathspan">XPath:</span> ' +
               '<input title="Enter XPath to test and hit ENTER/RETURN. Errors will indicate a bad XPath, otherwise the document contents will reflect the outcome of the XPath selection." class="filterinput" type="text" size=69 id="xpath"/> ' +
               '<button title="Reset XPath & restore original document" class="resetclass"></button> ' +
               '<button alt="Generate R xml2 code" title="Generate R xml2 code" class="rcodeclass"></button>' +
               '</div>';
    }

    el.innerHTML = filter + msg + rcode +
      '<pre><code class="html xmldiv"></code></pre>';

    if (param.addFilter) {
      $qs("div#" + el.id + " > div.filterdiv > input.filterinput").onchange = filter_xpath;
      $qs("div#" + el.id + " > div.filterdiv > button.resetclass").onclick = reset_form;
      $qs("div#" + el.id + " > div.filterdiv > button.rcodeclass").onclick = generate_rcode;
    }

    var xml_div = $qs("div#" + el.id + " > pre > code.xmldiv");

    if (glob[el.id].applyXPath === null) {

      xml_div.innerText = vkbeautify.xml(param.xmlDoc);
      xml_div.textContent = vkbeautify.xml(param.xmlDoc);

      hljs.initHighlighting() ;
      hljs.highlightBlock(xml_div);

    } else {
      if (param.addFilter) { $qs("div#" + el.id + " > div.filterdiv > input.filterinput").value = param.applyXPath }
      do_filter(param.applyXPath);
    }

  },

  resize: function(el, width, height, instance) {},

});
