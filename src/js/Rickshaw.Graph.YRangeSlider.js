Rickshaw.namespace('Rickshaw.Graph.YRangeSlider');

Rickshaw.Graph.YRangeSlider = Rickshaw.Class.create({

  initialize: function(args) {

    var element = this.element = args.element;
    var graph = this.graph = args.graph;
    this.min = args.min || 0;
    this.max = args.max || 14;
    this.step = args.step || 0.2;
    this.width = args.width || 200;

    this.build();

    graph.onUpdate( function() { this.update() }.bind(this) );
  },

  build: function() {

    var self=this;
    var element = this.element;
    var graph = this.graph;
    var yDomain = graph.yDomain();
    graph.window.yMin = yDomain[0];
    graph.window.yMax = yDomain[1];

    $( function() {
      $(element).slider( {
        range: true,
        min: self.min,
        max: self.max,
        step: self.step,
        values: yDomain,
        slide: function( event, ui ) {

          graph.window.yMin = ui.values[0];
          graph.window.yMax = ui.values[1];
          if (graph.window.yMin >= graph.window.yMax) { graph.window.yMax = 1.01 * graph.window.yMin;}
          graph.update();

          // if we're at an extreme, stick there
          if (this.min == ui.values[0]) {
            graph.window.yMin = undefined;
          }
          if (this.max == ui.values[1]) {
            graph.window.yMax = undefined;
          }
        }
      } );
    } );

    element[0].style.width = this.width + 'px';
  },

  update: function() {

    var element = this.element;
    var graph = this.graph;

    var values = $(element).slider('option', 'values');

    $(element).slider('option', 'min', this.min);
    $(element).slider('option', 'max', this.max);

    if (graph.window.yMin == null) {
      values[0] = this.min;
    }
    if (graph.window.yMax == null) {
      values[1] = this.max;
    }

    $(element).slider('option', 'values', values);
  }
});

