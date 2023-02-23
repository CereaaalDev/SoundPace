import styled from "styled-components";
import { COLORS } from "/src/util/Colors";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { IoClose } from "react-icons/io5";

const RemoveContainer = styled.div`
  color: black;
  cursor: pointer;
  opacity: 0;
  font-size: 26px;
  padding: 0.5rem;
  padding-right: 1rem;
  :hover {
    color: red;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  gap: 1rem;
  padding: 0.5rem;
  :hover {
    background-color: #ededed;
  }
  :hover ${RemoveContainer} {
    opacity: 1;
  }
`;
const IndexContainer = styled.div`
  font-weight: 700;
  font-size: 25px;
  text-align: center;
  min-width: 2rem;
  color: ${COLORS["bg-dark-grey"]};
`;

const ImageContainer = styled.div`
  img {
    //TODO: Convert img size to inline-size tag
    width: 64px;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  flex: 1 0 0;
  white-space: nowrap;
  overflow: hidden;
`;

const Subtitle = styled.h6`
  color: ${COLORS["text-light"]};
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0;
  line-height: 20px;
  /* font-family: "Poppins", sans-serif; */
`;
const MainTitle = styled.h6`
  font-size: 19px;
  margin-bottom: 0;
  line-height: 19px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ValueContainer = styled.div`
  font-size: 14px;
  display: flex;
  gap: 5px;
`;
const BadgeContainer = styled.div`
  background-color: grey;
  border-radius: 10px;
  color: white;
  padding: 0.5rem;
  font-size: 9px;
  flex: 0 0 auto;
`;

export function ListItem(props) {
  return (
    <ItemContainer>
      <IndexContainer>
        {" "}
        <span>{props.index}</span>
      </IndexContainer>
      <ImageContainer>
        <LazyLoadImage src={props.imgSrc} />
      </ImageContainer>
      <TitleContainer>
        <Subtitle>{props.subtitle}</Subtitle>
        <MainTitle>{props.title}</MainTitle>
      </TitleContainer>
      <ValueContainer>
        {props.value
          ? props.value.map((value, index) => {
              return (
                <BadgeContainer key={index}>
                  <span>{value}</span>
                </BadgeContainer>
              );
            })
          : null}
      </ValueContainer>

      {props.removable ? (
        <RemoveContainer onClick={props.onClick}>
          <span>
            <IoClose />
          </span>
        </RemoveContainer>
      ) : null}
    </ItemContainer>
  );
}
