//@ts-nocheck
"use client";

import { useEffect, useState } from "react";

// ✅ 체인점 좌표 데이터
const branchLocations = [
  {
    title: "황금단 청담점",
    lat: 37.518642572675915,
    lng: 127.04098821581638,
    address: "서울시 강남구 선릉로134번길6. 1층",
  },
  {
    title: "황금단 강릉점",
    lat: 37.7557,
    lng: 128.8962,
    address: "강원도 강릉시 사임당로 40",
  },
  {
    title: "황금단 광주 수완점",
    lat: 35.191,
    lng: 126.847,
    address: "광주광역시 광산구 장신로 85(장덕동) 수영빌딩 204호",
  },
  {
    title: "황금단 서귀포점",
    lat: 33.254,
    lng: 126.56,
    address: "제주특별자치도 서귀포시 태평로431번길 32 2층",
  },
  {
    title: "황금단 진주점",
    lat: 35.1798,
    lng: 128.1076,
    address: "경남 진주시 계동 141번지",
  },
  {
    title: "황금단 통영점",
    lat: 34.8544,
    lng: 128.433,
    address: "경남 통영시 광도면 죽림리 1567-2 해피데이웨딩홀 1층 102호",
  },
  {
    title: "황금단 부산동래점",
    lat: 35.2043,
    lng: 129.0794,
    address: "부산광역시 동래구 안락1동 436-68번지",
  },
  {
    title: "황금단 동해점",
    lat: 37.5245,
    lng: 129.1143,
    address: "강원도 동해시 천곡동 1058-22",
  },
  {
    title: "황금단 제주점",
    lat: 33.4996,
    lng: 126.5312,
    address: "제주특별자치도 제주시 도남동 384-4번지",
  },
  {
    title: "황금단 김해점",
    lat: 35.2342,
    lng: 128.8729,
    address: "경남 김해시 내동 161-6",
  },
  {
    title: "황금단 진주잔칫날",
    lat: 35.1756,
    lng: 128.107,
    address: "경상남도 진주시 칠암동 381-3 번지",
  },
  {
    title: "황금단 순천점(좋은날에)",
    lat: 34.9505,
    lng: 127.4875,
    address: "전라남도 순천시 조례동 1313번지 1층",
  },
  {
    title: "황금단 종로점",
    lat: 37.5704,
    lng: 126.9997,
    address: "서울시 종로구 창경궁로12길 46(한국비단1~2호)",
  },
  {
    title: "황금단 본사",
    lat: 37.3982,
    lng: 126.9629,
    address: "경기도 안양시 시민대로327번길11-41. 909호",
  },
];

export default function KakaoMap() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      console.log("✅ 카카오맵 API 이미 로드됨");
      initMap();
      return;
    }

    // ✅ 카카오맵 API 동적 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=ca518017409706292134d8cefc06c3fd&autoload=false`;
    script.async = true;
    script.onload = () => {
      console.log("✅ 카카오맵 스크립트 로드 완료");
      window.kakao.maps.load(() => initMap());
    };

    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    const container = document.getElementById("kakao-map");

    if (!container) {
      console.error("❌ 지도 컨테이너를 찾을 수 없음!");
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(36.5, 127.5), // 대한민국 중앙 위치
      level: 12,
    };

    const mapInstance = new window.kakao.maps.Map(container, options);
    setMap(mapInstance);

    const bounds = new window.kakao.maps.LatLngBounds();

    branchLocations.forEach(({ title, lat, lng, address }) => {
      const markerPosition = new window.kakao.maps.LatLng(lat, lng);
      bounds.extend(markerPosition);

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: mapInstance,
      });

      // ✅ 커스텀 오버레이 (지점명 + 주소)
      const content = `
        <div style="padding:10px; background:white; border-radius:5px; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1); font-size:12px;">
          <strong style="font-size:14px;">${title}</strong><br/>
          <span style="color:gray;">${address}</span>
        </div>
      `;

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content,
        position: markerPosition,
        yAnchor: 1.5,
      });

      // ✅ 마커에 마우스 오버 시 오버레이 표시
      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        customOverlay.setMap(mapInstance);
      });

      // ✅ 마커에서 마우스 아웃 시 오버레이 숨김
      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        customOverlay.setMap(null);
      });

      // ✅ 마커 클릭 시 해당 위치로 블링크 (새 창 열기)
      window.kakao.maps.event.addListener(marker, "click", () => {
        const kakaoMapUrl = `https://map.kakao.com/link/map/${title},${lat},${lng}`;
        window.open(kakaoMapUrl, "_blank");
      });
    });

    // ✅ 모든 마커가 보이도록 지도 확대 조정
    mapInstance.setBounds(bounds);
  };

  return (
    <div>
      <div id="kakao-map" className="w-full h-96 border rounded-lg shadow-md" />
    </div>
  );
}
