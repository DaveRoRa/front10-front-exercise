# FRONT10 TECHNICAL EXERCISE (DEV)

See the developer notes at the end.

## Technologies used

 - Being a react based project, it was created using [create-react-app](https://create-react-app.dev/), so it includes all the basic scripts for a react app.
 - The component library used was [Material UI for React](https://mui.com/) in its major version 5, including [material-icons](https://mui.com/material-ui/material-icons/), [material datepickers](https://mui.com/x/react-date-pickers/getting-started/) and the corresponding libraries that material uses for stylin, based on [emotion](https://emotion.sh/docs/introduction).
 - For working with dates, [moment.js](https://momentjs.com/) library was included.
 - All dependencies were installed using [yarn package manager](https://yarnpkg.com/).

## Installing the project
After cloning the github repository in your local environment run 
### `yarn`
in the root directory to install all the depencies needed to run the app.

## Available Scripts

In the project directory, you can run:
### `yarn start`
To run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `yarn build`
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

### `yarn eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.
  

### Developer Notes

- The city selector component displays images but they might take some seconds to charge depending on the client internet speed.

- There's a style issue with cities selector component **Multiselect**, it grows to a multiline form and it was taking too long to fix the issue, so I thooght it was not worth the time-result ratio.

- I could'nt figure out what happened when the form was submitted because the site always notified me that my country was restricted to do such action, so I just mocked it with a dialog and console logged  the form values.