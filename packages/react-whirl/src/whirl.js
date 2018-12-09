import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const BUTTON_PADDING = 25;

// See https://inclusive-components.design/a-content-slider/
const GalleryWrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Gallery = styled.div`
  overflow: hidden;
  overflow-x: scroll;
  width: 100%;
  background-color: #ededed;
  position: relative;

  &:focus {
    outline: 4px solid DodgerBlue;
    outline-offset: -6px;
  }

  & + div #hoverfocus,
  & + div #hover,
  & + div #focus {
    display: none;
  }

  &:hover + div #hover {
    display: block;
  }

  &:focus + div #focus {
    display: block;
  }

  &:hover:focus + div #hoverfocus {
    display: block;
  }

  &:hover:focus + div #hover,
  &:hover:focus + div #focus {
    display: none;
  }
`;

const Instructions = styled.div`
  background-color: ${props => props.background || "#000"};
  text-align: center;
  color: ${props => props.color || "#FFF"};
  ${props => props.style}
`;

const GalleryList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
`;

const GalleryListItem = styled.li`
  list-style: none;
  margin: 0;
  flex: 0 0 100%;
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Caption = styled.figcaption`
  padding: 0.5rem;
`;

export const ImageContent = ({
  imgSrc,
  caption,
  description,
  showCaption = false
}) => (
  <GalleryListItem>
    <Figure>
      <Image src={imgSrc} alt={description} />
      {showCaption && <Caption>{caption}</Caption>}
    </Figure>
  </GalleryListItem>
);

const Previous = onPrevious => (
  <button
    id="previous"
    aria-label="previous"
    onClick={onPrevious}
    style={{
      padding: BUTTON_PADDING,
      marginLeft: BUTTON_PADDING,
      marginRight: BUTTON_PADDING
    }}
  >
    Previous
  </button>
);

const Next = onNext => (
  <button
    id="next"
    aria-label="next"
    onClick={onNext}
    style={{
      padding: BUTTON_PADDING,
      marginLeft: BUTTON_PADDING,
      marginRight: BUTTON_PADDING
    }}
  >
    Next
  </button>
);

const ControlsList = styled.ul`
  list-style: none;
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: ${props => props.width};
  justify-content: space-between;
  padding: 0;
  top: calc((${props => props.height} / 2) - ${BUTTON_PADDING * 2}px);
`;

export const Controls = ({
  onNext,
  onPrevious,
  previous,
  next,
  width,
  height,
  style
}) => (
  <ControlsList width={width} height={height} aria-hidden style={style}>
    <li>{previous(onPrevious)}</li>
    <li>{next(onNext)}</li>
  </ControlsList>
);

export class Whirl extends React.Component {
  static defaultProps = {
    label: "Image gallery",
    next: Next,
    previous: Previous,
    autoScroll: true,
    scrollTimer: 5000,
    controlsStyle: null
  };

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    label: PropTypes.string,
    next: PropTypes.func,
    previous: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]),
    autoScroll: PropTypes.bool,
    scrollTimer: PropTypes.number,
    controlsStyle: PropTypes.object
  };

  state = { slideIndex: 0 };

  element = React.createRef();

  componentDidMount() {
    if (this.props.autoScroll) {
      this.setupTimer();
    }

    this.element.current.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    this.element.current.removeEventListener("keydown", this.handleKeydown);
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.slideIndex !== this.state.slideIndex) {
      this.gotoSlideByIndex(this.state.slideIndex);
    }

    if (
      previousProps.autoScroll !== this.props.autoScroll ||
      previousProps.scrollTimer !== this.props.scrollTimer
    ) {
      this.removeTimer();
      this.setupTimer();
    }
  }

  handleKeydown = e => {
    e.preventDefault();

    if (e.key === "ArrowLeft") {
      this.onPrevious();
    }

    if (e.key === "ArrowRight") {
      this.onNext();
    }
  };

  setupTimer = () => {
    this.timer = window.setInterval(() => {
      this.onNext();
    }, this.props.scrollTimer);
  };

  removeTimer = () => {
    window.clearClear(this.timer);
  };

  getSlideWidth = () => {
    const totalWidth = this.element.current.scrollWidth;
    const items = this.props.children.length;
    return totalWidth / items;
  };

  gotoSlideByIndex = index => {
    const slideWidth = this.getSlideWidth();
    this.element.current.scroll(index * slideWidth, 0);
  };

  getCurrentIndex = () => {
    const slideWidth = this.getSlideWidth();
    const scrollPosition = this.element.current.scrollLeft;

    return Math.round(scrollPosition / slideWidth);
  };

  onNext = () => {
    const index = this.getCurrentIndex();
    const total = this.props.children.length;

    // if on the last slide go to the first -- otherwise goto next
    this.setState({ slideIndex: total - 1 === index ? 0 : index + 1 });
  };

  onPrevious = () => {
    const index = this.getCurrentIndex();
    const total = this.props.children.length;

    // if on the first slide go to the last -- otherwise goto previous
    this.setState({ slideIndex: index === 0 ? total - 1 : index - 1 });
  };

  render() {
    const {
      children: slides,
      width,
      height,
      label,
      next,
      previous,
      controlsStyle
    } = this.props;

    return (
      <GalleryWrapper width={width} height={height}>
        <Gallery
          ref={this.element}
          role="region"
          aria-label={label}
          tabIndex="0"
          aria-describedby="focus"
        >
          <GalleryList>{slides}</GalleryList>
        </Gallery>
        <Instructions>
          <p id="hoverfocus">Scroll or use arrow keys for more</p>
          <p id="hover">Scroll for more</p>
          <p id="focus">Use arrow keys for more</p>
        </Instructions>
        <Controls
          onNext={this.onNext}
          onPrevious={this.onPrevious}
          previous={previous}
          next={next}
          width={width}
          height={height}
          style={controlsStyle}
        />
      </GalleryWrapper>
    );
  }
}
