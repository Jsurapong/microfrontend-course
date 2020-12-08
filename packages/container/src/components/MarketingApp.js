import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "marketing/MarketingApp";

const MarketingApp = () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        nextPathname !== pathname && history.push(nextPathname);
      },
    });

    history.listen(onParentNavigate);
  });

  return <div ref={ref}></div>;
};

export default MarketingApp;
