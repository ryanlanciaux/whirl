import React from "react";
import { Whirl, ImageContent } from "react-whirl";

const Example = () => (
  <Whirl height="30vh" width="50vw">
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
);

export default Example;
