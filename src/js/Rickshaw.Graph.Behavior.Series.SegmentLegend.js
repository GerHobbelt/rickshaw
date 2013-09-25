Rickshaw.namespace('Rickshaw.Graph.Behavior.Series.SegmentLegend');

Rickshaw.Graph.Behavior.Series.SegmentLegend = function(args) {

  this.graph     = args.graph;
  this.legend    = args.legend;
  this.elements  = args.elements;

  var self = this;

  for (var i = 0; i < self.elements.length; ++i) {
    self.elements[i].addEventListener('click', function(e) {
      segment = e.target.getAttribute('data-segment');

      self.legend.lines.forEach(function(line) {
        if (line.series.name.indexOf(segment) >= 0) {
          line.series.enable();
          line.element.classList.remove('disabled');
        } else {
          line.series.disable();
          line.element.classList.add('disabled');
        }
      } );
    });
  }
};
