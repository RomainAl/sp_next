import { funEmoji, identicon } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { memo, useEffect, useMemo, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type useAvatarType = { name: string; radius?: number; color?: string; size?: number; scale?: number };

export const UserAvatar = ({ name, radius = 0, color = "e57433", size = 128, scale = 100 }: useAvatarType) => {
  const ref = useRef<HTMLDivElement>(null);
  const avatar = useMemo(() => {
    return createAvatar(identicon, {
      seed: name,
      size: size,
      rowColor: [color, color, color],
      radius: radius,
      scale: scale,
    }).toString();
  }, [name, color, radius, scale, size]);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = avatar;
    }
  }, [avatar]);

  return <div className="size-fit" ref={ref}></div>;
};

export const UserAvatar2Memo = memo(function UserAvatar2({ name, radius = 0, color = "e57433", size = 128, scale = 100 }: useAvatarType) {
  const avatar = createAvatar(identicon, {
    seed: name,
    size: size,
    rowColor: [color, color, color],
    radius: radius,
    scale: scale,
  }).toDataUri();

  return (
    <Avatar className="flex size-full rounded-none">
      <AvatarFallback>{name}</AvatarFallback>
      <AvatarImage src={avatar} />
    </Avatar>
  );
});

export const InstaAvatar = ({ name, radius = 50, size = 32, scale = 100 }: useAvatarType) => {
  const avatar = useMemo(() => {
    return createAvatar(funEmoji, {
      seed: name,
      size: size,
      radius: radius,
      scale: scale,
    }).toDataUri();
  }, [name, radius, scale, size]);

  return (
    <Avatar>
      <AvatarFallback>{name}</AvatarFallback>
      <AvatarImage src={avatar} />
    </Avatar>
  );
};
