import Phaser from "phaser";

import {
  advanceClipPlayback,
  blendSkeletonPoses,
  createClipPlayback,
  evaluateClipPlaybackPose,
  Phaser4RendererAdapter,
  SkelFormAdapter,
  validateSkeleton,
  type ClipPlaybackState,
  type SkeletonDefinition,
  type SkelFormSource,
  type ValidatedSkeleton,
} from "../../src/index.js";

const DEFAULT_ARM_ATTACHMENT_ID = "bone-1-visual-1";
const ALT_ARM_ATTACHMENT_ID = "arm-magenta";
const STYLE_SLOT_ID = "arm-style";

class Phase1DemoScene extends Phaser.Scene {
  private skeleton!: ValidatedSkeleton;
  private rendererAdapter!: Phaser4RendererAdapter;
  private firstPlayback!: ClipPlaybackState;
  private secondPlayback!: ClipPlaybackState;
  private blendWeight = 0.5;
  private useAlternateStyle = false;
  private statusElement!: HTMLElement;

  constructor() {
    super("Phase1Demo");
  }

  preload(): void {
    this.load.json("armature", "./armature.json");
    this.load.image("root-marker", "./root-marker.svg");
    this.load.image("arm-cyan", "./arm-cyan.svg");
    this.load.image("arm-magenta", "./arm-magenta.svg");
  }

  create(): void {
    const source = this.cache.json.get("armature") as SkelFormSource | undefined;
    if (!source) {
      throw new Error("Phase 1 demo could not load armature.json.");
    }

    const imported = new SkelFormAdapter().import(source);
    const defaultArm = imported.attachments.find(
      (attachment) => attachment.id === DEFAULT_ARM_ATTACHMENT_ID,
    );

    if (!defaultArm) {
      throw new Error(
        `Phase 1 demo fixture is missing attachment ${DEFAULT_ARM_ATTACHMENT_ID}.`,
      );
    }

    if (imported.animations.length < 2) {
      throw new Error("Phase 1 demo fixture requires two animation clips.");
    }

    const definition: SkeletonDefinition = {
      ...imported,
      attachments: [
        ...imported.attachments,
        {
          ...defaultArm,
          id: ALT_ARM_ATTACHMENT_ID,
          name: "Magenta Arm",
          assetId: "arm-magenta",
        },
      ],
      attachmentSlots: [
        {
          id: STYLE_SLOT_ID,
          attachmentIds: [
            DEFAULT_ARM_ATTACHMENT_ID,
            ALT_ARM_ATTACHMENT_ID,
          ],
          defaultAttachmentId: DEFAULT_ARM_ATTACHMENT_ID,
        },
      ],
      animations: imported.animations.map((clip) => ({
        ...clip,
        loop: true,
      })),
    };

    this.skeleton = validateSkeleton(definition);
    this.rendererAdapter = new Phaser4RendererAdapter(this, this.skeleton);
    this.firstPlayback = createClipPlayback(definition.animations[0]);
    this.secondPlayback = createClipPlayback(definition.animations[1]);

    const statusElement = document.querySelector<HTMLElement>("#demo-status");
    const blendInput = document.querySelector<HTMLInputElement>("#blend-weight");
    const swapButton = document.querySelector<HTMLButtonElement>("#swap-style");

    if (!statusElement || !blendInput || !swapButton) {
      throw new Error("Phase 1 demo controls are missing.");
    }

    this.statusElement = statusElement;
    this.blendWeight = Number(blendInput.value);

    blendInput.addEventListener("input", () => {
      this.blendWeight = Number(blendInput.value);
      this.updateStatus();
    });

    swapButton.addEventListener("click", () => {
      this.useAlternateStyle = !this.useAlternateStyle;
      swapButton.textContent = this.useAlternateStyle
        ? "Use cyan arm"
        : "Use magenta arm";
      this.updateStatus();
    });

    this.updateStatus();
  }

  update(_time: number, delta: number): void {
    this.firstPlayback = advanceClipPlayback(this.firstPlayback, delta);
    this.secondPlayback = advanceClipPlayback(this.secondPlayback, delta);

    const selections = this.useAlternateStyle
      ? new Map([[STYLE_SLOT_ID, ALT_ARM_ATTACHMENT_ID]])
      : new Map<string, string>();

    const firstPose = evaluateClipPlaybackPose(
      this.skeleton,
      this.firstPlayback,
      selections,
    );
    const secondPose = evaluateClipPlaybackPose(
      this.skeleton,
      this.secondPlayback,
      selections,
    );

    const blendedPose = blendSkeletonPoses(
      firstPose,
      secondPose,
      this.blendWeight,
    );

    this.rendererAdapter.applyPose(blendedPose);
  }

  private updateStatus(): void {
    const style = this.useAlternateStyle ? "magenta" : "cyan";
    this.statusElement.textContent =
      `Blend ${Math.round(this.blendWeight * 100)}% · ${style} style`;
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game",
  width: 640,
  height: 480,
  backgroundColor: "#11151c",
  scene: Phase1DemoScene,
});
