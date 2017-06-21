Chaturbate Events
=========

![build status](https://travis-ci.org/paulallen87/chaturbate-events.svg?branch=master)
![coverage status](https://coveralls.io/repos/github/paulallen87/chaturbate-events/badge.svg?branch=master)
![dependencies](https://img.shields.io/david/paulallen87/chaturbate-events.svg)
![dev dependencies](https://img.shields.io/david/dev/paulallen87/chaturbate-events.svg)
![npm version](https://img.shields.io/npm/v/@paulallen87/chaturbate-events.svg)


A client for parsing chaturbate-browser events.

The events are published from the [chaturbate-browser](https://github.com/paulallen87/chaturbate-browser) module. This module transforms those events into objects that are easier to handle.

**Note:** this module stores no state. See [chaturbate-controller](https://github.com/paulallen87/chaturbate-controller) for handling state.

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

  ### **init**
  Called when the browser hook is initialized.

## Socket Events

  ### **socket_open**
  Called when the actual web socket is open.

  ### **socket_error**
  Called when the actual websocket has an error.

  ### **socket_close**
  Called when the actual web socket is closed.

## Chaturbate Events

  ### **app_error_log**
  Called when the Chaturbate app needs to log an error message.

  ##### params
  * **message** (string)

  ### **app_notice**
  Called when a notice needs to be posted to viewers.

  ##### params
  * **messages** (Array<string>)
  * **foreground** (string)
  * **weight** (string)
  * **background** (string)
  * **to** (?string)

  ### **app_tab_refresh**
  Called when you apps/bots tab needs to be refreshed.

  ### **away_mode_cancel**
  Called when "the broadcaster is away" has been canceled.

  ### **clear_app**
  Called when the host removes the current app.

  ### **group_show_approve**
  Called when the broadcaster has approved a group show.

  ##### params
  * **tokensPerMinute** (number)

  ### **group_show_cancel**
  Called when a group show has been canceled.

  ### **group_show_request**
  Called when a viewer requests a group show.

  ##### params
  * **usersWaiting** (number)
  * **usersRequired** (number)
  * **tokensPerMinute** (number)

  ### **hidden_show_approve**
  Called when a nidden show is approved.

  ##### params
  * **initialHideCam** (?)

  ### **joined_room**
  Called when YOU join the room.

  ### **joined_private_room**
  Called when YOU join a private room.

  ### **kick**
  Called when a viewer is kicked from the room.

  ##### params
  * **username** (string)

  ### **leave_private_room**
  Called when a user leaves a private room.

  ##### params
  * **username** (string)

  ### **leave_room**
  Called when YOU leave the room.

  ### **log**
  Called when the app wants to log a message.

  ##### params
  * **message** (string)

  ### **message_change_request**
  ???

  ##### params
  * **subject** (string)

  ### **personally_kicked**
  Called when YOU have been kicked from the room

  ##### params
  * **reason** (string)

  ### **private_message**
  Called when you receive a private message

  ##### params
  * **tabNick** (string)
  * **user** ([UserObject](#user-objects)) 
  * **message** (string)

  ### **private_show_approve**
  Called when a private show is approved.

  ##### params
  * **tokensPerMinute** (number)

  ### **private_show_cancel**
  Called when a private show is canceled.

  ### **private_show_request**
  Called when a private show is requested.

  ##### params
  * **requesterUsername** (string)
  * **tokensPerMinute** (number)

  ### **promotion**
  Called when a user has been promoted to moderator.

  ##### params
  * **toNick** (string)
  * **fromNick** (string)

  ### **purchase**
  Called when an item has been purchased.

  ##### params
  * **message** (string)

  ### **receive_tip**
  Called then YOU receive a tip.

  ##### params
  * **amount** (number)
  * **fromUsername** (string)
  * **toUsername** (string)
  * **message** (string)
  * **history** (boolean)

  ### **refresh_panel**
  Called when the "goal" panel needs to be refreshed.

  ### **revoke**
  Called when moderator privs have been revoked.

  ##### params
  * **toNick** (string)
  * **fromNick** (string)

  ### **room_count**
  Called when the room count is updated.

  ##### params
  * **count** (number)

  ### **room_entry**
  Called when someone enters the room.

  ##### params
  * **user** ([UserObject](#user-objects))

  ### **room_leave**
  Called when someone leaves the room

  ##### params
  * **user** ([UserObject](#user-objects))

  ### **room_message**
  Called when a new user message was received by the room.

  ##### params
  * **message** (string) 
  * **user** ([UserObject](#user-objects))

  ### **send_kick_message**
  Called when YOU successfully sent a kick message.

  ### **send_private_message***
  Called when YOU succesfully send a private message.

  ### **send_room_message**
  Called when you successfully send a room message.

  ### **settings_update**
  Called when the room settings have been changed.

  ##### params
  * **allowPrivates** (boolean)
  * **allowGroups** (boolean)
  * **minimumUsersForGroupShow** (number)
  * **privatePrice** (number)
  * **groupPrice** (number)
  * **spyPrice** (number)

  ### **silence**
  Called when a viewer has been silenced.

  ##### params
  * **silencedNick** (string)
  * **silencerNick** (string)

  ### **tip**
  Called when a tip was received.

  ##### params
  * **amount** (number)
  * **user** ([UserObject](#user-objects))

  ### **title_change**
  Called when the room title has changed.

  ##### params
  * **title** (string)
  * **showInChat** (boolean)

  ### **token_balance_update**
  ???

  ##### params
  * **usernames** (string) - comma separated
  * **tokenAmounts** (Array<number>) - comma separated

## User Objects

  This object represents a chatroom user.

  ##### Params
  * **username** (string)
  * **isMod** (boolean)
  * **inFanclub** (boolean)
  * **tippedTonsRecently** (boolean)
  * **tippedAlotRecently** (boolean)
  * **tippedTecently** (boolean)
  * **hasTokens** (boolean)
  * **gender** (string)
  * **fontColor** (string)
  * **fontFamily** (string)

## Tests

```shell
npm test
```