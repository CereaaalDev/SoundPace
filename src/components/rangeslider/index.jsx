import styled from "styled-components";


const RangeContainer = styled.div`
  height: 10px;
  padding: 6rem;
  width: 400px;
`;
const SliderBar = styled.div`
  height: 5px;
  position: relative;
  background-color: #e1e9f6;
  border-radius: 2px;
`;
const SelectedRange = styled.span`
  height: 100%;
  left: 30%;
  right: 30%;
  position: absolute;
  border-radius: 5px;
  background-color: #1b53c0;
`;

const Handlers = styled.div`
  position: relative;

  input {
    position: absolute;
    width: 100%;
    height: 5px;
    top: -7px;
    background: none;
    pointer-events: auto;
    -webkit-appearance: none;
    -moz-appearance: none;
    z-index: 2;
  }
`;

export function RangeSlider() {
  return (
    <RangeContainer>
      <SliderBar>
        <SelectedRange />
      </SliderBar>
      <Handlers>
        <input type="range" min="0" max="1000" style={{zIndex: '3'} }/>
        <input type="range" min="0" max="1000" />
      </Handlers>
    </RangeContainer>
  );
}
