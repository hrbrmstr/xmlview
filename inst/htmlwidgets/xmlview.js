HTMLWidgets.widget({

  name: 'xmlview',

  type: 'output',

  initialize: function(el, width, height) {

    return {
      // TODO: add instance fields as required
    };

  },

  renderValue: function(el, param, instance) {

    link = document.createElement( "link" );
    link.href = "lib/highlightjs-9.0.0/styles/" + param.styleSheet + ".css";
    link.type = "text/css";
    link.rel = "stylesheet";
    link.media = "screen,print";

    document.getElementsByTagName("head")[0].appendChild( link );

    el.innerHTML = "<pre><code class='html' id='xmldiv'></code></pre>";

    xml_div = document.getElementById('xmldiv');
    xml_div.innerText =  vkbeautify.xml(param.xmlDoc);

    hljs.initHighlighting() ;
    hljs.highlightBlock(document.getElementById('xmldiv'));

  },

  resize: function(el, width, height, instance) {

  }

});
