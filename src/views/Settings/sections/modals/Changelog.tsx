import React from "react";

import MarkdownModal from "~/components/MarkdownModal";
import changelog from "~/views/Settings/content/changelog";

const Changelog = () => (
  <MarkdownModal name="Changelog">{changelog}</MarkdownModal>
);

export default Changelog;
