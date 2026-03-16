"use client";

import { Player } from "@remotion/player";
import { RootComposition } from "./compositions/root-composition";
import {
  SLIDE_FPS,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  TOTAL_DURATION,
} from "./shared/constants";

export function SlideDeck() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#08090a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Player
        component={RootComposition}
        compositionWidth={SLIDE_WIDTH}
        compositionHeight={SLIDE_HEIGHT}
        durationInFrames={TOTAL_DURATION}
        fps={SLIDE_FPS}
        style={{
          width: "100%",
          maxHeight: "100vh",
          aspectRatio: `${SLIDE_WIDTH} / ${SLIDE_HEIGHT}`,
        }}
        controls
        autoPlay={false}
        clickToPlay
        doubleClickToFullscreen
        spaceKeyToPlayOrPause
      />
    </div>
  );
}
