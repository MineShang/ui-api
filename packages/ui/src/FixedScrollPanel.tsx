import React, { ReactNode, useEffect } from "react";
import throttle from "lodash.throttle";

export type FixedScrollPanelProps = {
  children: ReactNode;
  fixedColumnId?: string;
  customFixedColumnTop?: number;
  customFixedColumnClass?: string;
  headerHeight: number;
  windowWidth: number;
};

export const FixedScrollPanel = ({
  children,
  fixedColumnId,
  customFixedColumnTop,
  customFixedColumnClass,
  headerHeight,
  windowWidth,
}: FixedScrollPanelProps) => {
  const _fixedColumnId = fixedColumnId || "fixedColumn";
  const _customFixedColumnClass = customFixedColumnClass || "stickyTop";
  const scrollAction = { y: 0 };
  const isMobileOrTablet = windowWidth < 1024;

  //Right column fixed when left column is scrollable
  const handleScroll = throttle(() => {
    const windowHeight = window.innerHeight;

    //handle direction
    let diffY = scrollAction.y - window.pageYOffset;
    if (diffY === 0) return false;
    let direction = diffY < 0 ? "down" : "up";
    scrollAction.y = window.pageYOffset;

    const afterScrollTop = document.scrollingElement!.scrollTop;
    const wrapperEl = document.querySelector(`#wrapperEl`) as HTMLDivElement;
    const currentProductInfoEl = document.querySelector(
      `#${_fixedColumnId}`
    ) as HTMLDivElement;
    if (!currentProductInfoEl) return;

    const { height: infoHeight } =
      currentProductInfoEl!.getBoundingClientRect();
    const { bottom: contentBottom, height: contentHeight } =
      wrapperEl.getBoundingClientRect();
    if (infoHeight === contentHeight) return;
    if (afterScrollTop >= headerHeight!) {
      //enable custom class when [customFixedColumnTop] is not exist
      if (customFixedColumnTop) {
        currentProductInfoEl.style.top = `${customFixedColumnTop}px`;
      } else {
        currentProductInfoEl.classList.add(_customFixedColumnClass);
      }
      currentProductInfoEl.style.removeProperty("bottom");
      if (direction === "down") {
        currentProductInfoEl.style.top = `-${infoHeight - windowHeight}px`;
      } else {
        currentProductInfoEl.style.transition = `all 0.3s ease 0s`;
      }
      if (contentBottom < windowHeight) {
        currentProductInfoEl.style.bottom = "0px";
        currentProductInfoEl.style.removeProperty("transition");
      }
    } else {
      if (customFixedColumnTop) {
        currentProductInfoEl.style.removeProperty("top");
      } else {
        currentProductInfoEl.classList.add(_customFixedColumnClass);
      }
      currentProductInfoEl.style.removeProperty("transition");
    }
  }, 200);

  useEffect(() => {
    if (isMobileOrTablet) return;
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, headerHeight, isMobileOrTablet]);

  return <div id="wrapperEl">{children}</div>;
};
