## Gojek App Clone
### Overview
This repository contains a Gojek app clone built using React Native with Expo framework. The application replicates core functionalities of the Gojek app, including user onboarding, and service browsing.

### Features

- Interactive onboarding carousel with paginated image slides
- User authentication system with OTP verification
- Country code selection interface
- Navigation between different screens and components
- Responsive UI design adapting to various device dimensions

### Technologies Used

- React Native: Core framework for cross-platform mobile development
- Expo: Development environment and build tools
- React Navigation: Navigation library for screen transitions
- React Native Country Picker Modal: Component for country code selection
- React Native Confirmation Code Field: Component for OTP input
- ScrollView with Ref: Implementation for carousel functionality

### Implementation Details
### Onboarding Carousel

The app implements a smooth image carousel in the onboarding screen using:

- React's useRef hook to maintain a reference to the ScrollView
- ScrollView with pagination and snap functionality
- Dynamic indicator dots that highlight the current slide
- Precise centering of images with snap alignment and interval controls

### Navigation
Screen transitions are managed through:

- React Navigation's navigation hooks

### UI Components
Custom-built UI components include:

- Styled buttons with different visual states
- Interactive carousel indicators
- Form input fields with validation
- Modal dialogs for country selection

### Setup and Installation

1. Clone the repository

2. Install dependencies:

   npm install

3. Start the development server:

   npx expo start


### Dependencies installation

1. react-native-confirmation-code-field

   `npm install react-native-confirmation-code-field `

2. react-native-country-picker-modal

   `npm install react-native-phone-input react-native-country-picker-modal`