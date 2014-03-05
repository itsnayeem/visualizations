define([
	'backbone',
    'hbs!tmpl/welcome'
],
function(Backbone, Welcome){
    'use strict';

	return Backbone.View.extend({
		initialize: function() {
            var self = this;

            self.duration= 1500;
            document.body.innerHTML = Welcome();
		},

        render: function(data) {
            var self = this;

            /* Inspired by http://jsfiddle.net/chrisJamesC/BjRLy/4/ */

            nv.addGraph(function () {
                self.chart = nv.models.cumulativeLineChart()
                    .x(function (d) { return d.x })
                    .y(function (d) { return d.y / 100 })
                    .color(d3.scale.category10().range());


                self.chart.xAxis
                    .tickFormat(function (d) {
                        return d3.time.format('%x')(new Date(d));
                    });

                self.chart.yAxis
                    .tickFormat(d3.format(',.1%'));

                d3.select('#chart svg')
                    .datum(data)
                    .transition().duration(self.duration)
                    .call(self.chart);

                nv.utils.windowResize(self.chart.update);

                return self.chart;
            });

            nv.addGraph(function () {
                self.barChart = nv.models.multiBarChart()
                    .x(function (d) { return d.x })
                    .y(function (d) { return d.y / 100 })
                    .color(d3.scale.category10().range());


                self.barChart.xAxis
                    .tickFormat(function (d) {
                        return d3.time.format('%x')(new Date(d));
                    });

                self.barChart.yAxis
                    .tickFormat(d3.format(',.1%'));

                d3.select('#barChart svg')
                    .datum(data)
                    .transition().duration(self.duration)
                    .call(self.barChart);

                nv.utils.windowResize(self.barChart.update);

                return self.barChart;
            });


            nv.addGraph(function () {
                self.barChart = nv.models.stackedAreaChart()
                    .x(function (d) { return d.x })
                    .y(function (d) { return d.y / 100 })
                    .color(d3.scale.category10().range())
                    .style('stream');


                self.barChart.xAxis
                    .tickFormat(function (d) {
                        return d3.time.format('%x')(new Date(d));
                    });

                self.barChart.yAxis
                    .tickFormat(d3.format(',.1%'));

                d3.select('#stackedAreaChart svg')
                    .datum(data)
                    .transition().duration(self.duration)
                    .call(self.barChart);

                nv.utils.windowResize(self.barChart.update);

                return self.barChart;
            });


        }
	});
});
