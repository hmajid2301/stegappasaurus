import React from "react";

import MarkdownModal from "~/views/Settings/MarkdownModal";
import privatePolicy from "./markdown/privatePolicy";

const PrivatePolicy = () => (
  <MarkdownModal name="Private Policy">{privatePolicy}</MarkdownModal>
);

export default PrivatePolicy;
