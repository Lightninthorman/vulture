# Vulture

### Link To App:
[Vulture](https://fathomless-earth-14807.herokuapp.com/dashboard)

### Tools
Node.js, Mongoose, Express, EJS, bcrypt, Express-Session, Bootstrap, AJAX

### Concept
Vulture was an idea that a colleague of mine had years ago while working in a large company. He wanted a way to be alerted and to alert others of leftover food from meetings that is up for grabs.

Every day there were multiple meetings throughout our building and others on the campus, and for most of those meetings someone would order food and/or drinks.

The food would eventually be moved to a common area for the rest of us to scavenge if we stumbled across it, or were lucky enough to be part of the email chain announcing food.

With Vulture one quick post and everyone will be able to come clean up.

### About the App
_Note:_ My wife has kindly informed me that due to health codes this app is totally not allowed because a company can't offer food that's been sitting out for extended amounts of time.

The name Vulture has connotations that I think can be vulgar at times just due to the way they look, and what they do. I leaned into the vulgarity while also trying to make it seem like it wasn't.

What do I mean? Let's check out the app and you decide.

##### Login / Sign Up
User's must sign up or login first to access the app.

##### Dashboard
The dashboard will show some simple details about the location of any leftovers. I call them carcasses. Keeping with that vulture theme... They are represented as gravestones.

The right side of the screen has a representation of the current building with ox skull icons to indicate at a quick glance what floor has food on it. If you hover over the icon an info box appears to tell you which room number and the room name if it was provided.

If you click the carcass gravestone or the skull icon a modal pops up with details about the carcass.

In the modal users can add comments to let everyone know what they think about the food. Somehow it will devolve into political/religious arguments I'm sure.

If you created the carcass an edit button appears at the top of the modal so you can make updates or delete it.

##### New Carcass
To create a new carcass, click on the "Claim New Carcass" button on the dashboard.

I envision this being part of some company system so they will pre-populate the dropdown menus according to their building(s) and floors. Details and Room name are optional here, the rest are necessary.

When you create a new Carcass it automatically has an expiry set for 3 hours and will be deleted after that. This means you don't have to manually delete all of your posts. After 3 hours it's safe to assume only the garbage like oatmeal cookies are left.

### Challenges
I struggled a lot at first with creating the login and sign up modals. These initially were Express routes that rendered new pages. i.e you click on the login or sign up button and it takes you to a new login or sign up page. I wanted the action to happen in the modal and even played with iframes for a while until I realized that AJAX would be my answer.

Along the lines of the modal, which I used again in the dashboard, I had to change the design of my EJS pages. I began the project by making all individual pages for each route, but once I started incorporating the different routes, like the post route for comments, into the modal and not it's own page, I eventually realized how to use the EJS files effectively.

Styling was also a challenge, but mostly because I was teaching myself bootstrap and tried as best as I could to use it for most styling.

### Future Improvements
I'd like to create a building database that we can store all the buildings associated with a company and the # of floors in those buildings. Then on the dashboard users can select which building they want to see, and that will change the building diagram based on the number of floors as well as the carcasses they see. It will also be used to populate the dropdown menus in the new and edit pages.
