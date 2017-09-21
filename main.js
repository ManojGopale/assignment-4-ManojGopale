//////////////////////////////////////////////////////////////////////////////
// Global variables, preliminaries

var svgSize = 500;
var bands = 50;

var xScale = d3.scaleLinear().domain([0, bands]).  range([0, svgSize]);
var yScale = d3.scaleLinear().domain([-1,bands-1]).range([svgSize, 0]);

// Use to generate the svg's elements for legends
var randomData = [];
for (i=0; i<250; i++) {
	randomData.push(i);
}
console.log("randomData length = ", randomData.length)

function createSvg(sel)
{
    return sel
        .append("svg")
        .attr("width", svgSize)
        .attr("height", svgSize);
}

function createRects(sel)
{
    return sel
        .append("g")
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return xScale(d.Col); })
        .attr("y", function(d) { return yScale(d.Row); })
        .attr("width", 10)
        .attr("height", 10);
}

function createPaths(sel)
{
    return sel
        .append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            return "translate(" + xScale(d.Col) + "," + yScale(d.Row) + ")";
        })
        .append("path");
}

d3.selection.prototype.callReturn = function(callable)
{
    return callable(this);
};

//////////////////////////////////////////////////////////////////////////////

function glyphD(d) {
    // write this!
	// 1 => *, 2 => , 3 => +, 4 => --, 5 => -
	//debugger;
	var glyphScale = d3.scaleQuantize().domain([0, 500]).range([1, 2, 3, 4, 5]);
//	debugger;
	//console.log("X= " + xScale(d.Col) + " y= " + yScale(d.Row) );
	//return glyphScale(d.P);
	var x1 = xScale(d.Col);
	var y1 = yScale(d.Row);

	// Text
	// Each rect is individual, so they can be texted re;lative to each rect
		var smallMinus =  "M 3 5 L 7 5 ";	
		var largeMinus =  "M 1 5 L 9 5 ";
		var plus =  "M 1 5 L 9 5 M 5 1 L 5 9";
		 var halfStar = "M 1 5 L 9 5 M 5 1 L 5 9 M 9 1 L 1 9";
		 var fullStar = "M 1 5 L 9 5 M 5 1 L 5 9 M 9 1 L 1 9 M 1 1 L 9 9";

// Switch
	switch ( glyphScale(Math.abs(d.P)) ) {
		case 1:
			//console.log("case 1");
			return smallMinus;
			break;
		case 2:
			//console.log("case 2");
			return largeMinus;
			break;
		case 3:
			//console.log("case 3");
			return plus;
			break;
		case 4:
			//console.log("case 4");
			return halfStar;
			break;
		case 5:
			//console.log("case 5: ", xScale(d.Col), yScale(d.Row), d.Col, d.Row, d.P);
			return fullStar;
			break;
		default:
			//return ("M " + x1 + " " + y1);
			//return ('M ' + x1 + " " + y1);
			//console.log("Default");
			//debugger;
			//return "M 1 1 L 9 9 ";
			return fullStar;
	}
}

function glyphStroke(d) {
    // write this!
	if (d.P < 0) {
		return "black";
	} else {
		return "white";
	}
	//return "white";
}

function colorT1(d) {
    // write this!
	var TcolorScale = d3.scaleLinear()
										.interpolate(d3.interpolateHcl)
										.domain([-70, -60])
										.range(["orange", "blue"]);
//	debugger;
	//return TcolorScale(d.T);
	//return d3.interpolateOranges(d3.scaleLinear().domain([-70, -60])(d.T));
	var Color5 = ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];
	var TGradient = d3.scaleQuantize().domain([-70, -60]).range(Color5);
	return TGradient(d.T);
}

function colorP1(d) {
    // write this!
	// Get the neutral value of color for the range
	var lowerColor = "orange";
	var upperColor = "blue";
	var nScale = d3.scaleLinear().interpolate(d3.interpolateHcl).
								domain([0,100]).range([lowerColor, upperColor]);

	//var nScale1 = d3.scaleLinear().interpolate(d3.interpolateHcl).
	//							domain([0,200]).range([lowerColor, upperColor]);
	//debugger;
	//console.log("1st Scale 0-100", nScale(50));
	//console.log("2ns scale 0-200",nScale1(100));

	var neutralColor = nScale(50);
	//console.log(neutralColor);

	var PcolorScale = d3.scaleLinear()
										.interpolate(d3.interpolateHcl)
										.domain([-500, 0, 500])
										.range([lowerColor, "white",  upperColor]);
	//return PcolorScale(d.P);
	//return d3.interpolateBrBG(d3.scaleLinear().domain([-500, 500])(d.P));
	//return d3.interpolatePuOr(d3.scaleLinear().domain([-500, 500])(d.P));
	var Color5 = ["#a6611a", "#dfc27d", "#f5f5f5", "#80cdc1", "#018571"];
	var Color7 = ["#8c510a", "#d8b365", "#f6e8c3", "#f5f5f5", "#c7eae5", "#5ab4ac", "#01665e"];
	var pGradient = d3.scaleQuantize().domain([-500, 500]).range(Color5);
	return pGradient(d.P);
}

// Colors for bivariate map
var color1 = d3.hcl(270, 80, 50);
var color2 = d3.hcl(270, 80, 50);
var color3 = d3.hcl(300, 80, 60);
var color4 = d3.hcl(0, 30, 60);
var color5 = d3.hcl(0, 30, 60);
var colorP = [color1, color2, color3, color4, color5];

var c4 = d3.hcl(266, 40, 45);
var c3 = d3.hcl(239, 20, 76);
var c2 = d3.hcl(49, 39, 74);
var c1 = d3.hcl(32, 80, 42);
var color_c = [c1,  c4];
var color_3c = ['#ca0020','#f4a582','#92c5de','#0571b0'];

function colorPT(d) {
    // write this!
	var Color5 = ["#a6611a", "#dfc27d", "#f5f5f5", "#80cdc1", "#018571"];

	//return d3.interpolatePuOr((tGradient(d.T) + pGradient(d.P))/2);
	// green color interpolation

	// Pressure gradient to decrease the luminosity of red and blue
	var pGradient = d3.scaleQuantize().domain([0, 500]).range([95, 82, 68, 54, 40]);
	var l = pGradient(Math.abs(d.P));

	// Since only 2 vales are considered, the gradient chooses blue and red colors
	var tGradient = d3.scaleQuantize().domain([-70, -60]).range([1, 2]);
	switch (tGradient(d.T)){
		case 1:
			var h = 32;
			if (l!=95){
			var c = 80;
			} else if (l===95) {
			var c = 0;
			}
			break;
		case 2:
			var h = 266;
			if (l!=95) {
				var c = 40;
			} else if (l===95) {
				var c = 0;
			}
			break;
	}
	return d3.rgb(d3.hcl(h, c, l));

}

function colorT2(d) {
    // write this!
	//return d3.interpolateOranges(d3.scaleLinear().domain([-70, -60])(d.T));
	var Color5 = ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];
	var Color5_Green = ['#ffffcc','#c2e699','#78c679','#31a354','#006837'];
	var Color5_Green_new = ['#99d8c9','#66c2a4','#41ae76','#238b45','#005824'];
	//var Color5_Red = ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'];
	var Color5_Red = ['#fecc5c','#fd8d3c','#f03b20','#bd0026'];
	var TGradient = d3.scaleQuantize().domain([-70, -60]).range(Color5_Green_new);
	return TGradient(d.T);
}

//////////////////////////////////////////////////////////////////////////////

// Legends
var lWidth = 120;
var lHeight = 240;
var padding = {"top" : 15, "bottom": 5, "left" : 20, "right": 40};

// Legend functions
function createSvgLegend(sel) {
	return sel.append("svg")
						.attr("width", lWidth+60)
						.attr("height", lHeight);
}

function createRectLegend(sel) {
	return sel.selectAll("rect")
						.data(randomData)
						.enter()
						.append("rect")
						.attr("x", padding.left)
						.attr("y", function(d) {
							return d3.scaleLinear().domain([249, 0]).range([padding.top, (lHeight-padding.bottom)])(d);
						})
						.attr("width", (lWidth-padding.right-padding.left))
						.attr("height", Math.ceil((lHeight-padding.top-padding.bottom)/250))
}
// Legend 1 - Temperature

function fillLegend1 (d) {
	var Color5 = ["#fef0d9", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"];
	var TGradient = d3.scaleQuantize().domain([0, 249]).range(Color5);
	return TGradient(d)
}

// Create legend svg with id=legend1Svg
d3.select("#colorlegend-1")
	.callReturn(createSvgLegend)
	.attr("id", "legend1Svg")
	.callReturn(createRectLegend)
	.attr("fill", fillLegend1);

// Since -60 is at top, we will need top margin first then bottom margin
var yScale_1 = d3.scaleLinear().domain([-60, -70]).range([padding.top, (lHeight-padding.bottom)]);
var yAxis_1 = d3.axisRight()
						.scale(yScale_1)
						.ticks(5);

// Select legend1Svg and append axis
d3.select("#legend1Svg").append("g")
					.attr("class", "axis")
					.attr("transform", "translate ( " + (lWidth-padding.right) + ", 0 )" )
					.call(yAxis_1);


d3.select("#legend1Svg")
	.append("text")
	.attr("x", 125)
	.attr("y", 200)
	.text("Temperature (degree C)")
	.attr("transform", "rotate(-90 125, 200)");

// Legend 2 - Pressure

function fillLegend2(d) {
	//var Color7 = ["#8c510a", "#d8b365", "#f6e8c3", "#f5f5f5", "#c7eae5", "#5ab4ac", "#01665e"];
	var Color5 = ["#a6611a", "#dfc27d", "#f5f5f5", "#80cdc1", "#018571"];
	var pGradient = d3.scaleQuantize().domain([0, 249]).range(Color5);
	return pGradient(d);
}

d3.select("#colorlegend-2")
	.callReturn(createSvgLegend)
	.attr("id", "legend2Svg")
	.callReturn(createRectLegend)
	.attr("fill", fillLegend2);

var yScale_2 = d3.scaleLinear().domain([500, -500]).range([padding.top, (lHeight-padding.bottom)]);
var yAxis_2 = d3.axisRight()
						.scale(yScale_2)
						.tickValues([-500, -300, -100, 0, 100, 300, 500]);

d3.select("#legend2Svg").append("g")
					.attr("class", "axis")
					.attr("transform", "translate ( " + (lWidth-padding.right) + ", 0 )" )
					.call(yAxis_2);

d3.select("#legend2Svg")
	.append("text")
	.attr("x", 125)
	.attr("y", 180)
	.text("Pressure (hPa)")
	.attr("transform", "rotate(-90 125, 180)");


// Legend 3 - Pressure

function fillLegend3(d) {
	//var pGradient = d3.scaleQuantize().domain([0, 4]).range([95, 72, 68, 54, 40]);
	//var pGradient = d3.scaleQuantize().domain([5, 9]).range([40, 54, 68, 72, 95]);
	var pGradient = d3.scaleQuantize().domain([0, 9]).range([40, 54, 68, 82, 95, 95, 82, 68, 54, 40]);
	var l = pGradient(d);

	// Since only 2 vales are considered, the gradient chooses blue and red colors
	//var tGradient = d3.scaleQuantize().domain([-70, -60]).range([1, 2]);
			if ( d >= 5 ) {
				console.log("Loop 1");
				var h = 32;
				if (l!=95){
				var c = 80;
				} else if (l===95) {
				var c = 0;
				}
			} else if (d < 5) {
				var h = 266;
				if (l!=95) {
					var c = 40;
				} else if (l===95) {
					var c = 0;
				}
			}
	console.log("h = " + h + " c = " + c + " l = " + l);
	return d3.rgb(d3.hcl(h, c, l));
}

var i =0;
var data3 = [];
for (i=0; i<10; i++) {
	data3.push(i);
}

var legend3_svgDim = {"h": 180, "w": 260}
var legend3_padding = {"top": 35, "bottom": 25, "left": 20, "right": 40};
// Added 60 to add text in svg
d3.select("#colorlegend-3")
	.append("svg")
	.attr("width", legend3_svgDim.w+60)
	.attr("height", legend3_svgDim.h+60)
	.attr("id", "legend3Svg")
	.selectAll("rect")
	.data(data3)
	.enter()
	.append("rect")
	.attr("x", function(d) {
		if (d===0 || d===9) {
			return legend3_padding.left;
		} else if (d===1 || d===8) {
			return legend3_padding.left+((legend3_svgDim.w-legend3_padding.left-legend3_padding.right)/5);
		} else if (d===2 || d===7) {
			return legend3_padding.left+(2*((legend3_svgDim.w-legend3_padding.left-legend3_padding.right)/5));
		} else if (d===3 || d===6) {
			return legend3_padding.left+(3*((legend3_svgDim.w-legend3_padding.left-legend3_padding.right)/5));
		} else if (d===4 || d===5) {
			return legend3_padding.left+(4*((legend3_svgDim.w-legend3_padding.left-legend3_padding.right)/5));
		}
	})
	.attr("y", function(d) {
		if (d < 5) {
			return legend3_padding.top;
		} else if ( d >= 5 ) {
			return legend3_padding.top+(legend3_svgDim.h-legend3_padding.top-legend3_padding.bottom)/2;
		}
	})
	.attr("width" , (legend3_svgDim.w-legend3_padding.left-legend3_padding.right)/5)
	.attr("height", (legend3_svgDim.h-legend3_padding.top-legend3_padding.bottom)/2)
	.attr("fill", fillLegend3)
	.attr("stroke", "black")
	.attr("stroke-width", 1);

// Since -60 is at top, we will need top margin first then bottom margin
var yScale_3 = d3.scaleLinear().domain([-60, -70]).range([legend3_padding.top, (legend3_svgDim.h-legend3_padding.bottom)]);
var yAxis_3 = d3.axisRight()
						.scale(yScale_3)
						.ticks(2);

var xScale_31 = d3.scaleLinear().domain([500, 0]).range([legend3_padding.left, legend3_svgDim.w-legend3_padding.right]);
var xAxis_31 = d3.axisTop()
							.scale(xScale_31)
							.ticks(5);

var xScale_32 = d3.scaleLinear().domain([-500, 0]).range([legend3_padding.left, legend3_svgDim.w-legend3_padding.right]);
var xAxis_32 = d3.axisBottom()
							.scale(xScale_32)
							.ticks(5);

// Select legend1Svg and append axis
// Added 2 to give space between the axis and box
d3.select("#legend3Svg").append("g")
					.attr("class", "axis")
					.attr("transform", "translate ( " + (legend3_svgDim.w-legend3_padding.right+2) + ", 0 )" )
					.call(yAxis_3);

d3.select("#legend3Svg").append("g")
					.attr("class", "axis")
					.attr("transform", "translate ( 0 , " + (legend3_padding.top-2) + " )" )
					.call(xAxis_31);

d3.select("#legend3Svg").append("g")
					.attr("class", "axis")
					.attr("transform", "translate ( 0 , " + (legend3_svgDim.h - legend3_padding.bottom+2) + " )" )
					.call(xAxis_32);

d3.select("#legend3Svg")
	.append("text")
	.attr("x", 260)
	.attr("y", 160)
	.text("Temperature (deg C)")
	.attr("transform", "rotate(-90 260, 160)");

d3.select("#legend3Svg")
	.append("text")
	.attr("x", 70)
	.attr("y", 12)
	.text("Pressure (hPa)")
	.attr("transform", "rotate(0 70, 12)");

d3.select("#legend3Svg")
	.append("text")
	.attr("x", 70)
	.attr("y", 190)
	.text("Pressure (hPa)")
	.attr("transform", "rotate(0 70, 190)");

// Legend 4 - Bivariate + glyph

function fillLegend4(d) {
	var Color5_Green_new = ['#99d8c9','#66c2a4','#41ae76','#238b45','#005824'];
	var TGradient_4 = d3.scaleQuantize().domain([0, 249]).range(Color5_Green_new);
	return TGradient_4(d);
}

d3.select("#colorlegend-4")
	.callReturn(createSvgLegend)
	.attr("id", "legend4Svg")
	.callReturn(createRectLegend)
	.attr("fill", fillLegend4);

// Since -60 is at top, we will need top margin first then bottom margin
var yScale_4 = d3.scaleLinear().domain([-60, -70]).range([padding.top, (lHeight-padding.bottom)]);
var yAxis_4 = d3.axisRight()
						.scale(yScale_4)
						.ticks(5);

d3.select("#legend4Svg").append("g")
					.attr("class", "axis")
					.attr("transform", "translate ( " + (lWidth-padding.right) + ", 0 )" )
					.call(yAxis_4);

d3.select("#legend4Svg")
	.append("text")
	.attr("x", 125)
	.attr("y", 200)
	.text("Temperature (degree C)")
	.attr("transform", "rotate(-90 125, 200)");

var glyphData = [];
for (var i =0; i<10; i++) {
	glyphData.push(i);
}

var yScaleGlyph = d3.scaleLinear().domain([0,9])
										.range([padding.top-10, lHeight-padding.bottom-10])
										//.range([padding.bottom+(Math.ceil((lHeight-padding.top-padding.bottom)/10)), lHeight-padding.top]);

// path and stroke for glyph legend
function glyphDlegend(d) {

	var x1 = padding.left;
	var y1 = yScaleGlyph(d);

	var smallMinus =  "M 3 5 L 7 5 ";	
	var largeMinus =  "M 1 5 L 9 5 ";
	var plus =  "M 1 5 L 9 5 M 5 1 L 5 9";
	var halfStar = "M 1 5 L 9 5 M 5 1 L 5 9 M 9 1 L 1 9";
	var fullStar = "M 1 5 L 9 5 M 5 1 L 5 9 M 9 1 L 1 9 M 1 1 L 9 9";
	console.log("d =", d);

	if(d===4 || d===5){
		console.log("d = ", d, x1, y1)
		return ("M " + (x1+3) + " " + (y1+5) + " L " + (x1+7) + " " + (y1+5)
						);
	} else if (d===3 || d===6){
		console.log("d = ", d, x1, y1)
		return ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5)
						);
	} else if (d===2 || d===7){
		console.log("d = ", d, x1, y1)
		return ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5)
						+ " M " + (x1+5) + " " + (y1+1) + " L " + (x1+5) + " " + (y1+9)
						);
		//return plus;
	} else if (d===1 || d===8){
		console.log("d = ", d, x1, y1)
		return ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5)
						+ " M " + (x1+5) + " " + (y1+1) + " L " + (x1+5) + " " + (y1+9)
						+ " M " + (x1+9) + " " + (y1+1) + " L " + (x1+1) + " " + (y1+9)
						);
	} else if (d===0 || d===9){
		console.log("d = ", d, x1, y1)
		return ("M " + (x1+1) + " " + (y1+5) + " L " + (x1+9) + " " + (y1+5)
						+ " M " + (x1+5) + " " + (y1+1) + " L " + (x1+5) + " " + (y1+9)
						+ " M " + (x1+9) + " " + (y1+1) + " L " + (x1+1) + " " + (y1+9)
						+ " M " + (x1+1) + " " + (y1+1) + " L " + (x1+9) + " " + (y1+9)
						);
	}
}

function strokeGlyphLegend (d) {
	if (d < 5 ) {
		return "black";
	} else if (d >= 5) {
		return "white";
	}
}
//d3.select("#colorlegend-4")
//	.callReturn(createSvgLegend)
//	.attr("id", "legend4SvgGlyph");
//var Color5_Green_new = ['#99d8c9','#66c2a4','#41ae76','#238b45','#005824'];

// Adjust the path in this, also need to create an axis
d3.select("#colorlegend-4")
	.append("svg")
	.attr("id", "legend4SvgGlyph")
	.attr("width", 100)
	.attr("height", 240)
	.style("background-color", "#66c2a4")
	.selectAll("g")
	.data(glyphData)
	.enter()
	.append("g")
	//.attr("transform", function(d) {"translate ( " + 0 + " " +  yScaleGlyph(d) + " )"})
	.append("path")
	.attr("d", glyphDlegend)
	.attr("stroke-width", 1)
	.attr("stroke", strokeGlyphLegend);

// Axis
var yScale_4g = d3.scaleLinear().domain([-500, 500]).range([(lHeight-padding.bottom), (5)]);
var yAxis_4g = d3.axisRight()
						.scale(yScale_4g)
						.ticks(10);

d3.select("#legend4SvgGlyph").append("g")
					.attr("class", "axis")
					.attr("transform", "translate ( " + (70-padding.right+10) + ", " + 0 + " )" )
					.call(yAxis_4g);

d3.select("#legend4SvgGlyph")
	.append("text")
	.attr("x", 90)
	.attr("y", 180)
	.text("Pressure (hPa)")
	.attr("transform", "rotate(-90 90, 180)");
//////////////////////////////////////////////////////////////////////////////

d3.select("#plot1-temperature")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorT1);

d3.select("#plot1-pressure")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorP1);

d3.select("#plot2-bivariate-color")
    .callReturn(createSvg)
    .callReturn(createRects)
    .attr("fill", colorPT);

var bivariateSvg = d3.select("#plot3-bivariate-glyph")
        .callReturn(createSvg);

bivariateSvg
    .callReturn(createRects)
    .attr("fill", colorT2);

bivariateSvg
    .callReturn(createPaths)
    .attr("d", glyphD)
    .attr("stroke", glyphStroke)
    .attr("stroke-width", 1);

