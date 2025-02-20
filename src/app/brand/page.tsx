"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/shared/ui";
import {
  brandBanner,
  brandImg1,
  brandImg2,
  brandImg3,
  brandImg4,
} from "@/shared/assets/brand";

export default function Brand() {
  const [selectedTab, setSelectedTab] = useState<"intro" | "history">("intro");

  return (
    <div className="flex flex-col gap-6 items-center">
      {/* 배너 */}
      <div className="flex justify-center items-center text-[#353535] relative">
        <Image src={brandBanner} alt="brand" width={1920} height={1080} />
        <div className="absolute text-center flex flex-col gap-4 items-center">
          <span className="text-3xl font-semibold">(주)황금단</span>
          <div className="w-full max-w-20 h-[2px] bg-[#353535]" />
          <span className="text-xl font-semibold">
            한복을 디자인하는 전문기업
          </span>
          <span>
            우리나라의 의복 "한복"을 전문으로 디자인하고 제작하며,
            <br />
            한복의 아름다움과 가치를 세상 모든분들과 함께 나누고자 합니다.
          </span>
        </div>
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-4">
        <Button
          onClick={() => setSelectedTab("intro")}
          className={`px-6 py-2 ${
            selectedTab === "intro"
              ? "bg-primary text-white border-b-4 border-primary"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          황금단 소개
        </Button>
        <Button
          onClick={() => setSelectedTab("history")}
          className={`px-6 py-2 ${
            selectedTab === "history"
              ? "bg-primary text-white border-b-4 border-primary"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          황금단 연혁
        </Button>
      </div>

      {/* 콘텐츠 변경 (애니메이션 적용) */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full container flex flex-col gap-10 max-w-5xl"
      >
        {selectedTab === "intro" ? <IntroContent /> : <HistoryContent />}
      </motion.div>
    </div>
  );
}

/** ✅ 황금단 소개 콘텐츠 */
function IntroContent() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-lg font-semibold text-[#353535]">
            황금단 디자인은... <br />
            2005년 처음 문을 연 황금단은
          </span>

          <div className="w-20 h-[1px] bg-[#353535]" />

          <span>
            전통 한복 특유의 아름다움에 독창적인 디자인을 접목해, <br />
            오트쿠튀르를 표방하는 한국 전통 브랜드입니다. <br />
            고급스럽고 독특한 소재와 감각적인 디자인은 황금단 마니아가 생길만큼
            다양한 고객들의 <br />
            취향을 두루 만족시키며, 폭넓은 사랑을 받고 있습니다.
          </span>
          <span>
            {" "}
            특히 전통한복에 드레스를 접목시켜 퓨전한복이라는 한복의 새로운
            분야를 연 <br />
            주인공인 만큼 새로운 디자인이 나올 때 마 다 소비자들의 커다란 반향을{" "}
            <br />
            일으키는 한복 업계의 중심입니다.
          </span>
          <span>
            디자인 등록을 통해 독창적인 디자인은 물론 한복은 실크로만 해야
            한다는 <br />
            고정관념을 깨고 해외에서 수입한 특수 원단을 사 용해 퀄리티와 선택의
            폭을 더욱 넓혔습니다. <br />
            디자인부터 원단, 바느질까지 어느 하나도 소홀함 없이 최고를 고집하는{" "}
            <br />
            황금단의 노력, 이제 고객님이 직접 경험할 차례입니다.
          </span>
        </div>
        <div>
          <Image
            src={brandImg1}
            width={0}
            height={0}
            alt="황금단 디자인"
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Image
            src={brandImg2}
            width={0}
            height={0}
            alt="황금단 디자인"
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm text-right">
          <span className="text-lg font-semibold text-[#353535]">
            황금단의 기특한 고집 <br /> 패턴의 양강화
          </span>
          <div className="w-20 h-[1px] bg-[#353535] self-end" />
          <span className=" leading-6">
            - 한복의 평면디자인을 보완, 수정하여 핏되고 세련된 스타일로 패턴작업{" "}
            <br />
            - 드레스와 양장의 장점을 한복에 접목 <br />
            - 수년간의 노하우로 체계적인 패턴과 스펙보유 <br />
            - 기존 맞춤 한복에서는 찾아볼 수 없는 기성사이즈로 변형 <br />- 치마
            폭수의 변형으로 드레시한 양장식 한복으로 재탄생
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-lg font-semibold text-[#353535]">
            황금단의 기특한 고집 <br />
            완성도 높은 바느질 & 자체개발 소품
          </span>

          <div className="w-20 h-[1px] bg-[#353535]" />

          <span>
            - 전통 기법의 바느질 고수 <br />
            - 타 업체에 비해 견고하고 완성도 높은 마감 바느질 <br />
            - 디자인 소품 자체 개발, 생산 <br />- 고가 원단과 고급 원부자재 사용
          </span>
        </div>
        <div>
          <Image
            src={brandImg3}
            width={0}
            height={0}
            alt="황금단 디자인"
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Image
            src={brandImg4}
            width={0}
            height={0}
            alt="황금단 디자인"
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 text-sm text-right">
          <span className="text-lg font-semibold text-[#353535]">
            황금단의 기특한 고집
            <br />
            디자인의 다양화
          </span>
          <div className="w-20 h-[1px] bg-[#353535] self-end" />
          <span className=" leading-6">
            - 모든 의상 커플, 가족 세트로 변형가능 <br />
            - 남자한복의 한복형 베스트, 타이 제작가능
            <br />
            - 여자한복 당의형, 볼레로형 등 다양한 디자인 변형가능 <br />
            - 여자한복 상의 소매 길이 변형 가능 <br />- 무릎까지 오는 미니
            한복드레스
          </span>
        </div>
      </div>
    </>
  );
}

/** ✅ 황금단 연혁 콘텐츠 */
function HistoryContent() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between container w-full max-w-5xl">
        <div className="flex flex-col gap-4">
          <span className="text-lg font-semibold text-[#353535]">
            2005년 ~ 2016년
          </span>
          <div className="w-20 h-[1px] bg-[#353535] self-start" />

          <span>
            <b>2005</b>
            <br />
            11월 황금단설립
            <br />
            <br />
            <b>2006</b>
            <br />
            02월 2006년 S/S 신상품 품명회
            <br />
            11월 황금단 공장 설립
            <br />
            <br />
            <b>2008</b>
            <br />
            02월 CJ홈쇼핑협찬, KBS2 , 한복의상협찬
            <br />
            12월 목동 사옥이전
            <br />
            디자인실, 물류실, 총무과, 경리과, 목동이전
            <br />
            황금단 상호.상표등록
            <br />
            황금퓨전방 브랜드런칭
            <br />
            황금퓨전 상표등록
            <br />
            <br />
            <b>2009</b>
            <br />
            01월 MBC 한복의상협찬, 케이블방송 한복의상협찬
            <br />
            02월 황금퓨전방 체인점 1호점 오픈
            <br />
            09월 체인점 신상품 페션쇼 및 신상품 품명회
            <br />
            11월 2009년 F/W 신상품 품명회, KBS2 한복의상협찬
            <br />
            12월 해피맘스 육아박람회(SETEC)
            <br />
            <br />
            <b>2010</b>
            <br />
            02월 &nbsp;2009년 S/S 신상품 품명회, MBC &lt;섹션TV&gt; 한복의상협찬
            <br />
            04월&nbsp;웨딩21 잡지 화보 출간
            <br />
            08월 창립6주년 기념패션쇼, MBC &lt;세바퀴&gt;.&lt;섹션TV&gt;
            한복의상협찬, 신상품 패션쇼
            <br />
            <br />
            <b>2010</b>
            <br />
            10월 서울패션페스티발 한복의상협찬
            <br />
            <br />
            <b>2011</b>
            <br />
            01월 &nbsp;KBS1&lt;웃어라동해야&gt; 한복협찬
            <br />
            SBS&lt;키스엔크라이&gt; 한복협찬
            <br />
            가수&lt;빅뱅 지드래곤CF&gt; 한복협찬
            <br />
            <br />
          </span>
        </div>

        <div className="text-right flex flex-col gap-4">
          <span className="text-lg font-semibold text-[#353535]">
            2017년 ~ 2024년
          </span>
          <div className="w-20 h-[1px] bg-[#353535] self-end" />

          <span>
            <b>2017</b>
            <br />
            01월 황금단 S/S 신상품평회, 황금단 포항점 체인점 오픈
            <br />
            05월 이종 격투기 선수 “권아솔”선수 결혼 한복 협찬
            <br />
            06월 &nbsp;한복 누비리 화보 촬영
            <br />
            07월&nbsp;황금단 종로매장 오픈
            <br />
            10월 F/W 한복 화보 촬영
            <br />
            강서경찰서 제 5회 “YOU &amp; I” 알라뷰 민족행사
            <br />
            새터민 전원에게 한복 기증
            <br />
            <br />
            <b>2018</b>
            <br />
            01월 스토아 홈쇼핑 한복 협찬
            <br />
            <br />
            <b>2019</b>
            <br />
            07월 부천상동 본사직영매장 오픈
            <br />
            12월 2020 SS 서울시니어 패션 컬렉션 협찬
            <br />
            <br />
            <b>2020</b>
            <br />
            07월 전남곡성 옥과초,중,고등학교 한복1억2천만원상당 “기증”
            <br />
            <br />
            <b>2021</b>
            <br />
            09월 광주스타한복 오픈
            <br />
            <br />
            <b>2023</b>
            <br />
            <b>03.20 “주식회사 황금단” 으로 법인설립</b>
            <br />
            06월 LG 본사와 MOU 체결
            <br />
            09월 클라씨 한복협찬
            <br />
            온엔오프 한복협찬
            <br />
            라임라잇 한복협찬
            <br />
            LG BEST SHOP 중동점 웨딩박람회참가
            <br />
            하우투 웨딩박람회 참가
            <br />
            강남 LG BEST SHOP 웨딩박람회참가
            <br />
            부평 LG BEST SHOP 웨딩박람회참가
            <br />
            송탄 LG BEST SHOP 웨딩박람회참가
            <br />
            인천 LG BEST SHOP 웨딩박람회참가
            <br />
            10월 황금단 F/W 신상 출시
            <br />
            패밀리 웨딩박람회 참가
            <br />
            강남.용인.이천.원주,구리 LG BEST SHOP 웨딩박람회참가
            <br />
            11월 홍스 웨딩박람회 참가
            <br />
            판교 LG BEST SHOP 웨딩박람회참가
            <br />
            배트남 코이티비 MOU 준비 미팅
            <br />
            12월 &nbsp;양산업진흥원 원장상수상 (기업 참가 최우수상 수상)
            <br />
            <br />
            <b>2024</b>
            <br />
            01월 전남곡성 옥과고등학교 한복500만원 상당 “기증”
            <br />
            (전라도.경상도 지역 고등학생 인성교육용)
            <br />
            김치귀신마이 와 MOU 체결, 배트남몬터스트(코이tv)와 MOU체결
            <br />
            김치귀신마이(유튜버) 한복협찬, 크래비티한복협찬 ,
            김진호개그맨한복협찬
            <br />
            본사 안양주소지로 사무실 이전
            <br />
            02월 MBC놀면뭐하니 이이경 한복협찬,조우종아나운서
            한복협찬,템퍼스트아이돌
            <br />
            LG best SHOP중동점 웨딩박람회 참가
            <br />
            03월&nbsp;한복공장등록, 제조업등록완료, 아리랑글로벌포럼(AGF) 와
            MOU체결
            <br />
            중소기업확인서취득, 웨딩박람회 참가
            <br />
            04월 한복연구전담부서등록, KOTRA 무역업등록
            <br />
            본사직영 강남점 오픈
            <br />
            노원구 공무원노조 와 MOU체결
            <br />
            베트남 .000첫수출
            <br />
            이탈리아 ,700 수출
            <br />
            이탈리아 세르비아 44”ARTEBNTO 참가
            <br />
            한복참여국위선양
            <br />
            05월&nbsp;견우와직녀 홍보영상촬영
            <br />
            베트남 .000 수출
            <br />
            인천시 남동구청 불우이웃돕기 한복 패션쇼 진행
            <br />
            홍천 한복페션쇼 진행
            <br />
            06월 국회의사당내 한복폐션쇼 진행
            <br />
            07월&nbsp;중국 $ 2,042 수출,&nbsp;중국 $ 5,210 수출
          </span>
        </div>
      </div>
    </div>
  );
}
