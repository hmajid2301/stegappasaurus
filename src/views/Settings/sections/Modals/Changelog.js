import React from 'react';

import MarkdownModal from '~/views/Settings/MarkdownModal';


const Changelog = () => (
  <MarkdownModal name='Changelog'>
    # Changelog {'\n\n'}

    All notable changes to this project will be documented in this file. {'\n\n'}

    The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
    and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html). {'\n\n'}

    ## [Unreleased] {'\n\n'}
  </MarkdownModal>
);

export default Changelog;
