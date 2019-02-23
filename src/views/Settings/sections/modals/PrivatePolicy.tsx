import React from "react";

import MarkdownModal from "~/components/MarkdownModal";
import privatePolicy from "./markdown/privatePolicy";

const PrivatePolicy = () => (
  <MarkdownModal name="Private Policy">{privatePolicy}</MarkdownModal>
);

export default PrivatePolicy;
