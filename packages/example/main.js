import React from "react";
import styled from "styled-components";
import { Whirl, ImageContent } from "react-whirl";

const CircleButton = props => (
  <button
    {...props}
    style={{
      width: 60,
      height: 60,
      borderRadius: 30,
      marginLeft: props.left ? -25 : 0,
      marginRight: !props.left ? -25 : 0
    }}
  >
    {props.children}
  </button>
);

const Next = onNext => <CircleButton onClick={onNext}>Next</CircleButton>;
const Previous = onNext => (
  <CircleButton onClick={onNext} left>
    Previous
  </CircleButton>
);

const Example = () => (
  <div style={{ margin: 30 }}>
    <Whirl
      height="300px"
      width="300px"
      next={Next}
      previous={Previous}
      controlsStyle={{ bottom: -40 }}
    >
      <ImageContent
        imgSrc="http://www.placecage.com/300/300"
        caption="Nicolas Cage @ 300x300"
        description="Nicolas Cage image"
      />
      <ImageContent
        imgSrc="http://www.fillmurray.com/300/300"
        caption="Bill Murray @ 300x300"
        description="Bill Murray image"
      />
      <ImageContent
        imgSrc="http://www.placecage.com/400/400"
        caption="Nicolas Cage @ 400x400"
        description="Nicolas Cage image"
      />
      <ImageContent
        imgSrc="http://www.fillmurray.com/400/400"
        caption="Bill Murray @ 400x400"
        description="Bill Murray image"
      />
      <ImageContent
        imgSrc="http://www.placecage.com/500/500"
        caption="Nicolas Cage @ 500x500"
        description="Nicolas Cage image"
      />
      <ImageContent
        imgSrc="http://www.fillmurray.com/500/500"
        caption="Bill Murray @ 500x500"
        description="Bill Murray image"
      />
    </Whirl>
  </div>
);

export default Example;
