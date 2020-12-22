var markers = [];
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(35.3666091,127.505225), // 지도의 중심좌표
        level: 13 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

var infowindow = new kakao.maps.InfoWindow({
    zIndex:1,
    removable : true
});

// 마커를 생성하고 지도 위에 마커를 표시하는 함수
function addMarker(position, idx) {
    var imageSrc = "https://github.com/wowx1001/comstation/blob/master/static/img/1.png?raw=true", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(15, 15),  // 마커 이미지의 크기
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

function tw_addMarker(position) {
    var imageSrc = "https://github.com/wowx1001/comstation/blob/master/static/img/Transmission tower.png?raw=true", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(30, 30),  // 마커 이미지의 크기
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage 
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 조회된 데이터의 인포윈도우 창 추가
function displayInfowindow(marker,type, field_strength, freq, bigo) {
    var content = '<div style="font-size:11px; padding:15px;"><div>'+(type?(' 구분 : '+type):"")+'</div>'
    +'<div>'+(freq?(" 주파수 : "+freq):"")+'</div>'+
    '<div>'+(field_strength?(' 전계강도 : '+field_strength+' dB㎶/m'):"")+'</div>'+
    '<div>'+(bigo?(' 비고 : '+bigo):"")+'</div></div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
  }

function removeMarker(markers) {
    for ( var i = 0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }   
    markers = [];
}

function draw_marker(data){
    infowindow.close();
    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker(markers);
    
    for ( var i=0; i<Object.keys(data['번호']).length; i++ ) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(parseFloat(data['위도'][i]), parseFloat(data['경도'][i])),
        marker = addMarker(placePosition, data['구분'][i]);
        type = data['구분'][i];
        f_s = data['전계강도(dB㎶/m)'][i];
        freq = data['주파수'][i];
        bg = data['비고'][i];
        (function(marker, type, f_s, freq,bg) {
            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.close();
                displayInfowindow(marker,type, f_s, freq,bg);
            });

        })(marker, type, f_s, freq, bg);
    }
}
  
function all_region_marker(data){
    
    for ( var i=0; i<Object.keys(data['구분']).length; i++ ) {
        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(parseFloat(data['위도'][i]), parseFloat(data['경도'][i])),
        marker = tw_addMarker(placePosition);
        type = data['구분'][i];
        (function(marker, type) {
            kakao.maps.event.addListener(marker, 'click', function() {
                infowindow.close();
                displayInfowindow(marker,type);
            });

        })(marker, type);
    }
}
$.ajax({
    type: 'POST',
    url: '/req',
    contentType: "application/json",
    success: function(data){
        draw_marker(data);
    },
    error: function(){
        alert('ajax 통신 실패');
    }
})
$.ajax({
type: 'POST',
url: '/tw',
contentType: "application/json",
success: function(data){
    all_region_marker(data);
},
error: function(){
    alert('ajax 통신 실패');
}
})
