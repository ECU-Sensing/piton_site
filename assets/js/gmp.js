const mapsKey = "AIzaSyCdi64dltyurMzy_QJWr_kwBGOvZ1-ShK4"
// piton Primary Color
const piton_color = "#9842f5";

// ECU General Information
const ecu_info = {
  name: "East Carolina University", 
  loc: { lat: 35.605124, lng:  -77.365271 },
}

// Implementation Status (0-3)
// 0. Planned
// 1. Planned (Switch to In-progress when color is identified)
// 2. Active
// 3. Archived
const states = [
  {
    text: "Planned",
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    color: "#FED01A",
  },
  {
    text: "Planned",
    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    color: "#0096FD"
  },
  {
    text: "Active",
    icon: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
    color: piton_color,
  },
  {
    text: "Archived",
    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    color: "FD0000",
  }
]

// piton Map Location Dictionary
const piton_map = {
  scitech: { 
    name: "East Carolina University - Science and Technology Bldg",
    loc:  { lat: 35.605124, lng:  -77.365271 },
    coverage_area: 8046.72,
    status: 2,
  },
  brody: {
    name: "East Carolina University - Brody School of Medicine",
    loc: { lat: 35.609626, lng:  -77.402157 },
    coverage_area: 8046.72,
    status: 2,
  },
  seagull: {
    name: "YMCA - Camp Seagull & Camp Seafarer",
    loc:  { lat: 34.994108, lng: -76.854844 },
    coverage_area: 8046.72,
    status: 2,
  },
  mattamuskeet: {
    name: "Lake Mattamuskeet Wildlife Refuge",
    loc:  { lat: 35.451608, lng: -76.176196 },
    coverage_area: 18153.4,
    status: 1,
  },
  csi: {
    name: "East Carolina University - Costal Studies Institute",
    loc:  { lat: 35.873228, lng: -75.661204 },
    coverage_area: 23335.49,
    status: 2,
  },
  dpf: {
    name: "Middle Creek Farm",
    loc:  { lat: 35.474881, lng: -76.016264 },
    coverage_area: 18153.4,
    status: 2,
  },
  wrc: {
    name: "East Carolina University - West Research Campus",
    loc:  { lat: 35.632030, lng: -77.493024 },
    coverage_area: 8046.72,
    status: 1,
  },
  cope1: {
    name: "Greenville Water Treatment",
    loc:  { lat: 35.609643, lng: -77.305522 },
    coverage_area: 8046.72,
    status: 1,
  },
  cope2: {
    name: "Grimesland",
    loc:  { lat: 35.563930, lng: -77.180505 },
    coverage_area: 8046.72,
    status: 1,
  },
  cope3: {
    name: "Goose Creek State Park",
    loc:  { lat: 35.473107, lng: -76.907259 },
    coverage_area: 8046.72,
    status: 1,
  },
  cope4: {
    name: "Washington",
    loc:  { lat: 35.540211574992895, lng: -77.05438510962685},
    coverage_area: 8046.72,
    status: 2,
  },
  cope5: {
    name: "Bath",
    loc:  { lat: 35.428098, lng: -76.740445 },
    coverage_area: 8046.72,
    status: 1,
  },
  cope6: {
    name: "Swan Quarter",
    loc:  { lat: 35.405544, lng: -76.329505},
    coverage_area: 8046.72,
    status: 1,
  },
  mm2: {
    name: "Lake Mattamuskeet",
    loc:  { lat: 35.56449275287248, lng: -76.10432610023427},
    coverage_area:  18153.4,
    status: 1,
  },
  pocosin: {
    name: "Pocosin Lakes National Wildlife Refuge",
    loc: { lat:35.914758, lng: -76.254408},
    coverage_area:  8046.72,
    status: 1,
  },
  morehead: { 
    name: "Morehead City",
    loc: { lat:34.72079924924847,lng:-76.69487818124077},
    coverage_area:   23335.49,
    status: 1,
  }

};

function placeMarkerAndPanTo(latLng, map) {
  // Default InfoWindow for each Marker
  var info = new google.maps.InfoWindow({
    content: "Location:" + latLng,
    disableAutoPan: true,
  });
 
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
  });

  map.panTo(latLng);
  info.open(map, marker );
}


// Initialize and add the map
function initMap() {

  // Map Definition
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 9,
    center: {lat: 35.495815, lng:-76.449726 },
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: true,
  });

  // Default InfoWindow for each Marker
  const infoWindow = new google.maps.InfoWindow({
    content: "",
    disableAutoPan: true,
  });

  // Marker Array for Batch control
  var markers = [];

  // Marker creation for entire dictionary
  for (let point in piton_map) {
    
    // Define Marker
    const marker = new google.maps.Marker({
        position: piton_map[point].loc,
        icon: states[piton_map[point].status].icon,
        map: map,
    });
    
    // Define Mouseover Event
    marker.addListener("mouseover", () =>{
      const content =  '<strong><u>' + piton_map[point].name + '</strong></u>' + '<br>Status: '+ states[piton_map[point].status].text + '<br>Latitude: ' + piton_map[point].loc.lat + '<br>Longitude: ' + piton_map[point].loc.lng ;
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      window.setTimeout(function() {infoWindow.close(map, marker);},10000);
    });

    // Define Click Event
    marker.addListener('click',function() {
      var pos = map.getZoom();
      map.setZoom(12);
      map.setCenter(marker.getPosition());
      window.setTimeout(function() {map.setZoom(pos);},10000);
    });

    // Define Coverage Circle
    const coverage_circle = new google.maps.Circle({
        strokeColor: states[piton_map[point].status].color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: states[piton_map[point].status].color,
        fillOpacity: 0.15,
        map,
        center: piton_map[point].loc,
        radius: piton_map[point].coverage_area
    });

    coverage_circle.addListener("mouseover", () =>{
      const content =  '<strong><u>' + piton_map[point].name + '</strong></u>' + '<br>Status: '+ states[piton_map[point].status].text + '<br>Latitude: ' + piton_map[point].loc.lat + '<br>Longitude: ' + piton_map[point].loc.lng ;
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      window.setTimeout(function() {infoWindow.close(map, marker);},10000);
    });

    // Define Click Event
    coverage_circle.addListener('click',function() {
      var pos = map.getZoom();
      map.setZoom(12);
      map.setCenter(marker.getPosition());
      window.setTimeout(function() {map.setZoom(pos);},10000);
    });

    // Add Marker to Markers array
    markers.push(marker);
  };
  
  // Batch Marker manager
  new MarkerClusterer({markers,map})
}


// Display Map
window.initMap = initMap;