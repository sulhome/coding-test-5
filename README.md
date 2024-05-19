
# Anagram Finder React App

## Introduction

This React application allows users to find anagrams of a given input string. It uses the Anagramica API to fetch the anagrams and displays the results to the user.

## Running the App
Use the following commands to run the application
```sh
npm i --legacy-peer-deps
npm run start
```

## Main Components

### App.js
The main component that sets up the basic structure of the application. It includes the input field and displays the list of anagrams or appropriate messages based on user input.

### InputField.js
A component responsible for rendering the input field where users can enter their strings. It handles input changes and communicates them back to the App component.

### AnagramList.js
This component receives the list of anagrams as a prop and renders them in a list format.

### Message.js
A component that displays a message to the user. It is used to show messages like "No anagrams found."

### useAnagrams.js
A custom hook that handles the fetching of anagrams from the Anagramica API using the `thingproxy` service to bypass CORS restrictions.

## How It Works

1. **User Input:** The user enters a string in the input field.
2. **Fetch Anagrams:** The `useAnagrams` hook fetches anagrams from the Anagramica API via the `thingproxy` service.
3. **Display Results:** The list of anagrams is displayed, or an appropriate message is shown if no anagrams are found.

## Anagram API

We are using the Anagramica API to fetch anagrams. Here is the base URL for the API:
```
http://www.anagramica.com/api
```
### Sample API Call
```
http://www.anagramica.com/best/leader
```
### Sample Response
```json
{
  "best": [
    "dealer",
    "leader"
  ]
}
```

## Why We Used Thingproxy

Due to CORS (Cross-Origin Resource Sharing) restrictions, browsers block requests to different origins that do not explicitly allow them. The Anagramica API does not include the necessary headers to allow cross-origin requests directly from the browser.

To overcome this, we use `thingproxy` as an intermediary. `thingproxy` forwards our requests to the Anagramica API and adds the necessary CORS headers to the response, allowing our React app to access the data without being blocked by the browser.

## Unit Tests

### App.test.js
Tests the main functionality of the application, including rendering components and handling user input.

### InputField.test.js
Tests the InputField component to ensure it correctly handles user input and calls the provided callback.

### AnagramList.test.js
Tests the AnagramList component to ensure it correctly displays the list of anagrams.

### Message.test.js
Tests the Message component to ensure it correctly displays messages.

### useAnagrams.test.js
Tests the `useAnagrams` hook to ensure it correctly fetches anagrams, handles loading states, and manages errors.

### Running the Tests

To run all the tests, use the following command:
```sh
npm test
```

## Future Improvements

1. **Pagination:** Add pagination to handle large sets of anagrams.
2. **Debounce Input:** Implement debounce to limit the number of API calls as the user types.
3. **Cache Results:** Cache the results of previous queries to reduce the number of API calls and improve performance.
4. **Better Error Handling:** Improve error handling to provide more detailed feedback to the user.
5. **Mobile Responsiveness:** Enhance the UI to be more responsive and user-friendly on mobile devices.

## Conclusion

This React app demonstrates how to use custom hooks, manage state, and handle asynchronous operations to build a functional and interactive user interface. The use of a CORS proxy like `thingproxy` is essential for handling cross-origin requests in a development environment.