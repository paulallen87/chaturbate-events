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

events.on('message', (e) => {
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

### **fanclub_message**

This event is fired when a fanclub member has joined or left the room.

##### Params
* **user** ([UserObject](#user-objects)) - The user who joined or left
* **action** (string) - Possible values are 'JOINED' and 'LEFT'

### **kick**

This event is fired when a user is kicked from the room.

##### Params
* **target** (string) - The username of the user who was kicked

### **message**

This event is fired when a chat message is received.

##### Params
* **user** ([UserObject](#user-objects)) - The user who sent the message
* **message** (string) - The content of the message

### **moderator_message**

This event is fired when a moderator has joined or left the room.

##### Params
* **user** ([UserObject](#user-objects)) - The user who joined or left
* **action** (string) - Possible values are 'JOINED' and 'LEFT'

### **notice**

This event is fired when a notice is received.

##### Params
* **message** (string) - The content of the notice message

### **purchase**

This event is fired when a purchase has been made.

##### Params
* **message** (string) - The content of the purchase message

### **room_message**

This event is fired when a room message is received (goal status updates).

##### Params
* **message** (string) - The content of the room message

### **silence**

This event is fired when a user is silenced.

##### Params
* **source** (string) - The username of the user that initiated the silence
* **target** (string) - The username of the user that has been silenced

### **tip**

This event is fired when a tip is received.

##### Params
* **user** ([UserObject](#user-objects)) - The user who sent the tip
* **amount** (number) - The amount of tokens received

## User Objects

This object represents a chatroom user.

##### Params
* **username** (string) - The username of the user
* **type** ([string](#user-types)) - The type of user (chat color)

##### User Types
* **HOST** - orange
* **MODERATOR** - red
* **FANCLUB** - green
* **TIPPED_TONS** - dark purple
* **TIPPED_ALOT** - light purple
* **TIPPED_RECENTLY** - dark blue
* **HAS_TOKENS** - light blue
* **USER** - grey

## Tests

```shell
npm test
```