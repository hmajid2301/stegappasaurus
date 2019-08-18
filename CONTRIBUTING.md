# Contributing

## Types of contribution

Three main ways to contribute to this project are;

- **Adding a new feature:** Adding a new feature to the project, such as allow encoding of audio files alongside images
- **Improving a feature:** Extend/improve an existing feature, such as a small UI change
- **Fix an issue:** We have a list of [issues](https://gitlab.com/stegappasaurus/stegappasaurus-app/issues), or you can fix your own issue.

**Note**: Please do the following before raising an MR

- Raise an issue before creating an MR
- Name of the branch after the issue number you are fixing i.e. feature/#105
- Merge from the feature branch to the master branch(never to the `production` branch)

## Commit Message

If you can try to a detailed commit message about what the change is doing. Don't worry about multiple commits they will be squashed (and rebased) into a single commit. Use GitMoji, https://gitmoji.carloscuesta.me/, in the commit header message.

## Styling and Linting

We use a combination of prettier and tslint to do the code formatting and code linting for us.
Make sure the `yarn run code-formatter-check` and `yarn run lint` both pass before submitting an
MR.

### imports

Leave a single blank line between third party and our own imports.

```typescript
import * as React from "react";
import { View } from "react-native";
import { NavigationScreenProp } from "react-navigation";

import ImageMessage from "~/components/ImageMessage";
import Snackbar from "~/components/Snackbar";
```

## Workflow

We use the squash rebase workflow, [Workflow](https://blog.carbonfive.com/2017/08/28/always-squash-and-rebase-your-git-commits/)

## Licensing

Please note that the examples are all made available under the
[Apache License 2.0](https://gitlab.com/stegappasaurus/stegappasaurus-app/blob/production/LICENSE),

## Getting help

If you need any help please free feel to get in contact with me.
