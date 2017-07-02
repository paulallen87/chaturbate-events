'use strict';

const {expect} = require('chai');
const ChaturbateEvents = require('../index');

describe('ChaturbateEvents', () => {
  it('should be exported', () => {
    expect(ChaturbateEvents).to.not.equal(undefined);
  });
});
