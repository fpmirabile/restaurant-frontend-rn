# TP Aplicaciones distribuidas - Frontend

This frontend has been done in `React-Native v0.7` for the 2nd semester of 2022.
This app is about food delivery, the concept behind this is that **restaurant owners** can sign up and afterwards register their restaurant with different kind of menus. **Clients** users will be able to login through the Google SSO and request different menus from those restaurant and pay through the app.

## Developers (Group 2):

- Mirabile Fernando
- Shevchuk Calo Miguel Omar
- Nicolas Gastiazoro
- Lucas Bollela

### TL (Professors)
- Mazzeo Christian Alejandro
- Timerman Joaquin

## Installation

I'd strongly suggest to follow react-native tutorial for this, you can look at [it at this link](https://reactnative.dev/docs/environment-setup). Be sure that you select CLI installation, this repository is **NOT using Expo**.

## Running the project

Execute in a terminal `npx react-native start` to start metro bundler. Now, you will need to start your android/iOS emulator and then in another terminal run `npx react-native run-android` or `npx react-native run-ios`.

## Troubleshooting

#### SDK Location not found
If you are running `npx react-native run-android` and you see the following error:
```
* What went wrong:
Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
> SDK location not found. Define location with an ANDROID_SDK_ROOT environment variable or by setting the sdk.dir path in your project's local properties file at 'E:\Projects\Facultad\distribuidas\frontend\android\local.properties'.
```

A quick fix could be in your local machine, go where you cloned this project and then inside `./android` folder create a file called `local.properties` and place inside
- For windows users: 
```
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```
- For mac users:
```
sdk.dir = /home/USERNAME/Android/Sdk
```

Remember to validate the path in your local machine, since the username changes based on your OS.