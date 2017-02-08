# expense-tracker

## Usage
### In separate terminal windows
Create a new mongo server instance
>```
mongod
```

Start up frontend development server
>```
cd client/
npm start
```

Start up backend server
>```
cd server/
npm start
```

# Documentation & High-Level Design Choices
## Author's Note & Current Application Functionality
**Currently Supports:** multiple users, login/logout, sessions, add expenses, get expenses, roles <br/>
**In Dire Need Of:** update expense, delete expense, generate report, more tests <br/>
**Would Be Great:** form validation <br/>

If it's not obvious already, I will say that I likely did spend more than six hours on this. Clean code is often not rushed. A lot of time sunk more so in design decisions and deciding appropriate tools to use. What follows is an explanation of how I would go about implementing the **In Dire Need Of** section from above. Skip below if not interested.

Update expense and delete expense could be simple CRUD requests made to the server and db with the id of item you're interested in; roles explained below. Report generation seems to be a simple filter through the expenses displayed, sorting by time, splitting into weeks, and getting the average amount spent per week. Testing on the frontend uses Jest, would definitely add more unit tests for components, unexpected delays out of routing bits make unit tests somewhat difficult with time constraints. Backend testing done on mocha, currently only supports testing for authorization routes, further testing again sacrificed for time.
 
## Overview
### Frontend
Built using Reactjs, and [create-react-app](https://github.com/facebookincubator/create-react-app). Defaulted to communicate with a server at localhost:3001; can be changed by providing an environment variable SERVER on start up. Structure follows that of a typical React application. Has two helper files -- `Requests.js` which contains functions for all network requests and `utils.js` which handles jwt token operations, All other files are React components. Sessions and routing by storing an jwt token in local storage. More on that below.

### Backend
Built on a Nodejs Express server and communicates with a Mongo database. Mongo was prime choice because it just so happens to be the noSQL database that the author is most familiar with (This is a choice made with the interest in time). A noSQL database is used based on the assumption that the data will remain largely nonrelational, implicating potential efficiencies gained by using a faster noSQL database vs an SQL; also handles variable size of description field for an expense quite well.
Nothing super interesting about structure here. Entry point is `server.js`.

## Security and Stuff
### Passwords
Passwords are protected via bcrypt and salting. 

### Sessions
Sessions are implemented using a jwt token created on server-side and passed to the front-end on login/signup. It's important to note that they don't expire. They are currently removed only when logging out. The contents of the token itself only carry the users' username. The front-end **will** allow a user entry to the frontend if they have anything stored in local storage under the label 'expense-tracker'. Any restricted resources requested from serverside will however require a valid token there, 403 otherwise. Important to note, a "valid token" is defined as a token that can be decoded and contains a username that exists inside the database. The token itself is only protected by a simple hash, can be cracked, and dangerous if stolen. There was some consideration for using Passport, decided on a custom implementation in the interest of familiar ground and time constraints.

### Roles
Roles are defined only when requesting a resource/service from the server. Everytime a potentially restricted request is made, the server retrieves the username from the token, and cross references with the database to see if the user is an admin or not,there afterwards providing the appropriate resource or 403. The advantage to this is that the frontend then has no concept of roles, there is no state kept to determine whether one is an admin and thereby eliminates any opportunity to manipulate that. The tradeoff is that you have to do an extra check on the database each time. Future implementations may involve a caching system so multiple checks will not be necessary. Consider database connection pooling.

## Lastly
I understand that feedback is an incredibly expensive resource to dole out and is not to be expected from the hiring party. It is however, immensely useful for the personal growth of the candidate and helps to smooth out future hiring processes and thereby reduce job-search durations overall. With that in mind, this author very selfishly requests awesome feedback -- I definitely enjoyed working on this, and would love to know how your team would have went about it's implementation details.
