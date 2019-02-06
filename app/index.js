/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here, mostly so linting won't get triggered
// and its a good queue of what is available:
// /* global _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();


// Auto enable Pym for embedding.  This will enable a Pym Child if
// the url contains ?pym=true
utils.autoEnablePym();


// Adding dependencies
// ---------------------------------
// Import local ES6 or CommonJS modules like this:
// import utilsFn from './shared/utils.js';
//
// Or import libraries installed with npm like this:
// import module from 'module';

// Adding Svelte templates in the client
// ---------------------------------
// We can bring in the same Svelte templates that we use
// to render the HTML into the client for interactivity.  The key
// part is that we need to have similar data.
//
// First, import the template.  This is the main one, and will
// include any other templates used in the project.
// import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  There are two ways to do this.
// If you are using the buildData function to get data, then ?
//
// 1. For smaller datasets, just import them like other files.
// import content from '../assets/data/content.json';
//
// 2. For larger data points, utilize window.fetch.
// let content = await (await window.fetch('../assets/data/content.json')).json();
//
// Once you have your data, use it like a Svelte component:
//
// const app = new Content({
//   target: document.querySelector('.article-lcd-body-content'),
//   data: {
//     content
//   }
// });

// import * as mapboxgl from 'mapbox-gl';

// var mapStyle = {
//   "version": 8,
//   "name": "Dark",
//   "sources": {
//       "mapbox": {
//           "type": "vector",
//           "url": "mapbox://styles/shadowflare/cjp2sx7kc2f532sqaxosktgsu"
//       },
//       "overlay": {
//           "type": "image",
//           "url": "https://www.mapbox.com/mapbox-gl-js/assets/radar.gif",
//           "coordinates": [
//               [-80.425, 46.437],
//               [-71.516, 46.437],
//               [-71.516, 37.936],
//               [-80.425, 37.936]
//           ]
//       }
//   },
//   "sprite": "mapbox://sprites/mapbox/dark-v9",
//   "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
//   "layers": [
//       {
//           "id": "background",
//           "type": "background",
//           "paint": {"background-color": "#999999"}
//       }
//   ]
// };

import BigMap from './bigmap.js';
import * as d3 from 'd3';
import Chart from './chart.js';


const chart1 = new Chart('#chartDNB');
const bigmap = new BigMap("#country");

bigmap.render();
chart1.render();

mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA';
var map = new mapboxgl.Map({
    container: 'map', 
    // style: mapStyle,
    style: 'mapbox://styles/shadowflare/cjp2sx7kc2f532sqaxosktgsu',
    center: [-93.001157, 46.424317], 
    zoom: 5.3,
    // maxBounds: [-97.25, 43.4, -89.53, 49.5],
    scrollZoom: false
});

map.dragPan.disable();
map.keyboard.disable();
map.touchZoomRotate.disableRotation();

map.on('load', function() {

// map.addSource('lights', {
//     type: 'geojson',
//     data: './data/lights.json'
//   });
 
// map.addLayer({
//     "id": "lights-layer",
//     "type": "symbol",
//     "source": "lights"
//   }); //, 'place-neighbourhood'


// map.addLayer({
//     id: 'raster-layer',
//     type: 'raster',
//     source: {
//       type: 'raster',
//       tiles: ['https://api.mapbox.com/v4/shadowflare.alb50mri/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA'],
//     },
//     minzoom: 0,
//     maxzoom: 22
//   });
});

$(document).ready(function() {
  if ($(window).width() < 500) {
      map.flyTo({
        center: [-94.156517, 45.559292], 
        zoom: 5
      });
  }
  $(window).resize(function() {
      if ($(window).width() < 500) {
          map.flyTo({
            center: [-94.156517, 45.559292], 
            zoom: 5
          });
      } else {
          map.flyTo({
            center: [-94.202164, 46.354710], 
            zoom: 6
          });
      }
  });
});


var aspect = 550 / 400, chart = $("#carto1 svg");
$(window).on("resize", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});

$(window).on("load", function() {   
    var targetWidth = chart.parent().width();   
    chart.attr("width", targetWidth);   
    chart.attr("height", targetWidth / aspect);
  });


  var cartogram1 = {
    margin: {
        top: 20,
        right: 140,
        bottom: 140,
        left: 60
    },

    selector: '#carto1 svg',
    init: function() {
        var self = this;
        self.$el = $(self.selector);
        self.width = 550 - self.margin.left - self.margin.right;
        self.height = 500 - self.margin.top - self.margin.bottom;
        self.svg = d3.select(self.selector)
            .attr('height', self.height + self.margin.top + self.margin.bottom)
            .attr('width', self.width + self.margin.left + self.margin.right)
        self.state_size = self.width / 12;
        self.state_padding = 2;
        self.map = self.svg.append('g')
            .attr('transform', 'translate(' + self.margin.left + ','
                  + self.margin.top + ')')
        self.drawMap();
    },
    drawMap: function() {
        var self = this;
        var states = self.map.selectAll('.states')
            .data(self.state_pos_co2)
            .enter().append('g')
            .attr('class', 'state-groups');
        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "d";
            })
            .attr('class', 'state')
            .attr('class', function(d) {
                if (d.state_postal == "OR" || d.state_postal == "OR" || d.state_postal == "AZ" || d.state_postal == "NM" || d.state_postal == "CO" || d.state_postal == "WY" || d.state_postal == "MN" || d.state_postal == "AR" || d.state_postal == "TX" || d.state_postal == "FL" || d.state_postal == "VA" || d.state_postal == "DC" || d.state_postal == "MD" || d.state_postal == "DE" || d.state_postal == "CT" || d.state_postal == "RI" || d.state_postal == "NY" || d.state_postal == "NH" || d.state_postal == "ME" || d.state_postal == "HI" || d.state_postal == "PR") { return "gray5"; }
              return "gray1";
            })
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)
            .on('click', function(d) {
          
            });

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                return d.color;
            })
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            .on('click', function(d) { 

            })
            .text(function(d) {
                return d.state_postal;
            });
    },
    state_pos_co2: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4},
        {'state_full':'California','state_postal':'CA','row':3,'column':0},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2},
        {'state_full':'American Samoa','state_postal':'AS','row':8,'column':4},
        {'state_full':'Guam','state_postal':'GU','row':8,'column':5},
        {'state_full':'Pacific Mariana Islands','state_postal':'MP','row':8,'column':6},
        {'state_full':'U.S. Virgin Islands','state_postal':'VI','row':8,'column':7},
        {'state_full':'Puerto Rico','state_postal':'PR','row':8,'column':8}]
};

  cartogram1.init();