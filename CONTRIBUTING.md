# Contributing

## Types of contribution

Three main ways to contribute to this project are;

* **Adding a new feature:**  Adding a new feature to the project i.e. encoding into audio files
* **Improving a feature:** Extend/improve an existing feature, such as a new algorithm for image encoding
* **Fix a bug:** We have a list of [issues](https://github.com/hmajid2301/Stegappasaurus/issues), or you can fix your own bug

## Commit Message

If you can try to a detailed commit message about what the change is doing. Don't worry about multiple commits they will be squashed (and rebased) into a single commit. Use GitMoji, https://gitmoji.carloscuesta.me/, in the commit header message.

## Code style

If you're editing an existing file, code style should be consistent with the rest of the code in the file. 
Using the Air BnB JS style guide, [Style Guide](https://github.com/airbnb/javascript). Run eslint to check the code style.

### Imports

Imports should be ordered alphabetically

* 3rd party imports come first
* Imports ordered by package name
* For our own imports sort by folder name then component name
* Then order the named imports

```js
import { Body, CheckBox } from 'native-base';
import React, { Component } from 'react';
import { connect } from 'react-redux';
```

Leave a space between third party and our own imports. 

```js
import { createAppContainer, createDrawerNavigator } from 'react-navigation';

import CustomDrawerNavigator from '~/components/CustomDrawerNavigator';
import About from '~/views/About';
import FAQ from '~/views/FAQ';
```

If the import line is too big (great than 100 characters) you can break into multiple lines,
with one named import on each line.

```js
import {
  Body,
  CheckBox,
  Picker,
  Right,
} from 'native-base';
```

## Workflow

We use the squash rebase workflow, [Workflow](https://blog.carbonfive.com/2017/08/28/always-squash-and-rebase-your-git-commits/)

## Licensing

Please note that the examples are all made available under the
[Apache License 2.0](https://github.com/hmajid2301/Stegappasaurus/blob/master/LICENSE),

## Getting help

If you need any help please free feel to get into contact with me.
