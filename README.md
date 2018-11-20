## Simple Launch Darkly Feature Flags Implementation

A simple implementation of LaunchDarkly's feature flags product using a basic React App to model a list of some of my favorite foods (and one of my wife's favorite foods. I'll let you guess which one isn't mine!)

### Usage

- Clone the repo

- run `npm start`

- Navigate to your local host. Should be port 3000. (localhost:3000)

- Click between the basic sort and sort by date functionality.

To test targeting, I've added a few users and purposefully left all but one of them out of the key. Feel free to add the following user ids to the key to confirm that individual targeting works:

'geo'
'pos'
'pty'
'lax'
'aua'
'cur'
