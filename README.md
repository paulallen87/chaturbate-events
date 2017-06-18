Chaturbate Events
=========

![build status](https://travis-ci.org/paulallen87/chaturbate-events.svg?branch=master)
![coverage status](https://coveralls.io/repos/github/paulallen87/chaturbate-events/badge.svg?branch=master)
![dependencies](https://img.shields.io/david/paulallen87/chaturbate-events.svg)
![dev dependencies](https://img.shields.io/david/dev/paulallen87/chaturbate-events.svg)
![npm version](https://img.shields.io/npm/v/@paulallen87/chaturbate-events.svg)


A client for parsing chaturbate-browser events.

## Installation

```shell
npm install @paulallen87/chaturbate-events
```

## Usage

```javascript
const browser = new ChaturbateBrowser();
const events = new ChaturbateEvents(browser);

events.on('room_message', (e) => {
  console.log(`${e.user.username}: ${e.message}`);
})

events.on('tip', (e) => {
  console.log(`${e.user.username} tipped ${e.amount} tokens`);
})

await browser.start();

browser.navigate('<username>');

setTimeout(() => browser.stop(), 10 * 1000);
```

## Events

  ### **app_error_log**
  Called when the Chaturbate app needs to log an error message.

  ##### params
  * **message** (string) - The error message to be logged

  ### **app_notice**
  Called when a notice needs to be posted to viewers.

  ##### params
  * **messages** (Array<string>) - a list of notices to display
  * **foreground** (string) - font color
  * **weight** (string) - font weight
  * **background** (string) - background color
  * **to** (?string) - optional specific recipient

  ### **app_tab_refresh**
  ???

  ### **away_mode_cancel**
  Called when "the broadcaster is away" has been canceled.

  ### **clear_app**
  ???

  ### **group_show_approve**
  Called when the broadcaster has approved a group show.

  ##### params
  * **tokensPerMinute** (number) - the number of tokens per minute

  ### **group_show_cancel**
  Called when a group show has been canceled.

  ### **group_show_request**
  Called when a viewer requests a group show.

  ##### params
  * **usersWaiting** (number) - the number of users waiting for the show
  * **usersRequired** (number) - the number of users required for a show
  * **tokensPerMinute** (number) - the number of tokens per minute for a show

  ### **hidden_show_approve**
  Called when a nidden show is approved.

  ##### params
  * **initialHideCam** (?) - ?

  ### **kick**
  Called when a viewer is kicked from the room.

  ##### params
  * **username** (string) - the username of the viewer that was kicked

  ### **leave_private_room**
  Called when a user leaves a private room.

  ##### params
  * **username** (string) - the username of the user that left

  ### **log**
  Called when the app wants to log a message.

  ##### params
  * **message** (string) - the message to log

  ### **message_change_request**
  ???

  ##### params
  * **subject** (string) - the new message subject???

  ### **personally_kicked**
  Called when YOU have been kicked from the room

  ##### params
  * **reason** (string) - the reason you were kicked

  ### **private_message**
  Called when you receive a private message

  ##### params
  * **tabNick** (string) - the name displayed in the chat tab
  * **user** ([UserObject](#user-objects)) - the user who sent the message
  * **message** (string) - the message the was received

  ### **private_show_approve**
  Called when a private show is approved.

  ##### params
  * **tokensPerMinute** (number) - the number of tokens per minute

  ### **private_show_cancel**
  Called when a private show is canceled.

  ### **private_show_request**
  Called when a private show is requested.

  ##### params
  * **requesterUsername** (string) - the username of the requester
  * **tokensPerMinute** (number) - the number of tokens per minute

  ### **promotion**
  Called when a user has been promoted to moderator.

  ##### params
  * **toNick** (string) - the usernae of the new moderator
  * **fromNick** (string) - the username of who performed the action

  ### **purchase**
  Called when an item has been purchased.

  ##### params
  * **message** (string) - the message of the purchase.

  ### **receive_tip**
  Called then YOU receive a tip.

  ##### params
  * **amount** (number) - the amount that was tipped
  * **fromUsername** (string) - the username of who tipped
  * **toUsername** (string) - the username of who received
  * **message** (string) - the tip message
  * **history** (boolean) - ???

  ### **refresh_panel**
  ???

  ### **revoke**
  Called when moderator privs have been revoked.

  ##### params
  * **toNick** (string) - the username of the former moderator
  * **fromNick** (string) - the username of who performed the action

  ### **room_count**
  Called when the room count is updated.

  ##### params
  * **count** (number) - the number of viewers in the room

  ### **room_entry**
  Called when someone enters the room.

  ##### params
  * **user** ([UserObject](#user-objects)) - the user who entered

  ### **room_leave**
  Called when someone leaves the room

  ##### params
  * **user** ([UserObject](#user-objects)) - the user who left

  ### **room_message**
  Called when a new user message was received by the room.

  ##### params
  * **message** (string) - the message that was received
  * **user** ([UserObject](#user-objects)) - the use who sent the message

  ### **settings_update**
  Called when the room settings have been changed.

  ##### params
  * **allowPrivates** (boolean) - if private shows are allowed
  * **allowGroups** (boolean) - if group shows are allowed
  * **minimumUsersForGroupShow** (number) - the minimum nuber of users needed for a group show
  * **privatePrice** (number) - the number of tokens for a private show
  * **groupPrice** (number) - the number of tokens for a group show
  * **spyPrice** (number) - the number of tokens to spy on a show

  ### **silence**
  Called when a viewer has been silenced.

  ##### params
  * **silencedNick** (string) - the username of who was silenced
  * **silencerNick** (string) - the username of who performed the action

  ### **tip**
  Called when a tip was received.

  ##### params
  * **amount** (number) - the number of tokens tipped
  * **user** ([UserObject](#user-objects)) - the user who tipped

  ### **title_change**
  Called when the room title has changed.

  ##### params
  * **title** (string) - the new title
  * **showInChat** (boolean) - if the update should be posted in chat

  ### **token_balance_update**
  ???

  ##### params
  * **usernames** (Array<string>) - ???
  * **tokenAmounts** (Array<number>) - ???

## User Objects

  This object represents a chatroom user.

  ##### Params
  * **username** (string) - The username of the user
  * **isHost** (boolean) - The user is the host of the room (gold color)
  * **isMod** (boolean) - The user is a moderator the room (red color)
  * **inFanclub** (boolean) - The user is a member of the fanclub (green color)
  * **tippedTonsRecently** (boolean) - The user has tipped a ton recently (dark purple color)
  * **tippedAlotRecently** (boolean) - The user has tipped a lot recently (light purple color)
  * **tippedTecently** (boolean) - The user has tipped recently (dark blue color)
  * **hasTokens** (boolean) - The user has tokens (light blue color)
  * **gender** (string) - The user's gender
  * **fontColor** (string) - The user's font color
  * **fontFamily** (string) - The user's font family

## Tests

```shell
npm test
```