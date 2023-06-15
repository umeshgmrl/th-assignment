# Tigerhall Content Cards

Tigerhall Content Cards is a dynamic and responsive project built using React.js, Vite.js, Chakra-UI, and managed with Yarn.

Demo is live at https://th-assignment.vercel.app/

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and Yarn/npm](https://nodejs.org/en/download/).
- You have a basic understanding of React.js and JavaScript.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/umeshgmrl/th-assignment
cd th-assignment
```

To install dependencies, run:

```bash
yarn install
```

## Running the Application

To start the application in the development mode, run:

```bash
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Building the Application

To build the application for production, run:

```bash
yarn build
```

This will create a `dist` folder with the production-ready app.

## Deploying the Application

To deploy the application, you will need a service like Netlify, Vercel, or GitHub Pages. Here is a simple guide to deploy on Netlify:

1. Push your `dist` folder to your repository.

```bash
git add .
git commit -m "First commit"
git push -u origin main
```

2. Visit [Netlify](https://netlify.com/) and click on "New site from Git".
3. Choose GitHub and select your repository.
4. In the build command, put `yarn build` and publish directory as `dist`.

Your site will be live once the deployment is done.

You can also deloy it to Vercel using below button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/umeshgmrl/th-assignment)

## Testing

For running tests in the project, use the command:

```bash
yarn test
```

## License

This project is open source and available under the [MIT License](LICENSE).

Make sure to replace the `username` in the clone URL with your actual GitHub username.

This README provides basic installation, build, deployment, and testing instructions for your project. It can be expanded upon to include more specific usage examples, screenshots of the application, and other helpful information.
