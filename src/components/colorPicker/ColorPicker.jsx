import { useState } from "react";
import { HexColorPicker } from "react-colorful";

import styles from "./ColorPicker.module.css";

export const ColorPicker = ({ color, onChange }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className={styles.picker}
      style={{ background: color }}
      onClick={() => setOpen(!isOpen)}
    >
      {isOpen && <HexColorPicker color={color} onChange={onChange} />}
    </div>
  );
};
