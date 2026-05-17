import { useState } from "react";
import LandingPortraitNetwork from "./LandingPortraitNetwork";
import LandingPortraitShader from "./LandingPortraitShader";

function choosePortraitEffect(forceEffect) {
  if (forceEffect === "particle" || forceEffect === "shader") {
    return forceEffect;
  }

  if (typeof window === "undefined") {
    return "particle";
  }

  const params = new URLSearchParams(window.location.search);
  const queryEffect = params.get("portrait");

  if (queryEffect === "particle" || queryEffect === "shader") {
    return queryEffect;
  }

  return Math.random() < 0.5 ? "particle" : "shader";
}

export default function LandingPortraitRandomizer({
  imageUrl = "/assets/bineet.png",
  className = "",
  forceEffect,
}) {
  const [selectedEffect] = useState(() => choosePortraitEffect(forceEffect));

  if (selectedEffect === "shader") {
    return <LandingPortraitShader imageUrl={imageUrl} className={className} />;
  }

  return <LandingPortraitNetwork imageUrl={imageUrl} className={className} />;
}
