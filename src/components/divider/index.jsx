import styled from "styled-components";

const ShapeDivider = styled.div`
  position: relative;
  left: 0;
  width: 100vw;
  line-height: 0;
  transform: rotate(180deg);
  margin-top: 5rem;

  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 150px;
  }

  .shape-fill {
    fill: white;
  }
`;

export function Divider() {
  return (
    <ShapeDivider>
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
          class="shape-fill"
        ></path>
      </svg>
    </ShapeDivider>
  );
}
