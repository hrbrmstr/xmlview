HTMLWidgets.widget({

  name: 'xmltreeview',

  type: 'output',

  factory: function(el, width, height) {

    return {
      view: {},

      renderValue: function(x) {

        //empty el in case of dynamic/Shiny
        el.innerHTML = "";

        //add CSS overflow scroll to el
        el.style.overflow = "scroll";

        var view = new Viewer(x.xmlDoc);
        view.appendTo(el);

        this.view = view;

      },

      resize: function(width, height) {

      }
    };

  }
});