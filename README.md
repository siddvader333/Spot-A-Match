## Project Description

For a copy of our proposal, visit the following document: https://docs.google.com/document/d/1m3dWc-WHRjjtKWWPv9tSuvQWSDL-dqsjEB5UyhhWCuE/edit?usp=sharing

## Milestone 1 Notes

* The project description specified that we needed to have a user and an admin login, with specific credentials. However, in our application, we instead have a different hierarchy: normal and premium users. Furthermore, the login for our future application will eventually be done directly through Spotify. Through discussion with our TA, we agreed that implementing a login function that will eventually be completely removed anyway would not be conductive to our learning in this course, nor a wise use of our time. Thus, our authentication between the two types of users is done through a simple button click, and a cookie is used within the application to differentiate between the two user types. 

* Please ensure you have cookies enabled, or the application may not work properly. If running on localhost:3000 does not work, try running on 127.0.0.1:3000. 

## Milestone 1 Instructions

1. Run npm start to begin our application.

2. Our homepage has 2 buttons: "Log in with Spotify" will take you to our normal user mode, and "Log in as PRO" will take you to our premium user mode. 

3. Once entering the application, three images will show up. 
* The first will take you to a private session, where you will be paired with one other user. 
* The second will allow you to join a room, where a "host" will control the music and you can listen along. 
* The third will allow you to host a room, where you control the music for those who join your room. Note that this third feature is only available for premium users; if a normal user tries to access this, they will be greeted with a message barring them from entering without premium credentials. 

4. On every page in our application after loging in, the user can open the menu from the button in the top-left corner. Within the menu, they will be able to search for a song (press "Enter" to actually search), view their profile, upgrade to premium, and log out. Note that, for now, clicking "upgrade to premium" simply changes the user to a premium user. 

5. When joining a private session, you will be paired with one another user. 
* At the left of the screen, you will have the option of adding songs to your shared queue, and any songs added to the queue (that aren't currently playing) will be displayed in the "up next" list. 
* At the right of the screen is a chat box, where you can talk with the other user. Simply typing a message and pressing "Enter" allows you to send a message. For now, the "other user" will immediately reply with a generic message. Above each message will be the name of the sender, which will be important when implementing group chats (see below). 
* At the bottom of the screen is the current playing song, along with options to pause and skip songs. Skipping songs will update the currently playing song, and remove it from the "up next" queue. Finally, the button in the top right corner allows you to leave the private session. 

6. Joining a room works almost identically, with three notable differences: first, the private chat is replaced by a group chat, allowing everyone in the room to talk with each other. Second, users can now only request songs (from the host), rather than adding songs themselves. Finally, the option to pause and skip to the next song are removed. 

7. Hosting a room is very similar to joining a private session, with some differences being a group chat (rather than a private chat), and the ability to approve user requests for songs. The host can also see how many users are listening, which users are listening, and can remove/ban users from the room. The host also gets a list of song suggestions as well, and can choose to add them or remove them. 
