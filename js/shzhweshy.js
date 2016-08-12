var map = new BMap.Map("allmap");
	var point = new BMap.Point(120.231857,30.222883);
	map.centerAndZoom(point, 15);
	var marker = new BMap.Marker(point);  // 创建标注
	map.addOverlay(marker); 
	var myGeo = new BMap.Geocoder(); 
	myGeo.getLocation(point, function(result){ 
	if (result){ 
		console.log(result);
	   var label = new BMap.Label("西兴·缤纷社区卫生服务站",{offset:new BMap.Size(20,0)});
	   label.setStyle({
	   	    "width":"80px",
	   	    "height":"50px",
	   	    "white-space":"normal",
	   	    "overflow":"hidden",
	        "borderColor": "none",
	        "color": "#F07A7C",
	        "cursor": "pointer",
	         "border":"none",
	        "background":"none"
	      });
		marker.setLabel(label);
	  } 
	});             // 将标注添加到地图中

   map.setMapStyle({
	  styleJson:[{
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "arterial",
                    "elementType": "labels.text.fill",
                    "stylers": {
                              "color": "#000000",
                              "hue": "#000000",
                              "weight": "0.1",
                              "lightness": -64,
                              "saturation": -100,
                              "visibility": "on"
                    }
          },
          {
                    "featureType": "green",
                    "elementType": "all",
                    "stylers": {
                              "color": "#b0d9f5"
                    }
          },
          {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": {
                              "color": "#b0d9f5"
                    }
          },
          {
                    "featureType": "local",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "color": "#f9d7b0",
                              "weight": "2"
                    }
          },
          {
                    "featureType": "land",
                    "elementType": "all",
                    "stylers": {
                              "color": "#faf7f2"
                    }
          },
          {
                    "featureType": "manmade",
                    "elementType": "all",
                    "stylers": {
                              "color": "#faf7f2"
                    }
          },
          {
                    "featureType": "local",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#fbfada",
                              "weight": "2.5",
                              "saturation": 33
                    }
          },
          {
                    "featureType": "arterial",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#f9fbdb"
                    }
          },
          {
                    "featureType": "arterial",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "color": "#fae2c1"
                    }
          }]
   });
