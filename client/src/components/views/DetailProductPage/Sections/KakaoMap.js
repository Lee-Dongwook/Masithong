// 식당 상세 페이지에서 지도를 나타내기 위한 파일

// sdk를 쓰면 props로 가져온 latitude, longitude를 읽지 못함 -> 이것 저것 바꿔가면서 직접 테스트해보셈

/*import React from "react";
import { MapMarker, Map } from "react-kakao-maps-sdk";

function KakaoMap(props) {
    const latitude = props.productInfo.latitude;    // 위도를 가져옴, type은 Number
    const longitude = props.productInfo.longitude;  // 경도를 가져옴, type은 Number
    const title = props.productInfo.title;

    return (
        <Map center={{ lat: {latitude}, lng: {longitude} }} style={{ width: "100%", height: "50%" }}>
            <MapMarker position={{ lat: {latitude}, lng: {longitude} }}>
                <div style={{ color: "#000", fontWeight: "bold", textAlign:"center"}}>{title}</div>
            </MapMarker>
        </Map>
    );
};

export default KakaoMap;*/

// 아래 코드의 문제점
// 아래에 있는 코드 중 const를 let으로 바꾸고 저장, 또는 let을 const로 바꾸고 저장하면 웹 페이지에 일시적으로 지도에 위치가 표시됨
// 하지만 페이지를 새로고침하거나 메인 화면으로 나갔다오면, 지도가 사라지는 문제 발생

import { useEffect } from "react";

function KakaoMap(props) {
  const latitude = props.productInfo.latitude;    // 위도를 가져옴, type은 Number
  const longitude = props.productInfo.longitude;  // 경도를 가져옴, type은 Number
  const title = props.productInfo.title;
  
  useEffect(() => {
    const container = document.getElementById("map");   // 지도를 담을 영역의 DOM 레퍼런스
    const options = {
      center: new window.kakao.maps.LatLng(
        latitude,
        longitude
      ),      // 지도 중심의 좌표
      level: 3,       // 지도의 크기 관련
    };

    const map = new window.kakao.maps.Map(container, options);  // 지도 생성 및 객체 리턴, 윈도우 전역에 카카오 api 객체가 적용되므로 window 사용

    //마커가 표시 될 위치
    let markerPosition = new window.kakao.maps.LatLng(
        latitude,
        longitude,
    );

    // 마커를 생성
    let marker = new window.kakao.maps.Marker({
        position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  }, []);
  
  return <div id="map" style={{ width: "100%", height: "50%", color: "#000", fontWeight: "bold", textAlign:"center"}}></div>;
};

export default KakaoMap;