# Getting Started

Getting started user guide, this document should help you learn about the app.
You can read the [README.md](https://gitlab.com/stegappasaurus/stegappasaurus-app/blob/master/README.md)
to see how to get the app running.

This app relies on using a RESTful API which runs on Google Firebase to do the encoding and decoding.
The project which contains the code for this API exists [here](https://gitlab.com/stegappasaurus/stegappasaurus-api).
The API is what actually encodes and decodes our images. So any changes required to the actual steganography logic
should be done there

## Project

### Project Structure

Most of the code resides with the `src` folder;

* actions: Are things that the app can do, such as auto toggle the dark theme
* assets: Include things like fonts and images
* components: Are React components that can be shared between multiple views
* data: Is content to fill view with such as questions for FAQ
* modules: Commonly defined things in the app such as fonts and colours
* redux: The redux reducers, store and actions
* views: All the different "pages" the user can see/navigate too in the application.

```
├── __mocks__
├── __tests__
├── .gitlab
├── @types
├── android
├── docs
├── ios
├── src
│   ├── actions
│   ├── assets
│   ├── components
│   ├── data
│   ├── modules
│   ├── redux
│   ├── views
│   └── MainApp.tsx
├── util
├── .buckconfig
├── .env
├── .gitignore
├── .gitlab-ci.yml
├── .watchmanconfig
├── app.json
├── App.tsx
├── babel.config.js
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── docker-compose.yml
├── Dockerfile
├── jest.config.js
├── LICENSE
├── metro.config.js
├── package.json
├── ReactotronConfig.js
├── README.md
├── tsconfig.json
└── tslint.json
```

## Style Guide

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

#### Module Resolver

We are using the babel module resolver (typescript aliases and jest module mapper), so that the `~` (tilde) maps to src.
So avoid long relative paths prefer to use `~` instead.

```typescript
// Wrong
import ImageMessage from "../../../../components/ImageMessage";

// Right
import ImageMessage from "~/components/ImageMessage";
```

### Arrow Functions

If you can use normal functions only define arrow functions if the function needs to be bound.

```tsx
  public render() {
    return (
      <View>
        <FlatList
          data={this.padData(this.state.photos)}
          keyExtractor={(item, index) => item.uri + index}
          numColumns={3}
          onEndReached={this.morePhotosFromCameraRoll}
          onRefresh={this.handleRefresh}
          renderItem={this.renderPhotosFromCameraRoll}
          refreshing={this.state.refreshing}
        />
      </View>
    );
  }

  public async componentDidMount() {
    setTimeout(async () => {
      await this.getPhotosFromCameraRoll();
    }, 1000);
  }

  ...

  private handleRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getPhotosFromCameraRoll();
  };
```


### Function Ordering

Prefer to keep the render function as the first function and everything after it.

```tsx
  // wrong
  public async componentdidmount() {
    settimeout(async () => {
      await this.getphotosfromcameraroll();
    }, 1000);
  }

  public render() {
    return (
    );
  }
```

```tsx
  // right
  public render() {
    return (
    );
  }

  public async componentdidmount() {
    settimeout(async () => {
      await this.getphotosfromcameraroll();
    }, 1000);
  }
```

## Code Coverage

If you do make a change make sure to update the unit tests they must always pass,
you must also keep the code coverage higher or the same it cannot be lower as a result
of your change. You can run `yarn run coverage` so see the coverage, when the table is 
generated look at the `% Stmts` and `All files` number.