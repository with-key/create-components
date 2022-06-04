import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.id === "0") return;
  if (req.query.id === "1") {
    return res.status(200).json({
      id: 1, // 서버 아이디
      name: "신세경", // 이름
      iino: "9101012234567", // 주민등록번호
      familyType: "03", // 가족관계코드
      agedYn: "N", // 경로우대공제 여부
      basicDeductionYn: "N", // 기본공제 여부
      disabledCode: "0", // 장애인 코드
      nhiExceptionYn: "N", // 건강보험산정특례 여부
      wageYn: "N", // 소득 여부
      resideyn: "N", // 거주자 여부
      foreignYn: "N", // 외국인 여부
    });
  }

  if (req.query.id === "2") {
    return res.status(200).json({
      id: 2, // 서버 아이디
      name: "신나라", // 이름
      iino: "0501013234567", // 주민등록번호
      familyType: "04", // 가족관계코드
      agedYn: "N", // 경로우대공제 여부
      basicDeductionYn: "Y", // 기본공제 여부
      disabledCode: "0", // 장애인 코드
      nhiExceptionYn: "N", // 건강보험산정특례 여부
      wageYn: "N", // 소득 여부
      resideyn: "N", // 거주자 여부
      foreignYn: "N", // 외국인 여부
    });
  }
}
