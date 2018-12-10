"use strict";

$(document).ready(function() {
  // Конструктор reportBlock, пока не знаю, каким будет класс
  // пошел в D3.js
  function reportBlock() {

  }

  var emulatedDataJSON = [
    { "y": "15000", "day": "20", "x": "1" },
    { "y": "17000", "day": "21", "x": "2" },
    { "y": "18000", "day": "22", "x": "3" },
    { "y": "19000", "day": "23", "x": "4" },
    { "y": "12000", "day": "24", "x": "5" },
    { "y": "7000", "day": "25", "x": "6" },
    { "y": "22000", "day": "26", "x": "7" },
    { "y": "20000", "day": "27", "x": "8" },
    { "y": "18000", "day": "28", "x": "9" },
    { "y": "16000", "day": "29", "x": "10" },
    { "y": "15000", "day": "30", "x": "11" },
    { "y": "12000", "day": "31", "x": "12" },
    { "y": "10000", "day": "01", "x": "13" },
    { "y": "6000", "day": "02", "x": "14" },
    { "y": "10000", "day": "03", "x": "15" },
    { "y": "12000", "day": "04", "x": "16" },
    { "y": "15000", "day": "05", "x": "17" },
    { "y": "13000", "day": "06", "x": "18" },
    { "y": "11000", "day": "07", "x": "19" },
    { "y": "9000", "day": "08", "x": "20" },
    { "y": "13000", "day": "09", "x": "21" },
    { "y": "15000", "day": "10", "x": "22" },
    { "y": "17000", "day": "11", "x": "23" },
    { "y": "19000", "day": "12", "x": "24" },
    { "y": "23000", "day": "13", "x": "25" },
    { "y": "25000", "day": "14", "x": "26" },
    { "y": "22000", "day": "15", "x": "27" },
    { "y": "19000", "day": "16", "x": "28" },
    { "y": "17000", "day": "17", "x": "29" },
    { "y": "8000", "day": "18", "x": "30" }
  ]



  var chartWideWithAxisWidth = 890; // вся ширина полотна, включая легенды
  var chartWideWithoutAxisWidth = 813; // ширина самой диаграммы
  var chartWideWithAxisHeight = 300;  // высота полотна, включая легенды
  var chartWideWithoutAxisHeight = 250; // высота самой диаграммы
  var xAxisLength = 810;
  var yAxisLength = 260;

  var svg = d3.select('#asd')
              .append('svg')
              .attr('class', 'd3')
              .attr('width', chartWideWithAxisWidth)
              .attr('height', chartWideWithAxisHeight);

  var gXAxis = svg.append('g')
                .classed('d3__axis d3__axis-x', true)
                .attr('width', xAxisLength);
  var gYAxis = svg.append('g')
                .classed('d3__axis d3__axis-y', true)
                .attr('height', yAxisLength)
                .attr('width', 57);

  var scaleX = d3.scaleLinear()
                .domain([1, 30])
                .range([0, xAxisLength]);
  var scaleY = d3.scaleLinear()
                .domain([25000, 0])
                .range([0, yAxisLength]);

  var yAxis = d3.axisLeft(scaleY)
                .tickSizeInner(0)
                .tickSizeOuter(0)
                .tickPadding(20)
                .ticks(5);
  var xAxis = d3.axisBottom(scaleX)
                .tickSizeInner(0)
                .tickSizeOuter(0)
                .tickPadding(19)
                .ticks(30);

  gYAxis.call(yAxis);
  gXAxis.call(xAxis);

  d3.selectAll('.d3__axis-x .tick')
    .append('line')
    .classed('d3__grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', -(yAxisLength));

  d3.selectAll('.d3__axis-y .tick')
    .filter(function(d) {
      return d === 0 ? false : true;
    })
    .append('line')
    .classed('d3__grid-line', true)
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', xAxisLength)
    .attr('y2', 0);

  d3.selectAll('.d3__axis-x .tick text')
    .remove();

  var interpolatedData = [];
  emulatedDataJSON.forEach(function(d) {
    interpolatedData.push({"x": scaleX(d.x) + 58, "y": scaleY(d.y) + 7});
  });

  var line = d3.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

  var area = d3.area()
    .x(function(d) { return d.x; })
    .y0(chartWideWithoutAxisHeight + 18)
    .y1(function(d) { return d.y; });

  var linearGradient = svg.append('linearGradient')
                        .attr('id', 'linear-gradient')
                        .attr('gradientUnits', 'objectBoundingBox')
                        .attr('x1', 0)
                        .attr('y1', 0)
                        .attr('x2', 0)
                        .attr('y2', 1);

  linearGradient.append('stop')
    .attr('offset', '0%')
    .attr('stop-color', '#4bcafe');

  linearGradient.append('stop')
    .attr('offset', '100%')
    .attr('stop-color', '#4ba2fe');

  svg.append('g')
    .append('path')
    .attr('d', line(interpolatedData))
    .classed('d3__line', true);

  svg.append('g')
    .append('path')
    .attr('d', area(interpolatedData))
    .attr('fill', 'url(#linear-gradient)');


  var xAxisLabels = svg.append('g').classed('d3__axis-labels', true);
  var xAxisLabelsMargin = xAxisLength / (emulatedDataJSON.length - 1);

  emulatedDataJSON.forEach(function(d, i) {
    xAxisLabels
      .append('text')
      .attr('transform', 'translate(' + xAxisLabelsMargin * i + ', ' + chartWideWithAxisHeight + ')')
      .text(d.day);
  });

  var tooltip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return d.y + ' &#8381;';
                  });

  svg.call(tooltip);

  var dots = svg.append('g')
              .attr('class', 'd3__dots');
  dots.selectAll('.d3__dot')
    .data(interpolatedData)
  .enter().append('circle')
    .attr('class', 'd3__dot')
    .attr('r', 5)
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .data(emulatedDataJSON)
    .on('mouseover', tooltip.show)
    .on('mouseout', tooltip.hide);
});
