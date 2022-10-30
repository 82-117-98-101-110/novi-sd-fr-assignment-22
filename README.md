# Ravel

This document is meant to get started with this project.

## Setting up project environment

Before running or building the application, setup the project environment by following the steps below.

To install the required dependencies, run the command

```
npm install
```

You can now run or build de application.

## Run with Docker

To create and run the Docker image locally, first [download Docker Desktop](https://www.docker.com/get-started).

To build an image, run the following command...

```
docker build --tag ravel-frontend:1.0 .
```

And to run the image...

```
docker run --publish 80:80 ravel-frontend:1.0
```

You can now access the project by visiting `http://localhost`.

## Run localy from project directory

In the project directory, you can run:

```
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

## Available Scripts

In the project directory, you can run:

```
npm start
```

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

```
npm test
```

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
npm run build
```

Builds the app for production to the `build` folder.
sd
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

## Settings for WebGL

### photonMode

To use the correct Photon AppId, a mode can be set. The mode will correspond certain settings when Unity Canvas will be mounted.

```
Development = 0
```

### Environment URL

Besides setting a mode, it's possible to pass a specific API URL.
