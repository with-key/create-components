import axios from "axios";
import React, { ReactNode } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import FamilyMember, { FamilyMemberProps } from "../class/FamilyMember";

type BooleanReturnComponentProps = {
  children: ReactNode;
};

const BooleanReturnComponent = (props: BooleanReturnComponentProps) => {
  return <div>{props.children === "Y" ? "네" : "아니오"}</div>;
};

const Home = () => {
  const fetcher = async () => {
    const { data } = await axios.get("http://localhost:3000/api/family/1");
    return data;
  };

  const { data } = useQuery<FamilyMemberProps>(["member", "id"], fetcher, {
    refetchOnWindowFocus: false,
  });

  const member = new FamilyMember(data);
  return (
    <>
      <Flex>
        <div>나이</div>
        <div>{member.calculateFullAge()}</div>
      </Flex>
      <Flex>
        <div>공제1</div>
        <BooleanReturnComponent>
          {member.validAgedDeduction()}
        </BooleanReturnComponent>
      </Flex>
      <Flex>
        <div>공제2</div>
        <BooleanReturnComponent>
          {member.validBasicDeduction()}
        </BooleanReturnComponent>
      </Flex>
    </>
  );
};

export default Home;

const Flex = styled.div`
  display: flex;
  gap: 12px;
`;
