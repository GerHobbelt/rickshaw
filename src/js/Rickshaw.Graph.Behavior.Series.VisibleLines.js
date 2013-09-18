Rickshaw.namespace('Rickshaw.Graph.Behavior.Series.VisibleLines');

Rickshaw.Graph.Behavior.Series.VisibleLines = function(args) {

  this.graph  = args.graph;
  this.legend = args.legend;
  this.lines  = args.lines;

  var self = this;

  if (this.legend && this.lines.length > 0) {
    if (typeof $ != 'undefined') {

      this.legend.lines.forEach( function(line) {
        if (self.lines.indexOf(line.series.name) >= 0) { return; }

        line.series.disable();
        line.element.classList.add('disabled');
      } );
    }
  }
};
