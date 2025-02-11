export default function Footer() {
  return (
    <footer className="py-6 px-4 border-t-[1px] border-gray-300">
      <div className="container mx-auto text-gray-600 flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-sm md:text-base">ABOUT US</span>
          <div className="flex flex-col text-xs md:text-sm">
            <span>Company : 황금단 CEO : 강영기</span>
            <span>
              Company Reg.No : 712-88-02701 통신판매업신고번호 :
              2023-대전유성-1388
            </span>
            <span>Tel : 010-4065-1004 / 02-2269-1008 Fax : 02-516-6004</span>
            <span>
              Add : 14055 경기도 안양시 동안구 시민대로327번길 11-41 9층 909호
            </span>
            <span>
              Add : 06065 서울 강남구 선릉로134길 6 1층 (서울본점-전시장)
            </span>
            <span>
              Cpo_email : 강영기 (goldsilkcop@gmail.com) Hosting by ㈜메타뱅크
            </span>
            <span>
              Copyright © 황금단. All rights reserved 디자인저작권자:위스킨
            </span>

            <span>Technical support ㈜메타뱅크. All rights reserved.</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm md:text-base">BANK ACCOUNT</span>
          <div className="flex flex-col text-xs md:text-sm">
            <span>하나은행 : 661-910014-73404</span>
            <span>예금주 : 주식회사메타뱅크</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm md:text-base">CS CENTER</span>
          <div className="flex flex-col text-xs md:text-sm">
            <span>010-4065-1004</span>
            <span>02-517-6004</span>
            <span>02-2269-1008</span>
            <span>평일 AM10:00 ~PM18:00</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
