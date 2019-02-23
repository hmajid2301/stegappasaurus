import React from "react";

import MarkdownModal from "~/components/MarkdownModal";
import termsOfUse from "./markdown/termsOfUse";

const TermsOfUse = () => (
  <MarkdownModal name="Terms of Use">{termsOfUse}</MarkdownModal>
);

export default TermsOfUse;
