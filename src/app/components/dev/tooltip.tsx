import { Tooltip, Button } from "@heroui/react";

export default function MyTooltip() {
  return (
    <div className="size-full">
      <Tooltip content="I am a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  );
}
