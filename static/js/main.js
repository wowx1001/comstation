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
var markers = [];
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(36.2998973,127.4788872), // 지도의 중심좌표
        level: 12 // 지도의 확대 레벨
    };

// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

var infowindow = new kakao.maps.InfoWindow({
    zIndex:1,
    removable : true
});

var index_name = ['type','field_strength','bigo'];

// 마커를 생성하고 지도 위에 마커를 표시하는 함수
function addMarker(position, idx) {
    var imageSrc = "{{url_for('static', filename='img/1.png')}}", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(35, 35),  // 마커 이미지의 크기
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
function displayInfowindow(marker,loc,type,field_strength,bigo) {
    var content = '<div style="width:230px;"><div>'+(type?(' 유형 : '+type):"")+'</div>'+
    '<div>'+(loc?(' 위치 : '+loc):"")+'</div>'+
    '<div>'+(field_strength?(' 전계강도 : '+field_strength):"")+'</div>'+
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
    
    for ( var i=0; i<Object.keys(data).length; i++ ) {
        for (var j=0;j<(Object.keys(data[i]['lat']).length);j++){
            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(parseFloat(data[i]['lat'][j]), parseFloat(data[i]['lng'][j])),
            marker = addMarker(placePosition, i);
            
            err_array = [];
            
            for (a in index_name){
                try{
                    err_array.push(data[i][index_name[a]][j]);               
                }catch(e){
                    err_array.push("");  
                }
            }

            loc = data[i]['location'][j];
            type = err_array[0];
            f_s = err_array[1];
            bg = err_array[2];

            (function(marker, loc, type, f_s, bg) {
                kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.close();
                    displayInfowindow(marker,loc, type, f_s, bg);
                });
    
            })(marker, loc, type, f_s, bg);
        }
    }
}
  