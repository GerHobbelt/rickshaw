Rickshaw.namespace('Rickshaw.Graph.Behavior.Series.DetailLegend');

Rickshaw.Graph.Behavior.Series.DetailLegend = function(args) {
  var self = this;

  this.graph         = args.graph;
  this.legend        = args.legend;
  this.elements      = args.elements;
  this.defaultDetail = args.defaultDetail;

  this.highlightDetail = function(detail) {
    for (var j = 0; j < self.elements.length; ++j) {
      var element = self.elements[j];

      if (detail === element.getAttribute('data-detail')) {
        element.classList.remove('disabled');
      } else {
        element.classList.add('disabled');
      }
    }
  };

  this.enableLinesForDetail = function(detail) {
    self.legend.lines.forEach(function(line) {
      if (line.series.detail !== detail) { return; }

      line.series.enable();
      line.element.classList.remove('hidden');
      line.element.classList.remove('disabled');
    });

    self.legend.lines.forEach(function(line) {
      if (line.series.detail === detail) { return; }

      line.series.disable();
      line.element.classList.add('hidden');
      line.element.classList.add('disabled');
    });
  };

  for (var i = 0; i < self.elements.length; ++i) {
    self.elements[i].addEventListener('click', function(e) {
      var detail = e.target.parentNode.getAttribute('data-detail');

      self.highlightDetail(detail);
      self.enableLinesForDetail(detail);
    });
  }

  self.highlightDetail(self.defaultDetail);
  self.enableLinesForDetail(self.defaultDetail);
};
