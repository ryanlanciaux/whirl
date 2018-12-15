import React, { Component } from "react";
import styled from "styled-components";

// See http://steveholgado.com/posts/react-component-fixed-aspect-ratio/
const Container = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-top: ${props => props.percent}%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const FixedAspectRatio = ({ width, height, children }) => {
  const percent = (parseInt(height) / parseInt(width)) * 100;

  return (
    <Container percent={percent}>
      <Content>{children}</Content>
    </Container>
  );
};
