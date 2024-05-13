## Questions

### Please provide instructions on how to run your project in a bulleted list below.

- `docker compose up -d` to get the database going
- `npm install` in the root folder
- `npm run build` in the root folder (to build the UI) - if this fails, please check to see if you have at least
  version 20 of node installed and as your current version.
- `npm start` in the root folder
- Navigate to `localhost:3000`
- Enjoy!

### Were there any pieces of this project that you were not able to complete that you'd like to mention?

I am not sure I'd say there is anything I was not able to complete - I believe my program fulfills all the criteria.

### If you were to continue building this out, what would you like to add next?

#### User facing

- Some kind of auth
- Letting someone see all their accounts as soon at they hit the page instead of having to know their account numbers
- Transfer money between accounts
- Open new accounts
- Close accounts
- Transactions list

#### Dev related

- TypeScript - I was having trouble getting `tsc` working with both the server and the client, so I scrapped it for this
  example. I'd love to add that back in.
- Infrastructure - Node / Express / Sequelize was the fastest I could get going, so I went with that. I would
  investigate if any of these have been replaced with something better (it has been 5 years or so since I needed to set
  up a node server). I also feel like create-react-app is probably not the most up to date, but it worked for what I was
  doing.
- Tests - I did not write tests, but with the multi-step checking of many things in the server, those should be broken
  out and tested.

### If you have any other comments or info you'd like the reviewers to know, please add them below.

This was a fun exercise, and I felt like it was more indicative of what I would actually work on than most take home
projects (and especially live coding exercises).