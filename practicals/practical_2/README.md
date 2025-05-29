## Practical report 

### Initialize the Project

Create a new Expo app using the TypeScript template:

```jsx
npx create-expo-app -t expo-template-blank-typescript auth-magic-link
cd auth-magic-link
```

### Installation

Run the following command to install the required dependencies:

```jsx
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed
```

### Run the Application

To run the application, use the following command:

```jsx
npm start
```

## What I Have Done

### Authentication strategies

In this practical session, I created an authentication system using Supabase in my React Native Expo project. I built two main login options:

- Login with Email and Password:
    - I created a page where users can enter their email and password to either sign in or sign up. If users are not registered, they can create a new account using the same form.

- Login with Magic Link:
    - I implemented another option where users can receive a magic link via email. When the user clicks on the link sent to their email, they are automatically logged into the app without entering a password.

I also connected the login pages to Supabase authentication services using the Supabase client.

Navigation between the landing page and login pages was handled using React Navigation.

## What I Have Learnt

Through this practical work, I learned how to implement different user authentication methods using Supabase with React Native Expo.
I understood how to:

- Use Supabase's authentication API to sign in users with email and password and send magic login links.

- Create and manage user sessions securely using AsyncStorage.

- Build responsive and user-friendly login screens with proper form handling.

- Manage navigation between screens using React Navigation, ensuring smooth transitions between the landing page and login pages.

- Handle loading states and error messages properly to improve the user experience.

- Structure a React Native project by separating logic and UI components clearly.

##  What Challenges I Have Faced

While working on the email/password and magic link login functionalities, I faced several challenges:

- **Navigation Errors:** When trying to navigate between the landing page and the login screens, I received errors like "The action 'NAVIGATE' with payload... was not handled by any navigator." It happened because the screen names were not correctly registered or matched.

- **Setting Up Supabase:** Initially, I had trouble correctly configuring Supabase with React Native Expo, especially handling AsyncStorage for managing sessions.

- **Authentication Errors:** Sometimes, signing in or signing up users gave unexpected errors due to missing fields or incorrect usage of Supabase functions.

- **Handling Loading States:** Managing the app's UI while the authentication requests were loading was tricky. Without proper handling, users could click multiple times, causing errors.

## How Did I Overcome

During the implementation, I faced several challenges, especially related to screen navigation and authentication errors.
To overcome these challenges:

- I carefully reviewed the navigation setup, ensuring that all screens were correctly registered and the screen names matched exactly.

- I referred to the official Supabase documentation and React Navigation documentation whenever I was stuck.

- I used console logs and Alert pop-ups to debug problems step-by-step instead of trying to fix everything at once.

- When authentication errors occurred, I double-checked the Supabase client setup and verified that I was using the correct API methods (signInWithPassword).

- I tested each small feature separately, which made it easier to isolate and fix bugs quickly.

- I also refactored and cleaned up my code as I progressed, which helped me maintain a better project structure and made debugging easier.