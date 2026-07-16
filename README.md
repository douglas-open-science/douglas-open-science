# Instructions for local development of website

## Set up the site repositories
Into the same parent directory, clone both *douglas-open-science* and *open-measures* repositories:
```git clone https://github.com/douglas-open-science/douglas-open-science.git
git clone https://github.com/douglas-open-science/open-measures.git
```

## Host the site

### Option A: host via local install of Node.js
Install Node.js (version 22 or higher)

*further support for hosting via direct installation coming soon*

### Option B: host via Docker image
#### 1. Set up dependencies in your Docker image
With your Docker Engine already running, run
```docker compose run --rm docusaurus npm install
```
You will only need to re-run this command if a new dependency is added to `package.json`.
#### 2. Set up your local server
Run
```docker compose up
```
and wait for a message letting you know that http://localhost:3000/ is running. 

## View the site!
Navigate to http://localhost:3000/ in your browser: you should be able to see and interact with the site.

If you make local edits, you should see them reflected in the site as long as the local server is running. However, please note that the site may update slowly when hosted via Docker image.

*support for hosting the translated version of the site coming soon*