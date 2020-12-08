import React, { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { mount } from "auth/AuthApp";

const MarketingApp = ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        nextPathname !== pathname && history.push(nextPathname);
      },
      onSignIn,
    });

    history.listen(onParentNavigate);
  });

  return <div ref={ref}></div>;
};

export default MarketingApp;
