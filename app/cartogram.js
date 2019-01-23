import * as d3 from 'd3';




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


  var cartogram2 = {
    margin: {
        top: 40,
        right: 140,
        bottom: 0,
        left: 60
    },
    selector: '#carto2 svg',
    init: function() {
        var self = this;
        self.$el = $(self.selector);
        self.width = 550 - self.margin.left - self.margin.right;
        self.height = 400 - self.margin.top - self.margin.bottom;
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
              for (var i=0; i < data.length; i++){
                if (data[i].state == d.state_full){
                  if (data[i].pct_change <= -.8) { d.color = "dq8"; return "dq8"; }
                  else if (data[i].pct_change <= -.5) { d.color = "dq7"; return "dq7"; }
                  else if (data[i].pct_change <= -.3) { d.color = "dq6"; return "dq6"; }
                  else if (data[i].pct_change < 0) { d.color = "dq5"; return "dq5"; }
                  else if (data[i].pct_change == 0) { d.color = "none"; return "none"; }
                  else if (data[i].pct_change >= 1) { d.color = "dq1"; return "dq1"; }
                  else if (data[i].pct_change >= .5) { d.color = "dq2"; return "dq2"; }
                  else if (data[i].pct_change >= .3) { d.color = "dq3"; return "dq3"; }
                  else if (data[i].pct_change > 0) { d.color = "dq4"; return "dq4"; }
              }
            }
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
              d3.selectAll("rect").attr('class', function(d) {
               for (var i=0; i < data.length; i++){
                if (data[i].state == d.state_full){
                  if (data[i].pct_change <= -.8) { d.color = "dq8"; return "faded dq8"; }
                  else if (data[i].pct_change <= -.5) { d.color = "dq7"; return "faded dq7"; }
                  else if (data[i].pct_change <= -.3) { d.color = "dq6"; return "faded dq6"; }
                  else if (data[i].pct_change < 0) { d.color = "dq5"; return "faded dq5"; }
                  else if (data[i].pct_change == 0) { d.color = "none"; return "faded none"; }
                  else if (data[i].pct_change >= 1) { d.color = "dq1"; return "faded dq1"; }
                  else if (data[i].pct_change >= .5) { d.color = "dq2"; return "faded dq2"; }
                  else if (data[i].pct_change >= .3) { d.color = "dq3"; return "faded dq3"; }
                  else if (data[i].pct_change > 0) { d.color = "dq4"; return "faded dq4"; }
              }
            }
                
            }); 
              d3.select(this).attr('class', function(d) {
                for (var i=0; i < data.length; i++){
                if (data[i].state == d.state_full){
                  if (data[i].pct_change <= -.8) { d.color = "dq8"; return "selected dq8"; }
                  else if (data[i].pct_change <= -.5) { d.color = "dq7"; return "selected dq7"; }
                  else if (data[i].pct_change <= -.3) { d.color = "dq6"; return "selected dq6"; }
                  else if (data[i].pct_change < 0) { d.color = "dq5"; return "selected dq5"; }
                  else if (data[i].pct_change == 0) { d.color = "none"; return "selected none"; }
                  else if (data[i].pct_change >= 1) { d.color = "dq1"; return "selected dq1"; }
                  else if (data[i].pct_change >= .5) { d.color = "dq2"; return "selected dq2"; }
                  else if (data[i].pct_change >= .3) { d.color = "dq3"; return "selected dq3"; }
                  else if (data[i].pct_change > 0) { d.color = "dq4"; return "selected dq4"; }
              }
            }
            });
              var chatter = document.getElementById('cartoMapChatter');
              for (var i=0; i < data.length; i++){
                if (data[i].state == d.state_full){
                  if (data[i].pct_change <= -.8) { d.color = "dq8"; }
                  else if (data[i].pct_change <= -.5) { var colorMe = "dq7";  }
                  else if (data[i].pct_change <= -.3) { var colorMe = "dq6"; }
                  else if (data[i].pct_change < 0) { var colorMe = "dq5";  }
                  else if (data[i].pct_change == 0) { var colorMe = "none";  }
                  else if (data[i].pct_change >= 1) { var colorMe = "dq1";  }
                  else if (data[i].pct_change >= .5) { var colorMe = "dq2";  }
                  else if (data[i].pct_change >= .3) { var colorMe = "dq3";  }
                  else if (data[i].pct_change > 0) { var colorMe = "dq4";  }
                  d.color = colorMe;
                  chatter.innerHTML = "<h2>" + d.state_full + "</h2><div><span class='stateData'>Total farms</span> : <span class='stateStat'>" + d3.format(",")(data[i].total_farms) + "</span></div><div><span class='stateData'>Total farm workers in 2012</span> : <span class='stateStat'>" + d3.format(",")(data[i].farm_workers_2012) + "</span></div><div><span class='stateData'>Death rate per 100,000</span> : <span class='stateStat'>" + d3.format(".0f")(data[i].rate_2012) + "</span></div><div><span class='stateData'>1992-2002 total farm deaths</span> : <span class='stateStat'>" + data[i].deaths1992 + "</span></div><div><span class='stateData'>2003-2013 total farm deaths</span> : <span class='stateStat'>" + data[i].deaths2003 + "</span></div><div><span class='stateData'>Percent change</span> : <span class='stateStat t" + d.color + "'>" + d3.format("%")(Number(data[i].pct_change)) + "</span></div>";
                }           
              }             });
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
             d3.selectAll("rect").attr('class', function(d) {
              for (var i=0; i < data.length; i++){
                if (data[i].state == d.state_full){
                  if (data[i].pct_change <= -.8) { d.color = "dq8"; return "faded dq8"; }
                  else if (data[i].pct_change <= -.5) { d.color = "dq7"; return "faded dq7"; }
                  else if (data[i].pct_change <= -.3) { d.color = "dq6"; return "faded dq6"; }
                  else if (data[i].pct_change < 0) { d.color = "dq5"; return "faded dq5"; }
                  else if (data[i].pct_change == 0) { d.color = "none"; return "faded none"; }
                  else if (data[i].pct_change >= 1) { d.color = "dq1"; return "faded dq1"; }
                  else if (data[i].pct_change >= .5) { d.color = "dq2"; return "faded dq2"; }
                  else if (data[i].pct_change >= .3) { d.color = "dq3"; return "faded dq3"; }
                  else if (data[i].pct_change > 0) { d.color = "dq4"; return "faded dq4"; }
              }
            }
            }); 
              d3.select(this.parentNode).select("rect").attr('class', function(d) {
              for (var i=0; i < data.length; i++){
                if (data[i].state == d.state_full){
                  if (data[i].pct_change <= -.8) { d.color = "dq8"; return "selected dq8"; }
                  else if (data[i].pct_change <= -.5) { d.color = "dq7"; return "selected dq7"; }
                  else if (data[i].pct_change <= -.3) { d.color = "dq6"; return "selected dq6"; }
                  else if (data[i].pct_change < 0) { d.color = "dq5"; return "selected dq5"; }
                  else if (data[i].pct_change == 0) { d.color = "none"; return "selected none"; }
                  else if (data[i].pct_change >= 1) { d.color = "dq1"; return "selected dq1"; }
                  else if (data[i].pct_change >= .5) { d.color = "dq2"; return "selected dq2"; }
                  else if (data[i].pct_change >= .3) { d.color = "dq3"; return "selected dq3"; }
                  else if (data[i].pct_change > 0) { d.color = "dq4"; return "selected dq4"; }
              }
            }
            });
              var chatter = document.getElementById('cartoMapChatter');
              for (var i=0; i < data.length; i++){
                if (data[i].state == d.state_full){
                  if (data[i].pct_change <= -.8) { d.color = "dq8"; }
                  else if (data[i].pct_change <= -.5) { var colorMe = "dq7";  }
                  else if (data[i].pct_change <= -.3) { var colorMe = "dq6"; }
                  else if (data[i].pct_change < 0) { var colorMe = "dq5";  }
                  else if (data[i].pct_change == 0) { var colorMe = "none";  }
                  else if (data[i].pct_change >= 1) { var colorMe = "dq1";  }
                  else if (data[i].pct_change >= .5) { var colorMe = "dq2";  }
                  else if (data[i].pct_change >= .3) { var colorMe = "dq3";  }
                  else if (data[i].pct_change > 0) { var colorMe = "dq4";  }
                  d.color = colorMe;
                  chatter.innerHTML = "<h2>" + d.state_full + "</h2><div><span class='stateData'>Total farms</span> : <span class='stateStat'>" + d3.format(",")(data[i].total_farms) + "</span></div><div><span class='stateData'>Total farm workers in 2012</span> : <span class='stateStat'>" + d3.format(",")(data[i].farm_workers_2012) + "</span></div><div><span class='stateData'>Death rate per 100,000</span> : <span class='stateStat'>" + d3.format(".0f")(data[i].rate_2012) + "</span></div><div><span class='stateData'>1992-2002 total farm deaths</span> : <span class='stateStat'>" + data[i].deaths1992 + "</span></div><div><span class='stateData'>2003-2013 total farm deaths</span> : <span class='stateStat'>" + data[i].deaths2003 + "</span></div><div><span class='stateData'>Percent change</span> : <span class='stateStat t" + d.color + "'>" + d3.format("%")(Number(data[i].pct_change)) + "</span></div>";
                }           
              }             })
            .text(function(d) {
                return d.state_postal;
            });
    },
    state_pos_co2: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total_old':'32','state_total_new':'25','state_change':'-63%','color':'dq1'},
        {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total_old':'14','state_total_new':'36','state_change':'+36%','color':'dq7'},
        {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total_old':'36','state_total_new':'43','state_change':'-33%','color':'dq3'},
        {'state_full':'California','state_postal':'CA','row':3,'column':0,'state_total_old':'358','state_total_new':'267','state_change':'-25%','color':'dq3'},
        {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total_old':'124','state_total_new':'93','state_change':'-33%','color':'dq3'},
        {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'state_total_old':'0','state_total_new':'6','state_change':'Insufficient data','color':'none'},
        {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'state_total_old':'3','state_total_new':'3','state_change':'-100%','color':'dq1'},
        {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total_old':'150','state_total_new':'136','state_change':'-14%','color':'dq4'},
        {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total_old':'77','state_total_new':'59','state_change':'-38%','color':'dq3'},
        {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total_old':'71','state_total_new':'68','state_change':'-21%','color':'dq3'},
        {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total_old':'251','state_total_new':'221','state_change':'-14%','color':'dq4'},
        {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total_old':'216','state_total_new':'220','state_change':'0%','color':'mid'},
        {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total_old':'228','state_total_new':'295','state_change':'+29%','color':'dq6'},
        {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total_old':'215','state_total_new':'205','state_change':'-6%','color':'dq4'},
        {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total_old':'308','state_total_new':'162','state_change':'-49%','color':'dq2'},
        {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total_old':'30','state_total_new':'26','state_change':'-53%','color':'dq1'},
        {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'state_total_old':'0','state_total_new':'14','state_change':'Insufficient data','color':'none'},
        {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'state_total_old':'26','state_total_new':'27','state_change':'-46%','color':'dq2'},
        {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total_old':'102','state_total_new':'179','state_change':'+74%','color':'dq8'},
        {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'state_total_old':'153','state_total_new':'210','state_change':'+37%','color':'dq7'},
        {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'state_total_old':'65','state_total_new':'46','state_change':'-57%','color':'dq1'},
        {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total_old':'264','state_total_new':'288','state_change':'+5%','color':'dq5'},
        {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total_old':'145','state_total_new':'139','state_change':'-10%','color':'dq4'},
        {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'state_total_old':'199','state_total_new':'179','state_change':'-11%','color':'dq4'},
        {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'state_total_old':'0','state_total_new':'11','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total_old':'0','state_total_new':'4','state_change':'Insufficient data','color':'none'},
        {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total_old':'8','state_total_new':'19','state_change':'+50%','color':'dq8'},
        {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total_old':'24','state_total_new':'14','state_change':'-100%','color':'dq1'},
        {'state_full':'New York','state_postal':'NY','row':1,'column':8,'state_total_old':'203','state_total_new':'135','state_change':'-38%','color':'dq3'},
        {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'state_total_old':'156','state_total_new':'111','state_change':'-35%','color':'dq3'},
        {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total_old':'84','state_total_new':'117','state_change':'+36%','color':'dq7'},
        {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'state_total_old':'258','state_total_new':'217','state_change':'-18%','color':'dq4'},
        {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total_old':'46','state_total_new':'53','state_change':'-30%','color':'dq3'},
        {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'state_total_old':'40','state_total_new':'61','state_change':'+20%','color':'dq6'},
        {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total_old':'276','state_total_new':'182','state_change':'-34%','color':'dq3'},
        {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'state_total_old':'0','state_total_new':'0','state_change':'Insufficient data','color':'none'},
        {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total_old':'16','state_total_new':'30','state_change':'+38%','color':'dq7'},
        {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total_old':'88','state_total_new':'108','state_change':'+17%','color':'dq6'},
        {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total_old':'244','state_total_new':'147','state_change':'-42%','color':'dq2'},
        {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total_old':'223','state_total_new':'159','state_change':'+29%','color':'dq3'},
        {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total_old':'24','state_total_new':'24','state_change':'-67%','color':'dq1'},
        {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'state_total_old':'7','state_total_new':'15','state_change':'-57%','color':'dq1'},
        {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total_old':'130','state_total_new':'123','state_change':'-10%','color':'dq4'},
        {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'state_total_old':'88','state_total_new':'63','state_change':'-39%','color':'dq3'},
        {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total_old':'9','state_total_new':'22','state_change':'0%','color':'mid'},
        {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total_old':'279','state_total_new':'242','state_change':'-15%','color':'dq4'},
        {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total_old':'33','state_total_new':'37','state_change':'-21%','color':'dq3'}]
};

  cartogram2.init();