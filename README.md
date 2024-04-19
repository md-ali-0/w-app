# Weather Application

This is a simple weather application built with Next.js. It allows users to check the current weather conditions for different locations.

## Features

-   **Current Weather:** Users can view the current weather conditions for a specific location.
-   **Search:** Users can search for weather information by entering a location.
-   **Forecast:** Five Day Forecast information Update for a specific location.
-   **Responsive Design:** The application is designed to be responsive and accessible across various devices.

## Technologies Used

-   **Next.js:** Next.js is used as the framework for building the application.
-   **React:** React is used for building the user interface components.
-   **OpenWeatherMap API:** The OpenWeatherMap API is used to fetch weather data for different locations.
-   **CSS:** Tailwind CSS for styling the application.

## Getting Started

To run this application locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/md-ali-0/w-app.git
    ```

2. **Install dependencies:**

    ```bash
    cd weather-application
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory of the project and add your OpenWeatherMap API key:

    ```
    NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your-api-key
    ```

    Replace `your-api-key` with your actual OpenWeatherMap API key.

4. **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

-   Enter the name of a location in the search bar and press Enter or click the search button.
-   The application will display the current weather conditions for the entered location.
-   To check weather conditions for another location, simply enter a new location in the search bar.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
