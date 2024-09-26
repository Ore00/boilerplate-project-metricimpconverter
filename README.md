
# Metric-Imperial Converter Project

This is the Metric-Imperial Converter project, part of the freeCodeCamp Quality Assurance certification. 
You can find the challenge details on the [freeCodeCamp website](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter).

## Project Overview

The Metric-Imperial Converter allows users to convert between metric and imperial units. 
Supported conversions include:
- Kilometers to miles
- Kilograms to pounds
- Liters to gallons

## Key Features

- Users can input a number with a unit and get the converted value in the corresponding unit.
- Supported units for conversion include kilometers, miles, liters, gallons, kilograms, and pounds.
- The API provides clear and concise results for valid inputs and handles invalid inputs gracefully.

## Technologies Used

- Node.js
- Express
- Mocha (for testing)
- Chai and Chai-HTTP (for assertions and HTTP requests testing)
- dotenv (for environment variable management)
- CORS (to handle cross-origin requests)

## Installation and Setup

To run this project locally, follow the steps below:

1. Clone this repository:
    ```
    git clone https://github.com/Ore00/metricimpconverter.git
    ```

2. Navigate to the project directory:
    ```
    cd imperial-metric-converter
    ```

3. Install the required dependencies:
    ```
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables (if needed):
    ```
    NODE_ENV=development
    ```

5. Start the development server:
    ```
    npm start
    ```

6. Run the tests to ensure everything is set up correctly:
    ```
    npm test
    ```

## API Endpoints

The following endpoints are available for interacting with the Metric-Imperial Converter API:

- **GET** `/api/convert?input={value}{unit}`: Convert a value from one unit to another.
    - Example: `/api/convert?input=10km` will return the converted value in miles.

## Example Usage

1. Convert kilometers to miles:
    ```
    GET /api/convert?input=10km
    ```

    Response:
    ```json
    {
      "initNum": 10,
      "initUnit": "km",
      "returnNum": 6.2137,
      "returnUnit": "mi",
      "string": "10 kilometers converts to 6.2137 miles"
    }
    ```

2. Convert liters to gallons:
    ```
    GET /api/convert?input=5L
    ```

    Response:
    ```json
    {
      "initNum": 5,
      "initUnit": "L",
      "returnNum": 1.32086,
      "returnUnit": "gal",
      "string": "5 liters converts to 1.32086 gallons"
    }
    ```

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
