import React from "react";

import MarkdownModal from "~/views/Settings/MarkdownModal";
import changelog from "./markdown/changelog";

const Changelog = () => (
  <MarkdownModal name="Changelog">{changelog}</MarkdownModal>
);

export default Changelog;
