module.exports = (dom) => {
  if (dom.hasClass('hostmessagelabel')) {
    // orange
    return 'HOST';
  }

  if (dom.hasClass('moderatormessagelabel')) {
    // red
    return 'MODERATOR';
  }

  if (dom.hasClass('fanclubmessagelabel')) {
    // green
    return 'FANCLUB';
  }

  if (dom.hasClass('tippedtonsrecentlymessagelabel')) {
    // dark purple
    return 'TIPPED_TONS';
  }

  if (dom.hasClass('tippedalotrecentlymessagelabel')) {
    // light purple
    return 'TIPPED_ALOT';
  }

  if (dom.hasClass('tippedrecentlymessagelabel')) {
    // dark purple
    return 'TIPPED_RECENTLY';
  }

  if (dom.hasClass('hastokensmessagelabel')) {
    // light blue
    return 'HAS_TOKENS';
  }

  return "GREY";
};