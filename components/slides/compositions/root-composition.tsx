import { Series } from "remotion";
import { FRAMES_PER_SLIDE } from "../shared/constants";
import { TitleSlide } from "./title-slide";
import { OldVsNewSlide } from "./old-vs-new-slide";
import { SystemSlide } from "./system-slide";
import { ObsidianClaudeSlide } from "./obsidian-claude-slide";
import { BuildTodaySlide } from "./build-today-slide";
import { WeeklyRoutineSlide } from "./weekly-routine-slide";
import { TakeawaysSlide } from "./takeaways-slide";

export function RootComposition() {
  return (
    <Series>
      <Series.Sequence durationInFrames={FRAMES_PER_SLIDE}>
        <TitleSlide />
      </Series.Sequence>
      <Series.Sequence durationInFrames={FRAMES_PER_SLIDE}>
        <OldVsNewSlide />
      </Series.Sequence>
      <Series.Sequence durationInFrames={FRAMES_PER_SLIDE}>
        <SystemSlide />
      </Series.Sequence>
      <Series.Sequence durationInFrames={FRAMES_PER_SLIDE}>
        <ObsidianClaudeSlide />
      </Series.Sequence>
      <Series.Sequence durationInFrames={FRAMES_PER_SLIDE}>
        <BuildTodaySlide />
      </Series.Sequence>
      <Series.Sequence durationInFrames={FRAMES_PER_SLIDE}>
        <WeeklyRoutineSlide />
      </Series.Sequence>
      <Series.Sequence durationInFrames={FRAMES_PER_SLIDE}>
        <TakeawaysSlide />
      </Series.Sequence>
    </Series>
  );
}
