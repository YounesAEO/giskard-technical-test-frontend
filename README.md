# Giskard AI Technical Test

-   The frontend implementation of Giskard AI technical [test](https://giskard.notion.site/Technical-exercise-Full-stack-software-engineer-0c3ff2e612994e2183abd7b7330b5f9a)

## To-do List

### Config

-   [x] set up react app using vite
-   [x] set up tailwindcss

### Availability Page

-   [x] create UI to specify availabilities
    -   UI inspired from Cal.com
    -   [x] add toggle component
    -   [x] add time-picker component
    -   [x] integrate components to the global availabilities UI
    -   [x] apply checks on dates
-   [x] connect to backend API
    -   [x] set up axios
    -   [x] implement post request
-   [x] create UI to update availabilities
-   [x] connect to backend API
-   [x] fix visual bug in availabilities UI

### Reservation Page

-   [x] implement UI to list available time slots
-   [x] connect to backend API
-   [x] implement routing
-   [x] implement UI to add a reservation
    -   [x] add UI to choose date of reservation
    -   [x] add model to fill in the reservation details
-   [x] connect to backend API
-   [ ] implement UI to delete a reservation
-   [ ] connect to backend API

### To Run Locally

1. clone repo: `git clone https://github.com/YounesAEO/giskard-technical-test-frontend.git`
2. install dependencies: `npm install`
3. add the follwing env variables in a .env file: `VITE_BASE_ENDPOINT=http://localhost:[API_PORT]/api/`
4. run project: `npm run dev`
