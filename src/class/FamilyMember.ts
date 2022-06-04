/**
 * private: 클래스 내부에서만 접근할 수 있으며 내부 인터페이스를 구성할 때 씀
 * protected: private와 동일하나, 상속받은 자식 Class에서는 사용 할 수 있다.
 * public: default 값 - 어디에서나 접근 가능하다.
 * readOnly: 변수를 const 화 시킴
 */

export interface FamilyMemberProps {
  id: number;
  iino: string;
  disabledCode: string;
  name: string;
  familyType: string;
  agedYn: "Y" | "N";
  basicDeductionYn: "Y" | "N";
  foreignYn: "Y" | "N";
  nhiExceptionYn: "Y" | "N";
  resideyn: "Y" | "N";
  wageYn: "Y" | "N";
}

class FamilyMember {
  private readonly props;
  constructor(props: FamilyMemberProps | undefined) {
    this.props = props;
  }

  calculateFullAge() {
    if (this.props) {
      const birthYear = this.props.iino.slice(0, 2);
      return 122 - +birthYear;
    }
    return undefined;
  }

  validBasicDeduction() {
    if (this.props) {
      const fullage = this.calculateFullAge();

      if (fullage === undefined) {
        return undefined;
      }

      const possibleAge = fullage >= 60 && fullage <= 20;
      return possibleAge && this.props.wageYn ? "Y" : "N";
    }

    return undefined;
  }

  validAgedDeduction() {
    if (this.props) {
      const fullage = this.calculateFullAge();

      if (fullage === undefined) {
        return undefined;
      }

      const possibleAge = fullage >= 70;
      return possibleAge && this.validBasicDeduction() === "Y" ? "Y" : "N";
    }

    return undefined;
  }
}

export default FamilyMember;
