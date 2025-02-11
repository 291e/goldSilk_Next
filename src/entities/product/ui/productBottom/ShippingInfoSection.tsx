import React from "react";

export const ShippingInfoSection = () => {
  return (
    <section className="p-6 text-xs">
      <div className="flex flex-col md:flex-row gap-4">
        {/* 왼쪽: 결제 및 교환/반품 정보 */}
        <div className="flex-1">
          <div className=" font-semibold mb-1">[상품 결제 정보]</div>
          <div className="flex flex-col gap-2">
            <span>
              고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도
              있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문 등
              정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는
              취소할 수 있습니다.
            </span>
            <span>
              무통장 입금은 상품 구매 대금을 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은
              가까운 은행에서 직접 입금하시면 됩니다. <br />
              주문 시 입력한 입금자명과 실제 입금자의 성명이 반드시 일치하여야
              하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동
              취소됩니다.
            </span>
          </div>

          <div className="flex-1 mt-8">
            <div>
              <div className="font-semibold mb-1">[교환 및 반품 정보]</div>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  교환 및 반품 의사는 반드시 고객센터 또는 Q&A 게시판을 통해
                  요청해주셔야 합니다.
                </li>
                <li>예약 주문 및 주문 제작 제품은 반품 및 교환 불가합니다.</li>
                <li>
                  주문 제작 제품은 제작 진행 후 교환, 환불이 불가합니다. (소비자
                  요청에 의해 해외 발주가 진행된 제품 또는 방송 판매 제품 포함)
                </li>
                <li>
                  고객이 직접 조립 및 시공을 진행하는 제품에 대해서는 조립 후
                  교환 및 반품이 불가합니다.
                </li>
                <li>
                  고객의 사용 또는 고객의 책임 있는 사유로 상품의 가치가 하락
                  또는 훼손된 경우 교환 및 반품이 불가합니다.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="hidden md:block w-px bg-gray-300"></div>

        <div className="flex-1">
          {/* 오른쪽: 배송 정보 */}
          <div className=" font-semibold mb-1">[배송 정보]</div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-700">
              <span>배송 방법 :</span> 택배
            </span>
            <span className="text-gray-700">
              <span>배송 지역 :</span> 전국지역
            </span>
            <span className="text-gray-700">
              <span>배송 비용 :</span> 무료
            </span>
            <span className="text-gray-700">
              <span>배송 기간 :</span> 2일 ~ 7일
            </span>
            <span className="text-gray-700 mb-6">
              <span>배송 안내 :</span> 전 제품 무료 배송 및 설치 (도서, 산간,
              해외 별도 요금)
            </span>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>
              전자상거래법에 의거하여 교환 및 반품 요청은 수령일로부터 7일
              이내입니다.
            </li>
            <li>
              제품의 자체적인 하자가 있는 경우 개봉 당시의 사진이 반드시 있어야
              교환 및 반품 상담이 가능합니다.
            </li>
            <li>
              고객의 단순 변심이나 실수로 인한 반품 또는 교환의 경우 왕복
              배송비는 고객이 부담합니다.
            </li>
            <li>
              교환/반품 시에는 제품에 따라 왕복배송비 (제품별 금액이 상이할 수
              있으므로 고객센터 문의)를 부담하셔야 합니다.
            </li>
            <li>
              교환 및 반품은 택배사를 통해 수거하며, 제품/택/패키지 박스 등
              보내드린 구성품 그대로 온전한 상태로 반송해주셔야 합니다.
            </li>
            <li>
              제품/택/패키지 박스 등에 훼손이 있어 교환 및 반품이 불가할 경우
              재반송 처리됩니다.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
