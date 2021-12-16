# Notes

When I started this asssignemnt I thought I was pretty good at React-native and TypeScript. However this assignment has honestly humbled me and I have to admit that I probably am not as good a developer as I thought.

Realistically i have spent around ~30 hours to complete this assignment.

I have done all my styling as inline styling, as I've done very little styling at all so not much point in making dedicated styles, not that I can't

As this is a TEST assignment and not something to be deployed for production i have chosen, to not use SECRETS or DOTENVs, it's not that i don't know how to use secrets in a project, it just didn't make much sense to use in this test assignment.

Some of the persisting issues that I haven't been able to solve:

- animation on the splash screen. I tried animating the view on the return of the useEffect hook, however this had no effect. I have then tried the cardStyleInterpolator forfade as well as using options on close and so on to no avail. I sadly cannot figure out how to make the animation work so any pointes would be appreciated!
- Push Notifications. I struggled with these the most, and I can't seem to get them right. The deep links work, but in it's current implementation it requires the user to be in the mounted chat screen component for them to recieve notifications, which isn't ideal. I'm a bit at a loss but i was thinking about storing the chatrooms with context api and then checking in root of application if the user is subscribed to notifications on a given chatroom, but I still don't think this solves the issue. Again I would greatly appreciate pointers on this.
