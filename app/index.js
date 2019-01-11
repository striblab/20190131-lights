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

var mapStyle = {
  "version": 8,
  "name": "Dark",
  "sources": {
      "mapbox": {
          "type": "vector",
          "url": "mapbox://styles/shadowflare/cjp2sx7kc2f532sqaxosktgsu"
      },
      "overlay": {
          "type": "image",
          "url": "https://www.mapbox.com/mapbox-gl-js/assets/radar.gif",
          "coordinates": [
              [-80.425, 46.437],
              [-71.516, 46.437],
              [-71.516, 37.936],
              [-80.425, 37.936]
          ]
      }
  },
  "sprite": "mapbox://sprites/mapbox/dark-v9",
  "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  "layers": [
      {
          "id": "background",
          "type": "background",
          "paint": {"background-color": "#999999"}
      }
  ]
};

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


map.addLayer({
    id: 'raster-layer',
    type: 'raster',
    source: {
      type: 'raster',
      tiles: ['https://api.mapbox.com/v4/shadowflare.alb50mri/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hhZG93ZmxhcmUiLCJhIjoiS3pwY1JTMCJ9.pTSXx_LFgR3XBpCNNxWPKA'],
    },
    minzoom: 0,
    maxzoom: 22
  });
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