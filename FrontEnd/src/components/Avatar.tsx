type AvatarProps = {
  initials: string;
  color: "orange" | "blue" | "red";
  size?: "small" | "normal" | "large";
};

export function Avatar({ initials, color, size = "normal" }: AvatarProps) {
  return (
    <div className={`avatar avatar-${color} avatar-${size}`}>{initials}</div>
  );
}
