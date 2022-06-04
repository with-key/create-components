import React, { useState } from "react";
import styled from "styled-components";
import ArrowDown from "../../Icons/ArrowDown";

type ItemType = {
  id: number;
  name: string;
  value: string;
};

type DropdownProps = {
  items: ItemType[];
};

const Dropdown = ({ items }: DropdownProps) => {
  const [showItems, setShowItems] = useState(false);
  const [seleted, setSeleted] = useState<ItemType | null>(null);

  return (
    <StDropdown>
      <StContainer
        onClick={() => {
          setShowItems((pre) => !pre);
        }}
        onBlur={() => {
          setShowItems(false);
        }}
      >
        <div>{seleted ? seleted.name : "선택해주세요"}</div>
        <ArrowDown />
      </StContainer>

      {showItems && (
        <StItem>
          {items.map((item) => {
            return (
              <StSelectedItem
                key={item.id}
                // mouse event 실행순서 (onMouseDown -> onBlur -> onClick)
                onMouseDown={() => {
                  setShowItems(false);
                  setSeleted(item);
                }}
              >
                {item.name}
              </StSelectedItem>
            );
          })}
        </StItem>
      )}
    </StDropdown>
  );
};

export default Dropdown;

const StContainer = styled.button`
  width: 335px;
  border: 1px solid #00b98d;
  height: 46px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  background-color: #fff;
  cursor: pointer;
`;
const StItem = styled.div`
  border: 1px solid #e5e5e5;
  width: 335px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  align-items: start;
  justify-content: start;
  padding: 20px 15px;
`;
const StSelectedItem = styled.div`
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

const StDropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
