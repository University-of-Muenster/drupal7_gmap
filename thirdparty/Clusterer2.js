//eher für kleine Arrays / Objects
//gibt Datenstruktur aus
	function print_r1(theObj){
	   if(theObj.constructor == Array || theObj.constructor == Object){
		  document.write("<ul>")
		  for(var p in theObj){
			 if(theObj[p].constructor == Array || theObj[p].constructor == Object){
				document.write("<li>["+p+"] => "+typeof(theObj)+"</li>");
				document.write("<ul>")
				print_r1(theObj[p]);
				document.write("</ul>")
			 } else {
				document.write("<li>["+p+"] => "+theObj[p]+"</li>");
			 }
		  }
		  document.write("</ul>")
	   }
	}	

//für große Arrays / Objects
//gibt Datenstruktur aus
function print_r( array, return_val ) {
    // http://kevin.vanzonneveld.net
    // + original by: Michael White (http://crestidg.com)
    // + improved by: Ben Bryan
    // * example 1: print_r(1, true);
    // * returns 1: 1
    
    var output = "", pad_char = " ", pad_val = 4;
 
    var formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
            cur_depth++;
        }
 
        var base_pad = repeat_char(pad_val*cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val*(cur_depth+1), pad_char);
        var str = "";
 
        if (obj instanceof Array || obj instanceof Object) {
            str += "Array\n" + base_pad + "(\n";
            for (var key in obj) {
                if (obj[key] instanceof Array) {
                    str += thick_pad + "["+key+"] => "+formatArray(obj[key], cur_depth+1, pad_val, pad_char);
                } else {
                    str += thick_pad + "["+key+"] => " + obj[key] + "\n";
                }
            }
            str += base_pad + ")\n";
        } else if(obj == null || obj == undefined) {
            str = '';
        } else {
            str = obj.toString();
        }
 
        return str;
    };
 
    var repeat_char = function (len, pad_char) {
        var str = "";
        for(var i=0; i < len; i++) { 
            str += pad_char; 
        };
        return str;
    };
    output = formatArray(array, 0, pad_val, pad_char);
 
    if (return_val !== true) {
        document.write("<pre>" + output + "</pre>");
        return true;
    } else {
        return output;
    }
}


/**
 * Überprüft ob ein String in einem Array vorhanden ist
 * 
 * @param arr - Array
 * @param str - String
 * @return BOOLEAN
 */
function mycontains(arr, str){
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == str) {
			return true;
		}
	}
	return false;
}

// Clusterer.js - marker clustering routines for Google Maps apps
//
// Using these routines is very easy.
//
// 1) Load the routines into your code:
//
// <script src="http://www.acme.com/javascript/Clusterer.js"
// type="text/javascript"></script>
//
// 2) Create a Clusterer object, passing it your map object:
//
// var clusterer = new Clusterer( map );
//
// 3) Wherever you now do map.addOverlay( marker ), instead call
// clusterer.AddMarker( marker, title ). The title is just a
// short descriptive string to use in the cluster info-boxes.
//
// 4) If you are doing any map.removeOverlay( marker ) calls, change those
// to clusterer.RemoveMarker( marker ).
//
// That's it! Everything else happens automatically.
//
//
// The current version of this code is always available at:
// http://www.acme.com/javascript/
//
//
// Copyright © 2005,2006 by Jef Poskanzer <jef@mail.acme.com>.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
// 1. Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
// notice, this list of conditions and the following disclaimer in the
// documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
// OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
// HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
// OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
// SUCH DAMAGE.
//
// For commentary on this license please see http://www.acme.com/license.html

// Constructor.
Clusterer = function(map) {
	this.map = map;
	this.markers = [];
	this.clusters = [];
	this.timeout = null;
	this.currentZoomLevel = map.getZoom();

	this.maxVisibleMarkers = Clusterer.defaultMaxVisibleMarkers;
	this.gridSize = Clusterer.defaultGridSize;
	this.minMarkersPerCluster = Clusterer.defaultMinMarkersPerCluster;
	this.maxLinesPerInfoBox = Clusterer.defaultMaxLinesPerInfoBox;
	this.icon = Clusterer.defaultIcon;

	GEvent.addListener(map, 'zoomend', Clusterer.MakeCaller(Clusterer.Display,
			this));
	GEvent.addListener(map, 'moveend', Clusterer.MakeCaller(Clusterer.Display,
			this));
	GEvent.addListener(map, 'infowindowclose', Clusterer.MakeCaller(
			Clusterer.PopDown, this));
};

Clusterer.defaultMaxVisibleMarkers = 150;
Clusterer.defaultGridSize = 5;
Clusterer.defaultMinMarkersPerCluster = 5;
Clusterer.defaultMaxLinesPerInfoBox = 10;

Clusterer.defaultIcon = new GIcon();
// ### Lokale Bilder verwenden
Clusterer.defaultIcon.image = 'http://www.acme.com/resources/images/markers/blue_large.PNG';
Clusterer.defaultIcon.shadow = 'http://www.acme.com/resources/images/markers/shadow_large.PNG';
Clusterer.defaultIcon.iconSize = new GSize(30, 51);
Clusterer.defaultIcon.shadowSize = new GSize(56, 51);
Clusterer.defaultIcon.iconAnchor = new GPoint(13, 34);
Clusterer.defaultIcon.infoWindowAnchor = new GPoint(13, 3);
Clusterer.defaultIcon.infoShadowAnchor = new GPoint(27, 37);


//### YRP - Neu:
Clusterer.maxCluster = 1;
Clusterer.maxIconSize = 30;

// Call this to change the cluster icon.
Clusterer.prototype.SetIcon = function(icon) {
	this.icon = icon;
};

// Changes the maximum number of visible markers before clustering kicks in.
Clusterer.prototype.SetMaxVisibleMarkers = function(n) {
	this.maxVisibleMarkers = n;
};

// Sets the minumum number of markers for a cluster.
Clusterer.prototype.SetMinMarkersPerCluster = function(n) {
	this.minMarkersPerCluster = n;
};

// Sets the maximum number of lines in an info box.
Clusterer.prototype.SetMaxLinesPerInfoBox = function(n) {
	this.maxLinesPerInfoBox = n;
};

// ### YRP - Neu: 2. Parametername umbenannt
Clusterer.prototype.AddMarker = function(marker, yrp) {	
	// Clusterer.prototype.AddMarker = function(marker, title) {
														
	if (marker.setMap != null)
		marker.setMap(this.map);

	// ### YRP - Neu: Parameter angepasst
	marker.yrp = yrp; 
		// marker.title = title;
	
	marker.onMap = false;
	this.markers.push(marker);
	this.DisplayLater();
};

// Call this to remove a marker.
Clusterer.prototype.RemoveMarker = function(marker) {
	for ( var i = 0; i < this.markers.length; ++i)
		if (this.markers[i] == marker) {
			if (marker.onMap)
				this.map.removeOverlay(marker);
			for ( var j = 0; j < this.clusters.length; ++j) {
				var cluster = this.clusters[j];
				if (cluster != null) {
					for ( var k = 0; k < cluster.markers.length; ++k)
						if (cluster.markers[k] == marker) {
							cluster.markers[k] = null;
							--cluster.markerCount;
							break;
						}
					if (cluster.markerCount == 0) {
						this.ClearCluster(cluster);
						this.clusters[j] = null;
					} else if (cluster == this.poppedUpCluster)
						Clusterer.RePop(this);
				}
			}
			this.markers[i] = null;
			break;
		}
	this.DisplayLater();
};

Clusterer.prototype.DisplayLater = function() {
	if (this.timeout != null)
		clearTimeout(this.timeout);
	this.timeout = setTimeout(Clusterer.MakeCaller(Clusterer.Display, this), 50);
};

Clusterer.Display = function(clusterer) {
	var i, j, marker, cluster;
	
	clearTimeout(clusterer.timeout);

	var newZoomLevel = clusterer.map.getZoom();
	if (newZoomLevel != clusterer.currentZoomLevel) {
		// When the zoom level changes, we have to remove all the clusters.
		for (i = 0; i < clusterer.clusters.length; ++i)
			if (clusterer.clusters[i] != null) {
				clusterer.ClearCluster(clusterer.clusters[i]);
				clusterer.clusters[i] = null;
			}
		clusterer.clusters.length = 0;
		clusterer.currentZoomLevel = newZoomLevel;
	}

	// Get the current bounds of the visible area.
	var bounds = clusterer.map.getBounds();

	// Expand the bounds a little, so things look smoother when scrolling
	// by small amounts.
	// es handelt sich hier um die Mapbounds und nicht um die Clusterbounds
	var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast();
	var dx = ne.lng() - sw.lng();
	var dy = ne.lat() - sw.lat();
	if (dx < 300 && dy < 150) {
		dx *= 0.10;
		dy *= 0.10;
		bounds = new GLatLngBounds(new GLatLng(sw.lat() - dy, sw.lng() - dx),
				new GLatLng(ne.lat() + dy, ne.lng() + dx));
	}

	// Partition the markers into visible and non-visible lists.
	var visibleMarkers = [];
	var nonvisibleMarkers = [];
	for (i = 0; i < clusterer.markers.length; ++i) {
		marker = clusterer.markers[i];
		if (marker != null)
			if (bounds.contains(marker.getPoint()))
				visibleMarkers.push(marker);
			else
				nonvisibleMarkers.push(marker);
	}

	// Take down the non-visible markers.
	for (i = 0; i < nonvisibleMarkers.length; ++i) {
		marker = nonvisibleMarkers[i];
		if (marker.onMap) {
			clusterer.map.removeOverlay(marker);
			marker.onMap = false;
		}
	}

	// Take down the non-visible clusters.
	for (i = 0; i < clusterer.clusters.length; ++i) {
		cluster = clusterer.clusters[i];
		if (cluster != null && !bounds.contains(cluster.marker.getPoint())
				&& cluster.onMap) {
			clusterer.map.removeOverlay(cluster.marker);
			cluster.onMap = false;
	}
	}

	// Clustering! This is some complicated stuff. We have three goals
	// here. One, limit the number of markers & clusters displayed, so the
	// maps code doesn't slow to a crawl. Two, when possible keep existing
	// clusters instead of replacing them with new ones, so that the app pans
	// better. And three, of course, be CPU and memory efficient.

		// Put all the unclustered visible markers into a cluster - the first
		// one it fits in, which favors pre-existing clusters.
		// ### Wenn keine Cluster vorhanden, neues erstellen. -> Alle Marker am
		// ende in einem Cluster
		for (i = 0; i < visibleMarkers.length; ++i) {
			marker = visibleMarkers[i];
			if (marker != null && !marker.inCluster) {
				// Suche, ob bereits Cluster vorhanden
				for (j = 0; j < clusterer.clusters.length; ++j) {
					cluster = clusterer.clusters[j];
					
					// ### YRP - Neu: Clusterzugehörigkeit überprüfen
					if (cluster != null && (cluster.LatLng.equals( marker.getPoint()))) { 
						cluster.markers.push(marker);
						// zählt die Anzahl Marker, die sich in einem Cluster befinden
						++cluster.markerCount;
						if (Clusterer.maxCluster<cluster.markerCount){
							++Clusterer.maxCluster;
						}
						marker.inCluster = true;
					}
				}
				
				// YRP - Neu hinzugefügt
				if (marker.inCluster != true){
					// ### Neues Cluster erstellen
					cluster = new Object();
					cluster.clusterer = clusterer;
					// ### Neu: Clusterkoordinaten
					cluster.LatLng = marker.getPoint();
					cluster.markers = [];
					cluster.markerCount = 1;
					cluster.onMap = false;
					cluster.marker = null;
					cluster.markers.push(marker); // Marker in Cluster
				
					clusterer.clusters.push(cluster); // Cluster in
														// Clusterliste
					marker.inCluster = true;
				}
			}
		}		
		
		// Überprüfen ob die Länge (length-Variable) der Clusterliste noch
		// stimmt
		for (i = clusterer.clusters.length - 1; i >= 0; --i)
			if (clusterer.clusters[i] != null)
				break;
			else
				--clusterer.clusters.length;

		// Ok, we have our clusters. Go through the markers in each
		// cluster and remove them from the map if they are currently up.
		for (i = 0; i < clusterer.clusters.length; ++i) {
			cluster = clusterer.clusters[i];
			if (cluster != null) {
				// geht durch alle Marker des i-ten Clusters der Clusterlist
				// (=clusters) und
				// entfernt die Marker von der Map (remove Overlay)
				for (j = 0; j < cluster.markers.length; ++j) {
					marker = cluster.markers[j];
					if (marker != null && marker.onMap) {
						clusterer.map.removeOverlay(marker);
						marker.onMap = false;
					}
				}

// ### YRP - Neu: Markerdaten auf Cluster mergen
				
				cluster.data = new Array(); // enthält die finalen Daten des Clusters mit allen Informationen
				cluster.fieldtitles = cluster.markers[0].yrp.fieldtitles;
				// Gerenderte Felder durchgehen
				for ( var blub in marker.yrp.data ){   
					// Prüfe ob Feld ausgegeben werden soll
					if (marker.yrp.fieldtitles[blub].exclude == 0){
						var yrptemp = new Array(); // Array zum Zwischenspeichern der Werte der einzelnen Felder
						// Marker für das jeweilige Feld durchiterieren
						for (var tuff = 0; tuff < cluster.markers.length; ++tuff) {
							marker = cluster.markers[tuff];
							if (marker != null){
								// Wenn Wert noch nicht vorhanden -> hinzufügen
								if (!mycontains(yrptemp, marker.yrp.data[blub])){
									yrptemp.push(marker.yrp.data[blub]); 
								}	
							}	
						}
						cluster.data[blub] = yrptemp;				
					} // Ende der if-Abfrage
				}// Ende der for-Schleife "gerenderte Felder durchgehen"
			}
		}
		
		// Füge zu jedem Cluster, was noch keinen Marker hat, einen Marker hinzu
		for (blub = 0; blub < clusterer.clusters.length; ++blub) {
			cluster = clusterer.clusters[blub];
			if (cluster != null  && cluster.marker == null) {
				
				cluster.icon = new GIcon();
				for (var k=1; k<=10; ++k){
					
					if (window.document.URL.indexOf('user') != '-1' || window.document.URL.indexOf('node') != '-1'){
						cluster.icon = Clusterer.defaultIcon;
					}
					else if (cluster.markerCount <= (Clusterer.maxCluster*0.1*k) ){
						cluster.icon.image = Drupal.settings.basePath+'sites/all/modules/gmap/thirdparty/img/m'+k+'.png';

						cluster.icon.iconSize = new GSize(Clusterer.maxIconSize-(13-k*1.3), Clusterer.maxIconSize-(13-k*1.3));
						
						//### kein Schatten nötig
						//cluster.icon.shadow = 'http://www.acme.com/resources/images/markers/shadow_large.PNG';
						//cluster.icon.shadowSize = new GSize(56, 51);
						//cluster.icon.infoShadowAnchor = new GPoint(27, 37);
						
						if (clusterer.map.getZoom()>12){var schiebung = (clusterer.map.getZoom()/19); }
						else if (clusterer.map.getZoom()>9){var schiebung = (clusterer.map.getZoom()*1.5/19); }
						else if (clusterer.map.getZoom()>4){var schiebung = (clusterer.map.getZoom()*1.9/19); }
						else {var schiebung = (clusterer.map.getZoom()*5/19); }
							
						cluster.icon.iconAnchor = new GPoint( schiebung * (clusterer.icon.iconSize.width/2) ,  schiebung * ( cluster.icon.iconSize.height/2));   // lin
						
						cluster.icon.infoWindowAnchor = new GPoint(13, 3);

						
						break;	
					}
				}
				
				marker = new GMarker(cluster.LatLng, {
					icon : cluster.icon // Hier Map-Icon je nach Markeranzahl im Cluster ('cluster.markerCount')
				});				
				cluster.marker = marker;   // dem Cluster den Marker zuweisen
				
				// damit wenn man auf den Marker klickt, die Sprechblase mit
				// Informationen erscheint
				// Sprechblase wird bei der  Karte in den Organisationen (bzw. allen 'nodes') deaktiviert
				if(window.document.URL.indexOf('node') == '-1')
					GEvent.addListener(marker, 'click', Clusterer.MakeCaller(Clusterer.PopUp, cluster));
			}
		}
		
	// Display the visible clusters not already up.
	// Zeige die theoretisch sichtbaren Cluster des aktuellen Kartenausschnitts
	// auf der Map an / füge sie zur Map hinzu (addOverlay)
	for (blub = 0; blub < clusterer.clusters.length; ++blub) {
		cluster = clusterer.clusters[blub];
		if (cluster != null && !cluster.onMap && bounds.contains(cluster.marker.getPoint())) {
			clusterer.map.addOverlay(cluster.marker);
			cluster.onMap = true;
		}
	}
	
	// In case a cluster is currently popped-up, re-pop to get any new
	// markers into the infobox.
	Clusterer.RePop(clusterer);
};

// PopUp Fenster, wenn man auf nen Marker klickt
// Original Popup-Funktion finden
Clusterer.PopUp = function(cluster) {
	var test = document;
	var clusterer = cluster.clusterer;
	// in cluster.data stehen die Arrays drin mit allen Infos
	var html = '<table width="300">';
	var n = 0;
	/*
	 * html += '<img src="' + marker.getIcon().image + '" width="' +
	 * (marker.getIcon().iconSize.width / 2) + '" height="' +
	 * (marker.getIcon().iconSize.height / 2) + '">';
	 */
// #################################################
	
	/*var pathArray = location.href.split("/");
	var site = pathArray[pathArray.length - 1];*/
	var site = location.href;
	if(site.search('googlemap') > -1){	
		for ( var temp in cluster.data ){
			html += '<tr><td>';
			// Titel:
			html += cluster.fieldtitles[temp].label+':';
			// html += '</td><td>';
			html += '<ul>';
			// Werte
			var counter = 0;			
			for ( var temp1 in cluster.data[temp] ){
				if(counter < 6){
					html += '<li>'+cluster.data[temp][temp1]+'</li>';
					counter++;
				}
				else{
					var titleArr = cluster.data['title'][0].split(">");
					var title = "<strong>Mehr...</strong>"; 
									
					var link = titleArr[0]+" title=\""+title+"\">"+title+"</a>";
					html += '<li>'+link+'</li>';
					html += '</ul></td></tr>';
					break;
				}
			}
			html += '</ul></td></tr>';
			
		}
	}
	else if(document.title.search('home') > -1){
		html += '<tr><td>';
			// Titel:
			html += cluster.fieldtitles.title.label+':';
			// html += '</td><td>';
			html += '<ul>';
			var titleArr = cluster.data['title'][0].split(">");
			var title = titleArr[1].substring(0,titleArr[1].length-3); 
			if(title.length > 23)					
				var link = titleArr[0]+" title=\""+title+"\">"+title.substring(0,23)+"..."+"</a>";
			else 	
				var link = titleArr[0]+" title=\""+title+"\">"+title+"</a>";
			html += '<li>'+link+'</li>';
			
			html += '</ul></td></tr>';
		
		/*for ( var temp in cluster.data ){
			html += '<tr><td>';
			// Titel:
			html += cluster.fieldtitles[temp].label+':';
			// html += '</td><td>';
			html += '<ul>';
			// Werte
			var counter = 0;
			for ( var temp1 in cluster.data[temp] ){
				if(counter < 2){
					var titleArr = cluster.data[temp][temp1].split(">");
					var title = titleArr[1].substring(0,titleArr[1].length-3); 
					if(title.length > 23){					
						var link = titleArr[0]+" title=\""+title+"\">"+title.substring(0,23)+"..."+"</a>";
						html += '<li>'+link+'</li>';
					}
					else{
						html += '<li>'+cluster.data[temp][temp1]+'</li>';
					}		
					
					counter++;
				}
				else{
					var titleArr = cluster.data['title'][0].split(">");
					var title = "<strong>Mehr...</strong>"; 
									
					var link = titleArr[0]+" title=\""+title+"\">"+title+"</a>";
					html += '<li>'+link+'</li>';
					html += '</ul></td></tr>';
					break;
					
					//html += '<li>'+cluster.data[temp][0]+'</li>';
				}
			}
			html += '</ul></td></tr>';*/		
		
	}
	else if(site.search('map') > -1){
		for ( var temp in cluster.data ){
			html += '<tr><td>';
			// Titel:
			html += cluster.fieldtitles[temp].label+':';
			// html += '</td><td>';
			html += '<ul>';
			// Werte
			for ( var temp1 in cluster.data[temp] ){
				html += '<li>'+cluster.data[temp][temp1]+'</li>';
			}
			html += '</ul></td></tr>';
			
		}
		
	
	}
		
// #################################################
	/*
	 * for (var i = 0; i < cluster.markers.length; ++i) { var marker =
	 * cluster.markers[i]; if (marker != null) { ++n; html += '<tr><td>'; if
	 * (marker.getIcon().smallImage != null) html += '<img src="' +
	 * marker.getIcon().smallImage + '">'; else html += '<img src="' +
	 * marker.getIcon().image + '" width="' + (marker.getIcon().iconSize.width /
	 * 2) + '" height="' + (marker.getIcon().iconSize.height / 2) + '">'; //html += '</td><td>' +
	 * cluster.data.title + '</td></tr>'; //html += '</td><td>' +
	 * marker.title + '</td></tr>';
	 * 
	 * html += '</td><td>fester Wert Titel</td></tr>'; if (n ==
	 * clusterer.maxLinesPerInfoBox - 1 && cluster.markerCount >
	 * clusterer.maxLinesPerInfoBox) { html += '<tr><td colspan="2">...and ' +
	 * (cluster.markerCount - n) + ' more</td></tr>'; break; } } }
	 */
	html += '</table>';
	clusterer.map.closeInfoWindow();
	cluster.marker.openInfoWindowHtml(html);
	clusterer.poppedUpCluster = cluster;
};

Clusterer.RePop = function(clusterer) {
	if (clusterer.poppedUpCluster != null)
		Clusterer.PopUp(clusterer.poppedUpCluster);
};

Clusterer.PopDown = function(clusterer) {
	clusterer.poppedUpCluster = null;
};

Clusterer.prototype.ClearCluster = function(cluster) {
	var i, marker;

	for (i = 0; i < cluster.markers.length; ++i)
		if (cluster.markers[i] != null) {
			cluster.markers[i].inCluster = false;
			cluster.markers[i] = null;
		}
	cluster.markers.length = 0;
	cluster.markerCount = 0;
	if (cluster == this.poppedUpCluster)
		this.map.closeInfoWindow();
	if (cluster.onMap) {
		this.map.removeOverlay(cluster.marker);
		cluster.onMap = false;
	}
};

// This returns a function closure that calls the given routine with the
// specified arg.
Clusterer.MakeCaller = function(func, arg) {
	return function() {
		func(arg);
	};
};

// Augment GMarker so it handles markers that have been created but
// not yet addOverlayed.

GMarker.prototype.setMap = function(map) {
	this.map = map;
};

GMarker.prototype.addedToMap = function() {
	this.map = null;
};

GMarker.prototype.origOpenInfoWindow = GMarker.prototype.openInfoWindow;
GMarker.prototype.openInfoWindow = function(node, opts) {
	if (this.map != null)
		return this.map.openInfoWindow(this.getPoint(), node, opts);
	else
		return this.origOpenInfoWindow(node, opts);
};

GMarker.prototype.origOpenInfoWindowHtml = GMarker.prototype.openInfoWindowHtml;
GMarker.prototype.openInfoWindowHtml = function(html, opts) {
	if (this.map != null)
		return this.map.openInfoWindowHtml(this.getPoint(), html, opts);
	else
		return this.origOpenInfoWindowHtml(html, opts);
};

GMarker.prototype.origOpenInfoWindowTabs = GMarker.prototype.openInfoWindowTabs;
GMarker.prototype.openInfoWindowTabs = function(tabNodes, opts) {
	if (this.map != null)
		return this.map.openInfoWindowTabs(this.getPoint(), tabNodes, opts);
	else
		return this.origOpenInfoWindowTabs(tabNodes, opts);
};

GMarker.prototype.origOpenInfoWindowTabsHtml = GMarker.prototype.openInfoWindowTabsHtml;
GMarker.prototype.openInfoWindowTabsHtml = function(tabHtmls, opts) {
	if (this.map != null)
		return this.map.openInfoWindowTabsHtml(this.getPoint(), tabHtmls, opts);
	else
		return this.origOpenInfoWindowTabsHtml(tabHtmls, opts);
};

GMarker.prototype.origShowMapBlowup = GMarker.prototype.showMapBlowup;
GMarker.prototype.showMapBlowup = function(opts) {
	if (this.map != null)
		return this.map.showMapBlowup(this.getPoint(), opts);
	else
		return this.origShowMapBlowup(opts);
};