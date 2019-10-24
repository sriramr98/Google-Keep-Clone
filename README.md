# Google Keep Clone (In progress)

This is a simple but detailed clone of Google Keep. Technologies used are

- Typescript
- React
- Redux
- Redux-Saga
- Firebase
- Material UI

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have the following pre requisites before getting started

- NodeJS (LTS)
- Firebase Account
- Knowledge on Redux and Redux Sagas

### Installing

#### Firebase Setup

- Log on to [firebase](https://console.firebase.google.com)
- Create a new project
- Create a new app in the project
- Add the following env variables to .env file

```
REACT_APP_FIREBASE_API_KEY={apiKey}

REACT_APP_FIREBASE_AUTH_DOMAIN={authDomain}

REACT_APP_FIREBASE_DATABASE_URL={databaseUrl}

REACT_APP_FIREBASE_PROJECT_ID={projectId}

REACT_APP_FIREBASE_STORAGE_BUCKET={storageBucketURL}

REACT_APP_FIREBASE_MESSAGING_SENDER_ID={messagingSenderId}

REACT_APP_FIREBASE_APP_ID={appId}
```

#### Remove Git Origin and transfer git to your repo (Optional)

If you want to remove my previous git commits and start with this repo with new commits

```
git remote rm origin
```

Then add your origin remote and start working

#### Start Dev Server

Start coding by running

```
yarn start
```

## Built With

- [Typescript]() - The amazing Typescript language used.
- [ReactJS](https://reactjs.org/) - The frontend web framework used
- [Firebase](https://console.firebase.google.com) - Authentication
- [Redux](https://redux.js.org/) - React State Management
- [Redux Saga](https://github.com/redux-saga/redux-saga) - Redux Side Effects
- [Material UI](https://material-ui.com/) - UI Framework for Material Design

<!-- ## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) ( In progress ) for details on our code of conduct, and the process for submitting pull requests to us. -->

## Versioning (no versions out yet)

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/sriramr98/Google-Keep-Clone/tags).

## Authors

- **Sriram R** - _Initial work_ - [Github](https://github.com/sriramr98)

See also the list of [contributors](https://github.com/sriramr98/Google-Keep-Clone/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Login Modal UI Inspired from [Florin Pop Double Slider Tutorial](https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/)
