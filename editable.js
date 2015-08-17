(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function' && define.amd) define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    function getSecondMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[2]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      }
      if (edgeVersion) {
        result.msedge = t
        result.version = edgeVersion
      }
      else {
        result.msie = t
        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    }
    else if (/chrome.+? edge/i.test(ua)) {
      result = {
        name: 'Microsoft Edge'
      , msedge: t
      , version: edgeVersion
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else {
      result = {
        name: getFirstMatch(/^(.*)\/(.*) /),
        version: getSecondMatch(/^(.*)\/(.*) /)
     };
   }

    // set webkit or gecko flag for browsers based on these engines
    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (!result.msedge && (android || result.silk)) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if (result.msedge ||
        (result.msie && result.version >= 10) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) ||
        (result.blackberry && result.version >= 10.1)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')

  bowser.test = function (browserList) {
    for (var i = 0; i < browserList.length; ++i) {
      var browserItem = browserList[i];
      if (typeof browserItem=== 'string') {
        if (browserItem in bowser) {
          return true;
        }
      }
    }
    return false;
  }

  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(require,module,exports){
module.exports = (function() {

  var getSibling = function(type) {
    return function(element) {
      var sibling = element[type];
      if (sibling && sibling.getAttribute('contenteditable')) return sibling;
      return null;
    };
  };

  return {
    next: getSibling('nextElementSibling'),
    previous: getSibling('previousElementSibling'),
  };
})();

},{}],3:[function(require,module,exports){
var config = require('./config');
var string = require('./util/string');
var nodeType = require('./node-type');

module.exports = (function() {
  var allowedElements, requiredAttributes, transformElements;
  var blockLevelElements, splitIntoBlocks;
  var whitespaceOnly = /^\s*$/;
  var blockPlaceholder = '<!-- BLOCK -->';

  var updateConfig = function (config) {
    var i, name, rules = config.pastedHtmlRules;
    allowedElements = rules.allowedElements || {};
    requiredAttributes = rules.requiredAttributes || {};
    transformElements = rules.transformElements || {};

    blockLevelElements = {};
    for (i = 0; i < rules.blockLevelElements.length; i++) {
      name = rules.blockLevelElements[i];
      blockLevelElements[name] = true;
    }
    splitIntoBlocks = {};
    for (i = 0; i < rules.splitIntoBlocks.length; i++) {
      name = rules.splitIntoBlocks[i];
      splitIntoBlocks[name] = true;
    }
  };

  updateConfig(config);

  return {

    updateConfig: updateConfig,

    paste: function(element, cursor, callback) {
      var document = element.ownerDocument;
      element.setAttribute(config.pastingAttribute, true);

      if (cursor.isSelection) {
        cursor = cursor.deleteContent();
      }

      // Create a placeholder and set the focus to the pasteholder
      // to redirect the browser pasting into the pasteholder.
      cursor.save();
      var pasteHolder = this.injectPasteholder(document);
      pasteHolder.focus();

      // Use a timeout to give the browser some time to paste the content.
      // After that grab the pasted content, filter it and restore the focus.
      var _this = this;
      setTimeout(function() {
        var blocks;

        blocks = _this.parseContent(pasteHolder);
        $(pasteHolder).remove();
        element.removeAttribute(config.pastingAttribute);

        cursor.restore();
        callback(blocks, cursor);

      }, 0);
    },

    injectPasteholder: function(document) {
      var pasteHolder = $(document.createElement('div'))
        .attr('contenteditable', true)
        .css({
          position: 'fixed',
          right: '5px',
          top: '50%',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          outline: 'none'
        })[0];

      $(document.body).append(pasteHolder);
      return pasteHolder;
    },

    /**
     * - Parse pasted content
     * - Split it up into blocks
     * - clean and normalize every block
     *
     * @param {DOM node} A container where the pasted content is located.
     * @returns {Array of Strings} An array of cleaned innerHTML like strings.
     */
    parseContent: function(element) {

      // Filter pasted content
      var pastedString = this.filterHtmlElements(element);

      // Handle Blocks
      var blocks = pastedString.split(blockPlaceholder);
      for (var i = 0; i < blocks.length; i++) {
        var entry = blocks[i];

        // Clean Whitesapce
        entry = this.cleanWhitespace(entry);

        // Trim pasted Text
        entry = string.trim(entry);

        blocks[i] = entry;
      }

      blocks = blocks.filter(function(entry) {
        return !whitespaceOnly.test(entry);
      });

      return blocks;
    },

    filterHtmlElements: function(elem, parents) {
      if (!parents) parents = [];

      var child, content = '';
      for (var i = 0; i < elem.childNodes.length; i++) {
        child = elem.childNodes[i];
        if (child.nodeType === nodeType.elementNode) {
          var childContent = this.filterHtmlElements(child, parents);
          content += this.conditionalNodeWrap(child, childContent);
        } else if (child.nodeType === nodeType.textNode) {
          // Escape HTML characters <, > and &
          content += string.escapeHtml(child.nodeValue);
        }
      }

      return content;
    },

    conditionalNodeWrap: function(child, content) {
      var nodeName = child.nodeName.toLowerCase();
      nodeName = this.transformNodeName(nodeName);

      if ( this.shouldKeepNode(nodeName, child) ) {
        var attributes = this.filterAttributes(nodeName, child);
        if (nodeName === 'br') {
          return '<'+ nodeName + attributes +'>';
        } else if ( !whitespaceOnly.test(content) ) {
          return '<'+ nodeName + attributes +'>'+ content +'</'+ nodeName +'>';
        } else {
          return content;
        }
      } else {
        if (splitIntoBlocks[nodeName]) {
          return blockPlaceholder + content + blockPlaceholder;
        } else if (blockLevelElements[nodeName]) {
          // prevent missing whitespace between text when block-level
          // elements are removed.
          return content + ' ';
        } else {
          return content;
        }
      }
    },

    filterAttributes: function(nodeName, node) {
      var attributes = '';

      for (var i=0, len=(node.attributes || []).length; i<len; i++) {
        var name  = node.attributes[i].name;
        var value = node.attributes[i].value;
        if ((allowedElements[nodeName][name]) && value) {
          attributes += ' ' + name + '="' + value + '"';
        }
      }
      return attributes;
    },

    transformNodeName: function(nodeName) {
      if (transformElements[nodeName]) {
        return transformElements[nodeName];
      } else {
        return nodeName;
      }
    },

    hasRequiredAttributes: function(nodeName, node) {
      var attrName, attrValue;
      var requiredAttrs = requiredAttributes[nodeName];
      if (requiredAttrs) {
        for (var i = 0; i < requiredAttrs.length; i++) {
          attrName = requiredAttrs[i];
          attrValue = node.getAttribute(attrName);
          if (!attrValue) {
            return false;
          }
        }
      }
      return true;
    },

    shouldKeepNode: function(nodeName, node) {
      return allowedElements[nodeName] && this.hasRequiredAttributes(nodeName, node);
    },

    cleanWhitespace: function(str) {
      var cleanedStr = str.replace(/(.)(\u00A0)/g, function(match, group1, group2, offset, string) {
        if ( /[\u0020]/.test(group1) ) {
          return group1 + '\u00A0';
        } else {
          return group1 + ' ';
        }
      });
      return cleanedStr;
    }

  };

})();

},{"./config":4,"./node-type":16,"./util/string":25}],4:[function(require,module,exports){

/**
 * Defines all supported event types by Editable.JS and provides default
 * implementations for them defined in {{#crossLink "Behavior"}}{{/crossLink}}
 *
 * @type {Object}
 */
module.exports = {
  log: false,
  logErrors: true,
  editableClass: 'js-editable',
  editableDisabledClass: 'js-editable-disabled',
  pastingAttribute: 'data-editable-is-pasting',
  boldTag: 'strong',
  italicTag: 'em',
  strikethroughTag: '<strike>',

  // Rules that are applied when filtering pasted content
  pastedHtmlRules: {

    // Elements and their attributes to keep in pasted text
    allowedElements: {
      'a': {
        'href': true
      },
      'strong': {},
      'em': {},
      'br': {}
    },

    // Elements that have required attributes.
    // If these are not present the elements are filtered out.
    // Required attributes have to be present in the 'allowed' object
    // as well if they should not be filtered out.
    requiredAttributes: {
      'a': ['href']
    },

    // Elements that should be transformed into other elements
    transformElements: {
      'b': 'strong',
      'i': 'em'
    },

    // A list of elements which should be split into paragraphs.
    splitIntoBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'blockquote'],

    // A list of HTML block level elements.
    blockLevelElements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p', 'pre', 'hr', 'blockquote', 'article', 'figure', 'header', 'footer', 'ul', 'ol', 'li', 'section', 'table', 'video']
  }

};


},{}],5:[function(require,module,exports){
var nodeType = require('./node-type');
var rangeSaveRestore = require('./range-save-restore');
var parser = require('./parser');
var string = require('./util/string');

var content;
module.exports = content = (function() {

  var restoreRange = function(host, range, func) {
    range = rangeSaveRestore.save(range);
    func.call(content);
    return rangeSaveRestore.restore(host, range);
  };

  var zeroWidthSpace = /\u200B/g;
  var zeroWidthNonBreakingSpace = /\uFEFF/g;
  var whitespaceExceptSpace = /[^\S ]/g;

  return {

    /**
     * Clean up the Html.
     */
    tidyHtml: function(element) {
      // if (element.normalize) element.normalize();
      this.normalizeTags(element);
    },


    /**
     * Remove empty tags and merge consecutive tags (they must have the same
     * attributes).
     *
     * @method normalizeTags
     * @param  {HTMLElement} element The element to process.
     */
    normalizeTags: function(element) {
      var i, j, node, sibling;

      var fragment = document.createDocumentFragment();

      for (i = 0; i < element.childNodes.length; i++) {
        node = element.childNodes[i];
        if (!node) continue;

        // skip empty tags, so they'll get removed
        if (node.nodeName !== 'BR' && !node.textContent) continue;

        if (node.nodeType === nodeType.elementNode && node.nodeName !== 'BR') {
          sibling = node;
          while ((sibling = sibling.nextSibling) !== null) {
            if (!parser.isSameNode(sibling, node))
              break;

            for (j = 0; j < sibling.childNodes.length; j++) {
              node.appendChild(sibling.childNodes[j].cloneNode(true));
            }

            sibling.parentNode.removeChild(sibling);
          }

          this.normalizeTags(node);
        }

        fragment.appendChild(node.cloneNode(true));
      }

      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(fragment);
    },

    normalizeWhitespace: function(text) {
      return text.replace(whitespaceExceptSpace, ' ');
    },

    /**
     * Clean the element from character, tags, etc... added by the plugin logic.
     *
     * @method cleanInternals
     * @param  {HTMLElement} element The element to process.
     */
    cleanInternals: function(element) {
      // Uses extract content for simplicity. A custom method
      // that does not clone the element could be faster if needed.
      element.innerHTML = this.extractContent(element, true);
    },

    /**
     * Extracts the content from a host element.
     * Does not touch or change the host. Just returns
     * the content and removes elements marked for removal by editable.
     *
     * @param {DOM node or document framgent} Element where to clean out the innerHTML. If you pass a document fragment it will be empty after this call.
     * @param {Boolean} Flag whether to keep ui elements like spellchecking highlights.
     * @returns {String} The cleaned innerHTML of the passed element or document fragment.
     */
    extractContent: function(element, keepUiElements) {
      var innerHtml;
      if (element.nodeType === nodeType.documentFragmentNode) {
        innerHtml = this.getInnerHtmlOfFragment(element);
      } else {
        innerHtml = element.innerHTML;
      }

      innerHtml = innerHtml.replace(zeroWidthNonBreakingSpace, ''); // Used for forcing inline elments to have a height
      innerHtml = innerHtml.replace(zeroWidthSpace, '<br>'); // Used for cross-browser newlines

      var clone = document.createElement('div');
      clone.innerHTML = innerHtml;
      this.unwrapInternalNodes(clone, keepUiElements);

      return clone.innerHTML;
    },

    getInnerHtmlOfFragment: function(documentFragment) {
      var div = document.createElement('div');
      div.appendChild(documentFragment);
      return div.innerHTML;
    },

    /**
     * Create a document fragment from an html string
     * @param {String} e.g. 'some html <span>text</span>.'
     */
    createFragmentFromString: function(htmlString) {
      var fragment = document.createDocumentFragment();
      var contents = $('<div>').html(htmlString).contents();
      for (var i = 0; i < contents.length; i++) {
        var el = contents[i];
        fragment.appendChild(el);
      }
      return fragment;
    },

    adoptElement: function(node, doc) {
      if (node.ownerDocument !== doc) {
        return doc.adoptNode(node);
      } else {
        return node;
      }
    },

    /**
     * This is a slight variation of the cloneContents method of a rangyRange.
     * It will return a fragment with the cloned contents of the range
     * without the commonAncestorElement.
     *
     * @param {rangyRange}
     * @return {DocumentFragment}
     */
    cloneRangeContents: function(range) {
      var rangeFragment = range.cloneContents();
      var parent = rangeFragment.childNodes[0];
      var fragment = document.createDocumentFragment();
      while (parent.childNodes.length) {
        fragment.appendChild(parent.childNodes[0]);
      }
      return fragment;
    },

    /**
     * Remove elements that were inserted for internal or user interface purposes
     *
     * @param {DOM node}
     * @param {Boolean} whether to keep ui elements like spellchecking highlights
     * Currently:
     * - Saved ranges
     */
    unwrapInternalNodes: function(sibling, keepUiElements) {
      while (sibling) {
        var nextSibling = sibling.nextSibling;

        if (sibling.nodeType === nodeType.elementNode) {
          var attr = sibling.getAttribute('data-editable');

          if (sibling.firstChild) {
            this.unwrapInternalNodes(sibling.firstChild, keepUiElements);
          }

          if (attr === 'remove') {
            $(sibling).remove();
          } else if (attr === 'unwrap') {
            this.unwrap(sibling);
          } else if (attr === 'ui-remove' && !keepUiElements) {
            $(sibling).remove();
          } else if (attr === 'ui-unwrap' && !keepUiElements) {
            this.unwrap(sibling);
          }
        }
        sibling = nextSibling;
      }
    },

    /**
     * Get all tags that start or end inside the range
     */
    getTags: function(host, range, filterFunc) {
      var tags = this.getInnerTags(range, filterFunc);

      // get all tags that surround the range
      var node = range.commonAncestorContainer;
      while (node !== host) {
        if (!filterFunc || filterFunc(node)) {
          tags.push(node);
        }
        node = node.parentNode;
      }
      return tags;
    },

    getTagsByName: function(host, range, tagName) {
      return this.getTags(host, range, function(node) {
        return node.nodeName === tagName.toUpperCase();
      });
    },

    /**
     * Get all tags that start or end inside the range
     */
    getInnerTags: function(range, filterFunc) {
      return range.getNodes([nodeType.elementNode], filterFunc);
    },

    /**
     * Transform an array of elements into a an array
     * of tagnames in uppercase
     *
     * @return example: ['STRONG', 'B']
     */
    getTagNames: function(elements) {
      var names = [];
      if (!elements) return names;

      for (var i = 0; i < elements.length; i++) {
        names.push(elements[i].nodeName);
      }
      return names;
    },

    isAffectedBy: function(host, range, tagName) {
      var elem;
      var tags = this.getTags(host, range);
      for (var i = 0; i < tags.length; i++) {
        elem = tags[i];
        if (elem.nodeName === tagName.toUpperCase()) {
          return true;
        }
      }

      return false;
    },

    /**
     * Check if the range selects all of the elements contents,
     * not less or more.
     *
     * @param visible: Only compare visible text. That way it does not
     *   matter if the user selects an additional whitespace or not.
     */
    isExactSelection: function(range, elem, visible) {
      var elemRange = rangy.createRange();
      elemRange.selectNodeContents(elem);
      if (range.intersectsRange(elemRange)) {
        var rangeText = range.toString();
        var elemText = $(elem).text();

        if (visible) {
          rangeText = string.trim(rangeText);
          elemText = string.trim(elemText);
        }

        return rangeText !== '' && rangeText === elemText;
      } else {
        return false;
      }
    },

    expandTo: function(host, range, elem) {
      range.selectNodeContents(elem);
      return range;
    },

    toggleTag: function(host, range, elem) {
      var elems = this.getTagsByName(host, range, elem.nodeName);

      if (elems.length === 1 &&
          this.isExactSelection(range, elems[0], 'visible')) {
        return this.removeFormatting(host, range, elem.nodeName);
      }

      return this.forceWrap(host, range, elem);
    },

    isWrappable: function(range) {
      return range.canSurroundContents();
    },

    forceWrap: function(host, range, elem) {
      range = restoreRange(host, range, function(){
        this.nuke(host, range, elem.nodeName);
      });

      // remove all tags if the range is not wrappable
      if (!this.isWrappable(range)) {
        range = restoreRange(host, range, function(){
          this.nuke(host, range);
        });
      }

      this.wrap(range, elem);
      return range;
    },

    wrap: function(range, elem) {
      elem = string.isString(elem) ?
        $(elem)[0] :
        elem;

      if (this.isWrappable(range)) {
        var a = range.surroundContents(elem);
      } else {
        console.log('content.wrap(): can not surround range');
      }
    },

    unwrap: function(elem) {
      var $elem = $(elem);
      var contents = $elem.contents();
      if (contents.length) {
        contents.unwrap();
      } else {
        $elem.remove();
      }
    },

    removeFormatting: function(host, range, tagName) {
      return restoreRange(host, range, function(){
        this.nuke(host, range, tagName);
      });
    },

    /**
     * Unwrap all tags this range is affected by.
     * Can also affect content outside of the range.
     */
    nuke: function(host, range, tagName) {
      var tags = this.getTags(host, range);
      for (var i = 0; i < tags.length; i++) {
        var elem = tags[i];
        if ( elem.nodeName !== 'BR' && (!tagName || elem.nodeName === tagName.toUpperCase()) ) {
          this.unwrap(elem);
        }
      }
    },

    /**
     * Insert a single character (or string) before or after the
     * the range.
     */
    insertCharacter: function(range, character, atStart) {
      var insertEl = document.createTextNode(character);

      var boundaryRange = range.cloneRange();
      boundaryRange.collapse(atStart);
      boundaryRange.insertNode(insertEl);

      if (atStart) {
        range.setStartBefore(insertEl);
      } else {
        range.setEndAfter(insertEl);
      }
      range.normalizeBoundaries();
    },

    /**
     * Surround the range with characters like start and end quotes.
     *
     * @method surround
     */
    surround: function(host, range, startCharacter, endCharacter) {
      if (!endCharacter) endCharacter = startCharacter;
      this.insertCharacter(range, endCharacter, false);
      this.insertCharacter(range, startCharacter, true);
      return range;
    },

    /**
     * Removes a character from the text within a range.
     *
     * @method deleteCharacter
     */
    deleteCharacter: function(host, range, character) {
      if (this.containsString(range, character)) {
        range.splitBoundaries();
        range = restoreRange(host, range, function() {
          var charRegexp = string.regexp(character);

          var textNodes = range.getNodes([nodeType.textNode], function(node) {
            return node.nodeValue.search(charRegexp) >= 0;
          });

          for (var i = 0; i < textNodes.length; i++) {
            var node = textNodes[i];
            node.nodeValue = node.nodeValue.replace(charRegexp, '');
          }
        });
        range.normalizeBoundaries();
      }

      return range;
    },

    containsString: function(range, str) {
      var text = range.toString();
      return text.indexOf(str) >= 0;
    },

    /**
     * Unwrap all tags this range is affected by.
     * Can also affect content outside of the range.
     */
    nukeTag: function(host, range, tagName) {
      var tags = this.getTags(host, range);
      for (var i = 0; i < tags.length; i++) {
        var elem = tags[i];
        if (elem.nodeName === tagName)
          this.unwrap(elem);
      }
    }
  };
})();

},{"./node-type":16,"./parser":17,"./range-save-restore":19,"./util/string":25}],6:[function(require,module,exports){
var config = require('./config');
var error = require('./util/error');
var parser = require('./parser');
var content = require('./content');
var clipboard = require('./clipboard');
var Dispatcher = require('./dispatcher');
var Cursor = require('./cursor');
var Spellcheck = require('./spellcheck');
var createDefaultEvents = require('./create-default-events');
var browser = require('bowser').browser;

/**
 * The Core module provides the Editable class that defines the Editable.JS
 * API and is the main entry point for Editable.JS.
 * It also provides the cursor module for cross-browser cursors, and the dom
 * submodule.
 *
 * @module core
 */

/**
 * Constructor for the Editable.JS API that is externally visible.
 *
 * @param {Object} configuration for this editable instance.
 *   window: The window where to attach the editable events.
 *   defaultBehavior: {Boolean} Load default-behavior.js.
 *   mouseMoveSelectionChanges: {Boolean} Whether to get cursor and selection events on mousemove.
 *   browserSpellcheck: {Boolean} Set the spellcheck attribute on editable elements
 *
 * @class Editable
 */
var Editable = function(instanceConfig) {
  var defaultInstanceConfig = {
    window: window,
    defaultBehavior: true,
    mouseMoveSelectionChanges: false,
    browserSpellcheck: true
  };

  this.config = $.extend(defaultInstanceConfig, instanceConfig);
  this.win = this.config.window;
  this.editableSelector = '.' + config.editableClass;

  if (!rangy.initialized) {
    rangy.init();
  }

  this.dispatcher = new Dispatcher(this);
  if (this.config.defaultBehavior === true) {
    this.dispatcher.on(createDefaultEvents(this));
  }
};

// Expose modules and editable
Editable.parser = parser;
Editable.content = content;
Editable.browser = browser;
window.Editable = Editable;

module.exports = Editable;

/**
 * Set configuration options that affect all editable
 * instances.
 *
 * @param {Object} global configuration options (defaults are defined in config.js)
 *   log: {Boolean}
 *   logErrors: {Boolean}
 *   editableClass: {String} e.g. 'js-editable'
 *   editableDisabledClass: {String} e.g. 'js-editable-disabled'
 *   pastingAttribute: {String} default: e.g. 'data-editable-is-pasting'
 *   boldTag: e.g. '<strong>'
 *   italicTag: e.g. '<em>'
 */
Editable.globalConfig = function(globalConfig) {
  $.extend(config, globalConfig);
  clipboard.updateConfig(config);
};


/**
 * Adds the Editable.JS API to the given target elements.
 * Opposite of {{#crossLink "Editable/remove"}}{{/crossLink}}.
 * Calls dispatcher.setup to setup all event listeners.
 *
 * @method add
 * @param {HTMLElement|Array(HTMLElement)|String} target A HTMLElement, an
 *    array of HTMLElement or a query selector representing the target where
 *    the API should be added on.
 * @chainable
 */
Editable.prototype.add = function(target) {
  this.enable($(target));
  // todo: check css whitespace settings
  return this;
};


/**
 * Removes the Editable.JS API from the given target elements.
 * Opposite of {{#crossLink "Editable/add"}}{{/crossLink}}.
 *
 * @method remove
 * @param {HTMLElement|Array(HTMLElement)|String} target A HTMLElement, an
 *    array of HTMLElement or a query selector representing the target where
 *    the API should be removed from.
 * @chainable
 */
Editable.prototype.remove = function(target) {
  var $target = $(target);
  this.disable($target);
  $target.removeClass(config.editableDisabledClass);
  return this;
};


/**
 * Removes the Editable.JS API from the given target elements.
 * The target elements are marked as disabled.
 *
 * @method disable
 * @param { jQuery element | undefined  } target editable root element(s)
 *    If no param is specified all editables are disabled.
 * @chainable
 */
Editable.prototype.disable = function($elem) {
  var body = this.win.document.body;
  $elem = $elem || $('.' + config.editableClass, body);
  $elem
    .removeAttr('contenteditable')
    .removeAttr('spellcheck')
    .removeClass(config.editableClass)
    .addClass(config.editableDisabledClass);

  return this;
};



/**
 * Adds the Editable.JS API to the given target elements.
 *
 * @method enable
 * @param { jQuery element | undefined } target editable root element(s)
 *    If no param is specified all editables marked as disabled are enabled.
 * @chainable
 */
Editable.prototype.enable = function($elem, normalize) {
  var body = this.win.document.body;
  $elem = $elem || $('.' + config.editableDisabledClass, body);
  $elem
    .attr('contenteditable', true)
    .attr('spellcheck', this.config.browserSpellcheck)
    .removeClass(config.editableDisabledClass)
    .addClass(config.editableClass);

  if (normalize) {
    $elem.each(function(index, el) {
      content.tidyHtml(el);
    });
  }

  return this;
};

/**
 * Temporarily disable an editable.
 * Can be used to prevent text selction while dragging an element
 * for example.
 *
 * @method suspend
 * @param jQuery object
 */
Editable.prototype.suspend = function($elem) {
  var body = this.win.document.body;
  $elem = $elem || $('.' + config.editableClass, body);
  $elem.removeAttr('contenteditable');
  return this;
};

/**
 * Reverse the effects of suspend()
 *
 * @method continue
 * @param jQuery object
 */
Editable.prototype.continue = function($elem) {
  var body = this.win.document.body;
  $elem = $elem || $('.' + config.editableClass, body);
  $elem.attr('contenteditable', true);
  return this;
};

/**
 * Set the cursor inside of an editable block.
 *
 * @method createCursor
 * @param position 'beginning', 'end', 'before', 'after'
 */
Editable.prototype.createCursor = function(element, position) {
  var cursor;
  var $host = $(element).closest(this.editableSelector);
  position = position || 'beginning';

  if ($host.length) {
    var range = rangy.createRange();

    if (position === 'beginning' || position === 'end') {
      range.selectNodeContents(element);
      range.collapse(position === 'beginning' ? true : false);
    } else if (element !== $host[0]) {
      if (position === 'before') {
        range.setStartBefore(element);
        range.setEndBefore(element);
      } else if (position === 'after') {
        range.setStartAfter(element);
        range.setEndAfter(element);
      }
    } else {
      error('EditableJS: cannot create cursor outside of an editable block.');
    }

    cursor = new Cursor($host[0], range);
  }

  return cursor;
};

Editable.prototype.createCursorAtBeginning = function(element) {
  return this.createCursor(element, 'beginning');
};

Editable.prototype.createCursorAtEnd = function(element) {
  return this.createCursor(element, 'end');
};

Editable.prototype.createCursorBefore = function(element) {
  return this.createCursor(element, 'before');
};

Editable.prototype.createCursorAfter = function(element) {
  return this.createCursor(element, 'after');
};

/**
 * Extract the content from an editable host or document fragment.
 * This method will remove all internal elements and ui-elements.
 *
 * @param {DOM node or Document Fragment} The innerHTML of this element or fragment will be extracted.
 * @returns {String} The cleaned innerHTML.
 */
Editable.prototype.getContent = function(element) {
  return content.extractContent(element);
};


/**
 * @param {String | DocumentFragment} content to append.
 * @returns {Cursor} A new Cursor object just before the inserted content.
 */
Editable.prototype.appendTo = function(element, contentToAppend) {
  element = content.adoptElement(element, this.win.document);

  if (typeof contentToAppend === 'string') {
    // todo: create content in the right window
    contentToAppend = content.createFragmentFromString(contentToAppend);
  }

  var cursor = this.createCursor(element, 'end');
  cursor.insertAfter(contentToAppend);
  return cursor;
};



/**
 * @param {String | DocumentFragment} content to prepend
 * @returns {Cursor} A new Cursor object just after the inserted content.
 */
Editable.prototype.prependTo = function(element, contentToPrepend) {
  element = content.adoptElement(element, this.win.document);

  if (typeof contentToPrepend === 'string') {
    // todo: create content in the right window
    contentToPrepend = content.createFragmentFromString(contentToPrepend);
  }

  var cursor = this.createCursor(element, 'beginning');
  cursor.insertBefore(contentToPrepend);
  return cursor;
};


/**
 * Get the current selection.
 * Only returns something if the selection is within an editable element.
 * If you pass an editable host as param it only returns something if the selection is inside this
 * very editable element.
 *
 * @param {DOMNode} Optional. An editable host where the selection needs to be contained.
 * @returns A Cursor or Selection object or undefined.
 */
Editable.prototype.getSelection = function(editableHost) {
  var selection = this.dispatcher.selectionWatcher.getFreshSelection();
  if (editableHost && selection) {
    var range = selection.range;
    // Check if the selection is inside the editableHost
    // The try...catch is required if the editableHost was removed from the DOM.
    try {
      if (range.compareNode(editableHost) !== range.NODE_BEFORE_AND_AFTER) {
        selection = undefined;
      }
    } catch (e) {
      selection = undefined;
    }
  }
  return selection;
};


/**
 * Enable spellchecking
 *
 * @chainable
 */
Editable.prototype.setupSpellcheck = function(spellcheckConfig) {
  this.spellcheck = new Spellcheck(this, spellcheckConfig);

  return this;
};


/**
 * Subscribe a callback function to a custom event fired by the API.
 *
 * @param {String} event The name of the event.
 * @param {Function} handler The callback to execute in response to the
 *     event.
 *
 * @chainable
 */
Editable.prototype.on = function(event, handler) {
  // TODO throw error if event is not one of EVENTS
  // TODO throw error if handler is not a function
  this.dispatcher.on(event, handler);
  return this;
};

/**
 * Unsubscribe a callback function from a custom event fired by the API.
 * Opposite of {{#crossLink "Editable/on"}}{{/crossLink}}.
 *
 * @param {String} event The name of the event.
 * @param {Function} handler The callback to remove from the
 *     event or the special value false to remove all callbacks.
 *
 * @chainable
 */
Editable.prototype.off = function(event, handler) {
  var args = Array.prototype.slice.call(arguments);
  this.dispatcher.off.apply(this.dispatcher, args);
  return this;
};

/**
 * Unsubscribe all callbacks and event listeners.
 *
 * @chainable
 */
Editable.prototype.unload = function() {
  this.dispatcher.unload();
  return this;
};

/**
 * Generate a callback function to subscribe to an event.
 *
 * @method createEventSubscriber
 * @param {String} Event name
 */
var createEventSubscriber = function(name) {
  Editable.prototype[name] = function(handler) {
    return this.on(name, handler);
  };
};

/**
 * Set up callback functions for several events.
 */
var events = ['focus', 'blur', 'flow', 'selection', 'cursor', 'newline',
              'insert', 'split', 'merge', 'empty', 'change', 'switch', 'move',
              'clipboard', 'paste'];

for (var i = 0; i < events.length; ++i) {
  var eventName = events[i];
  createEventSubscriber(eventName);
}

},{"./clipboard":3,"./config":4,"./content":5,"./create-default-events":8,"./cursor":9,"./dispatcher":10,"./parser":17,"./spellcheck":22,"./util/error":23,"bowser":1}],7:[function(require,module,exports){
var parser = require('./parser');
var content = require('./content');
var log = require('./util/log');
var block = require('./block');

/**
 * The Behavior module defines the behavior triggered in response to the Editable.JS
 * events (see {{#crossLink "Editable"}}{{/crossLink}}).
 * The behavior can be overwritten by a user with Editable.init() or on
 * Editable.add() per element.
 *
 * @module core
 * @submodule behavior
 */


module.exports = function(editable) {
  var document = editable.win.document;
  var selectionWatcher = editable.dispatcher.selectionWatcher;

  /**
    * Factory for the default behavior.
    * Provides default behavior of the Editable.JS API.
    *
    * @static
    */
  return {
    focus: function(element) {
      // Add a <br> element if the editable is empty to force it to have height
      // E.g. Firefox does not render empty block elements and most browsers do
      // not render  empty inline elements.
      if (parser.isVoid(element)) {
        var br = document.createElement('br');
        br.setAttribute('data-editable', 'remove');
        element.appendChild(br);
      }
    },

    blur: function(element) {
      content.cleanInternals(element);
    },

    selection: function(element, selection) {
      if (selection) {
        log('Default selection behavior');
      } else {
        log('Default selection empty behavior');
      }
    },

    cursor: function(element, cursor) {
      if (cursor) {
        log('Default cursor behavior');
      } else {
        log('Default cursor empty behavior');
      }
    },

    newline: function(element, cursor) {
      var atEnd = cursor.isAtEnd();
      var br = document.createElement('br');
      cursor.insertBefore(br);

      if (atEnd) {
        log('at the end');

        var noWidthSpace = document.createTextNode('\u200B');
        cursor.insertAfter(noWidthSpace);

        // var trailingBr = document.createElement('br');
        // trailingBr.setAttribute('type', '-editablejs');
        // cursor.insertAfter(trailingBr);

      } else {
        log('not at the end');
      }

      cursor.setVisibleSelection();
    },

    insert: function(element, direction, cursor) {
      var parent = element.parentNode;
      var newElement = element.cloneNode(false);
      if (newElement.id) newElement.removeAttribute('id');

      switch (direction) {
      case 'before':
        parent.insertBefore(newElement, element);
        element.focus();
        break;
      case 'after':
        parent.insertBefore(newElement, element.nextSibling);
        newElement.focus();
        break;
      }
    },

    split: function(element, before, after, cursor) {
      var newNode = element.cloneNode();
      newNode.appendChild(before);

      var parent = element.parentNode;
      parent.insertBefore(newNode, element);

      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(after);

      content.tidyHtml(newNode);
      content.tidyHtml(element);
      element.focus();
    },

    merge: function(element, direction, cursor) {
      var container, merger, fragment, chunks, i, newChild, range;

      switch (direction) {
      case 'before':
        container = block.previous(element);
        merger = element;
        break;
      case 'after':
        container = element;
        merger = block.next(element);
        break;
      }

      if (!(container && merger))
        return;

      if (container.childNodes.length > 0) {
        cursor = editable.appendTo(container, merger.innerHTML);
      } else {
        cursor = editable.prependTo(container, merger.innerHTML);
      }

      // remove merged node
      merger.parentNode.removeChild(merger);

      cursor.save();
      content.tidyHtml(container);
      cursor.restore();
      cursor.setVisibleSelection();
    },

    empty: function(element) {
      log('Default empty behavior');
    },

    'switch': function(element, direction, cursor) {
      var next, previous;

      switch (direction) {
      case 'before':
        previous = block.previous(element);
        if (previous) {
          cursor.moveAtTextEnd(previous);
          cursor.setVisibleSelection();
        }
        break;
      case 'after':
        next = block.next(element);
        if (next) {
          cursor.moveAtBeginning(next);
          cursor.setVisibleSelection();
        }
        break;
      }
    },

    move: function(element, selection, direction) {
      log('Default move behavior');
    },

    paste: function(element, blocks, cursor) {
      var fragment;

      var firstBlock = blocks[0];
      cursor.insertBefore(firstBlock);

      if (blocks.length <= 1) {
        cursor.setVisibleSelection();
      } else {
        var parent = element.parentNode;
        var currentElement = element;

        for (var i = 1; i < blocks.length; i++) {
          var newElement = element.cloneNode(false);
          if (newElement.id) newElement.removeAttribute('id');
          fragment = content.createFragmentFromString(blocks[i]);
          $(newElement).append(fragment);
          parent.insertBefore(newElement, currentElement.nextSibling);
          currentElement = newElement;
        }

        // focus last element
        cursor = editable.createCursorAtEnd(currentElement);
        cursor.setVisibleSelection();
      }
    },

    clipboard: function(element, action, cursor) {
      log('Default clipboard behavior');
    }
  };
};

},{"./block":2,"./content":5,"./parser":17,"./util/log":24}],8:[function(require,module,exports){
var createDefaultBehavior = require('./create-default-behavior');

module.exports = function (editable) {
  var behavior = createDefaultBehavior(editable);

  return {
    /**
     * The focus event is triggered when an element gains focus.
     * The default behavior is to... TODO
     *
     * @event focus
     * @param {HTMLElement} element The element triggering the event.
     */
    focus: function(element) {
      behavior.focus(element);
    },

    /**
     * The blur event is triggered when an element looses focus.
     * The default behavior is to... TODO
     *
     * @event blur
     * @param {HTMLElement} element The element triggering the event.
     */
    blur: function(element) {
      behavior.blur(element);
    },

    /**
     * The flow event is triggered when the user starts typing or pause typing.
     * The default behavior is to... TODO
     *
     * @event flow
     * @param {HTMLElement} element The element triggering the event.
     * @param {String} action The flow action: "start" or "pause".
     */
    flow: function(element, action) {
      behavior.flow(element, action);
    },

    /**
     * The selection event is triggered after the user has selected some
     * content.
     * The default behavior is to... TODO
     *
     * @event selection
     * @param {HTMLElement} element The element triggering the event.
     * @param {Selection} selection The actual Selection object.
     */
    selection: function(element, selection) {
      behavior.selection(element, selection);
    },

    /**
     * The cursor event is triggered after cursor position has changed.
     * The default behavior is to... TODO
     *
     * @event cursor
     * @param {HTMLElement} element The element triggering the event.
     * @param {Cursor} cursor The actual Cursor object.
     */
    cursor: function(element, cursor) {
      behavior.cursor(element, cursor);
    },

    /**
     * The newline event is triggered when a newline should be inserted. This
     * happens when SHIFT+ENTER key is pressed.
     * The default behavior is to add a <br />
     *
     * @event newline
     * @param {HTMLElement} element The element triggering the event.
     * @param {Cursor} cursor The actual cursor object.
     */
    newline: function(element, cursor) {
      behavior.newline(element, cursor);
    },

    /**
     * The split event is triggered when a block should be splitted into two
     * blocks. This happens when ENTER is pressed within a non-empty block.
     * The default behavior is to... TODO
     *
     * @event split
     * @param {HTMLElement} element The element triggering the event.
     * @param {String} before The HTML string before the split.
     * @param {String} after The HTML string after the split.
     * @param {Cursor} cursor The actual cursor object.
     */
    split: function(element, before, after, cursor) {
      behavior.split(element, before, after, cursor);
    },


    /**
     * The insert event is triggered when a new block should be inserted. This
     * happens when ENTER key is pressed at the beginning of a block (should
     * insert before) or at the end of a block (should insert after).
     * The default behavior is to... TODO
     *
     * @event insert
     * @param {HTMLElement} element The element triggering the event.
     * @param {String} direction The insert direction: "before" or "after".
     * @param {Cursor} cursor The actual cursor object.
     */
    insert: function(element, direction, cursor) {
      behavior.insert(element, direction, cursor);
    },


    /**
     * The merge event is triggered when two needs to be merged. This happens
     * when BACKSPACE is pressed at the beginning of a block (should merge with
     * the preceeding block) or DEL is pressed at the end of a block (should
     * merge with the following block).
     * The default behavior is to... TODO
     *
     * @event merge
     * @param {HTMLElement} element The element triggering the event.
     * @param {String} direction The merge direction: "before" or "after".
     * @param {Cursor} cursor The actual cursor object.
     */
    merge: function(element, direction, cursor) {
      behavior.merge(element, direction, cursor);
    },

    /**
     * The empty event is triggered when a block is emptied.
     * The default behavior is to... TODO
     *
     * @event empty
     * @param {HTMLElement} element The element triggering the event.
     */
    empty: function(element) {
      behavior.empty(element);
    },

    /**
     * The switch event is triggered when the user switches to another block.
     * This happens when an ARROW key is pressed near the boundaries of a block.
     * The default behavior is to... TODO
     *
     * @event switch
     * @param {HTMLElement} element The element triggering the event.
     * @param {String} direction The switch direction: "before" or "after".
     * @param {Cursor} cursor The actual cursor object.*
     */
    'switch': function(element, direction, cursor) {
      behavior.switch(element, direction, cursor);
    },

    /**
     * The move event is triggered when the user moves a selection in a block.
     * This happens when the user selects some (or all) content in a block and
     * an ARROW key is pressed (up: drag before, down: drag after).
     * The default behavior is to... TODO
     *
     * @event move
     * @param {HTMLElement} element The element triggering the event.
     * @param {Selection} selection The actual Selection object.
     * @param {String} direction The move direction: "before" or "after".
     */
    move: function(element, selection, direction) {
      behavior.move(element, selection, direction);
    },

    /**
     * The clipboard event is triggered when the user copies or cuts
     * a selection within a block.
     *
     * @event clipboard
     * @param {HTMLElement} element The element triggering the event.
     * @param {String} action The clipboard action: "copy" or "cut".
     * @param {Selection} selection A selection object around the copied content.
     */
    clipboard: function(element, action, selection) {
      behavior.clipboard(element, action, selection);
    },

    /**
     * The paste event is triggered when the user pastes text
     *
     * @event paste
     * @param {HTMLElement} The element triggering the event.
     * @param {Array of String} The pasted blocks
     * @param {Cursor} The cursor object.
     */
    paste: function(element, blocks, cursor) {
      behavior.paste(element, blocks, cursor);
    }
  };
};

},{"./create-default-behavior":7}],9:[function(require,module,exports){
var content = require('./content');
var parser = require('./parser');
var string = require('./util/string');
var nodeType = require('./node-type');
var error = require('./util/error');
var rangeSaveRestore = require('./range-save-restore');

/**
 * The Cursor module provides a cross-browser abstraction layer for cursor.
 *
 * @module core
 * @submodule cursor
 */

var Cursor;
module.exports = Cursor = (function() {

  /**
   * Class for the Cursor module.
   *
   * @class Cursor
   * @constructor
   */
  var Cursor = function(editableHost, rangyRange) {
    this.setHost(editableHost);
    this.range = rangyRange;
    this.isCursor = true;
  };

  Cursor.prototype = (function() {
    return {
      isAtEnd: function() {
        return parser.isEndOfHost(
          this.host,
          this.range.endContainer,
          this.range.endOffset);
      },

      isAtTextEnd: function() {
        return parser.isTextEndOfHost(
          this.host,
          this.range.endContainer,
          this.range.endOffset);
      },

      isAtBeginning: function() {
        return parser.isBeginningOfHost(
          this.host,
          this.range.startContainer,
          this.range.startOffset);
      },

      /**
       * Insert content before the cursor
       *
       * @param {String, DOM node or document fragment}
       */
      insertBefore: function(element) {
        if ( string.isString(element) ) {
          element = content.createFragmentFromString(element);
        }
        if (parser.isDocumentFragmentWithoutChildren(element)) return;
        element = this.adoptElement(element);

        var preceedingElement = element;
        if (element.nodeType === nodeType.documentFragmentNode) {
          var lastIndex = element.childNodes.length - 1;
          preceedingElement = element.childNodes[lastIndex];
        }

        this.range.insertNode(element);
        this.range.setStartAfter(preceedingElement);
        this.range.setEndAfter(preceedingElement);
      },

      /**
       * Insert content after the cursor
       *
       * @param {String, DOM node or document fragment}
       */
      insertAfter: function(element) {
        if ( string.isString(element) ) {
          element = content.createFragmentFromString(element);
        }
        if (parser.isDocumentFragmentWithoutChildren(element)) return;
        element = this.adoptElement(element);
        this.range.insertNode(element);
      },

      /**
       * Alias for #setVisibleSelection()
       */
      setSelection: function() {
        this.setVisibleSelection();
      },

      setVisibleSelection: function() {
        // Without setting focus() Firefox is not happy (seems setting a selection is not enough.
        // Probably because Firefox can handle multiple selections).
        if (this.win.document.activeElement !== this.host) {
          $(this.host).focus();
        }
        rangy.getSelection(this.win).setSingleRange(this.range);
      },

      /**
       * Take the following example:
       * (The character '|' represents the cursor position)
       *
       * <div contenteditable="true">fo|o</div>
       * before() will return a document frament containing a text node 'fo'.
       *
       * @returns {Document Fragment} content before the cursor or selection.
       */
      before: function() {
        var fragment = null;
        var range = this.range.cloneRange();
        range.setStartBefore(this.host);
        fragment = content.cloneRangeContents(range);
        return fragment;
      },

      /**
       * Same as before() but returns a string.
       */
      beforeHtml: function() {
        return content.getInnerHtmlOfFragment(this.before());
      },

      /**
       * Take the following example:
       * (The character '|' represents the cursor position)
       *
       * <div contenteditable="true">fo|o</div>
       * after() will return a document frament containing a text node 'o'.
       *
       * @returns {Document Fragment} content after the cursor or selection.
       */
      after: function() {
        var fragment = null;
        var range = this.range.cloneRange();
        range.setEndAfter(this.host);
        fragment = content.cloneRangeContents(range);
        return fragment;
      },

      /**
       * Same as after() but returns a string.
       */
      afterHtml: function() {
        return content.getInnerHtmlOfFragment(this.after());
      },

      /**
       * Get the BoundingClientRect of the cursor.
       * The returned values are transformed to be absolute
       # (relative to the document).
       */
      getCoordinates: function(positioning) {
        positioning = positioning || 'absolute';

        var coords = this.range.nativeRange.getBoundingClientRect();
        if (positioning === 'fixed') return coords;

        // code from mdn: https://developer.mozilla.org/en-US/docs/Web/API/window.scrollX
        var win = this.win;
        var x = (win.pageXOffset !== undefined) ? win.pageXOffset : (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollLeft;
        var y = (win.pageYOffset !== undefined) ? win.pageYOffset : (win.document.documentElement || win.document.body.parentNode || win.document.body).scrollTop;

        // translate into absolute positions
        return {
          top: coords.top + y,
          bottom: coords.bottom + y,
          left: coords.left + x,
          right: coords.right + x,
          height: coords.height,
          width: coords.width
        };
      },

      moveBefore: function(element) {
        this.updateHost(element);
        this.range.setStartBefore(element);
        this.range.setEndBefore(element);
        if (this.isSelection) return new Cursor(this.host, this.range);
      },

      moveAfter: function(element) {
        this.updateHost(element);
        this.range.setStartAfter(element);
        this.range.setEndAfter(element);
        if (this.isSelection) return new Cursor(this.host, this.range);
      },

      /**
       * Move the cursor to the beginning of the host.
       */
      moveAtBeginning: function(element) {
        if (!element) element = this.host;
        this.updateHost(element);
        this.range.selectNodeContents(element);
        this.range.collapse(true);
        if (this.isSelection) return new Cursor(this.host, this.range);
      },

      /**
       * Move the cursor to the end of the host.
       */
      moveAtEnd: function(element) {
        if (!element) element = this.host;
        this.updateHost(element);
        this.range.selectNodeContents(element);
        this.range.collapse(false);
        if (this.isSelection) return new Cursor(this.host, this.range);
      },

      /**
       * Move the cursor after the last visible character of the host.
       */
      moveAtTextEnd: function(element) {
        return this.moveAtEnd(parser.latestChild(element));
      },

      setHost: function(element) {
        if (element.jquery) element = element[0];
        this.host = element;
        this.win = (element === undefined || element === null) ? window : element.ownerDocument.defaultView;
      },

      updateHost: function(element) {
        var host = parser.getHost(element);
        if (!host) {
          error('Can not set cursor outside of an editable block');
        }
        this.setHost(host);
      },

      retainVisibleSelection: function(callback) {
        this.save();
        callback();
        this.restore();
        this.setVisibleSelection();
      },

      save: function() {
        this.savedRangeInfo = rangeSaveRestore.save(this.range);
        this.savedRangeInfo.host = this.host;
      },

      restore: function() {
        if (this.savedRangeInfo) {
          this.host = this.savedRangeInfo.host;
          this.range = rangeSaveRestore.restore(this.host, this.savedRangeInfo);
          this.savedRangeInfo = undefined;
        } else {
          error('Could not restore selection');
        }
      },

      equals: function(cursor) {
        if (!cursor) return false;

        if (!cursor.host) return false;
        if (!cursor.host.isEqualNode(this.host)) return false;

        if (!cursor.range) return false;
        if (!cursor.range.equals(this.range)) return false;

        return true;
      },

      // Create an element with the correct ownerWindow
      // (see: http://www.w3.org/DOM/faq.html#ownerdoc)
      createElement: function(tagName) {
        return this.win.document.createElement(tagName);
      },

      // Make sure a node has the correct ownerWindow
      // (see: https://developer.mozilla.org/en-US/docs/Web/API/Document/importNode)
      adoptElement: function(node) {
        return content.adoptElement(node, this.win.document);
      },

      // Currently we call triggerChange manually after format changes.
      // This is to prevent excessive triggering of the change event during
      // merge or split operations or other manipulations by scripts.
      triggerChange: function() {
        $(this.host).trigger('formatEditable');
      }
    };
  })();

  return Cursor;
})();


},{"./content":5,"./node-type":16,"./parser":17,"./range-save-restore":19,"./util/error":23,"./util/string":25}],10:[function(require,module,exports){
var browserFeatures = require('./feature-detection');
var clipboard = require('./clipboard');
var eventable = require('./eventable');
var SelectionWatcher = require('./selection-watcher');
var config = require('./config');
var Keyboard = require('./keyboard');

/**
 * The Dispatcher module is responsible for dealing with events and their handlers.
 *
 * @module core
 * @submodule dispatcher
 */

var Dispatcher = function(editable) {
  var win = editable.win;
  eventable(this, editable);
  this.supportsInputEvent = false;
  this.$document = $(win.document);
  this.config = editable.config;
  this.editable = editable;
  this.editableSelector = editable.editableSelector;
  this.selectionWatcher = new SelectionWatcher(this, win);
  this.keyboard = new Keyboard(this.selectionWatcher);
  this.setup();
};

module.exports = Dispatcher;

// This will be set to true once we detect the input event is working.
// Input event description on MDN:
// https://developer.mozilla.org/en-US/docs/Web/Reference/Events/input
var isInputEventSupported = false;

/**
 * Sets up all events that Editable.JS is catching.
 *
 * @method setup
 */
Dispatcher.prototype.setup = function() {
  // setup all events notifications
  this.setupElementEvents();
  this.setupKeyboardEvents();

  if (browserFeatures.selectionchange) {
    this.setupSelectionChangeEvents();
  } else {
    this.setupSelectionChangeFallback();
  }
};

Dispatcher.prototype.unload = function() {
  this.off();
  this.$document.off('.editable');
};

/**
 * Sets up events that are triggered on modifying an element.
 *
 * @method setupElementEvents
 * @param {HTMLElement} $document: The document element.
 * @param {Function} notifier: The callback to be triggered when the event is caught.
 */
Dispatcher.prototype.setupElementEvents = function() {
  var _this = this;
  this.$document.on('focus.editable', _this.editableSelector, function(event) {
    if (this.getAttribute(config.pastingAttribute)) return;
    _this.notify('focus', this);
  }).on('blur.editable', _this.editableSelector, function(event) {
    if (this.getAttribute(config.pastingAttribute)) return;
    _this.notify('blur', this);
  }).on('copy.editable', _this.editableSelector, function(event) {
    var selection = _this.selectionWatcher.getFreshSelection();
    if (selection.isSelection) {
      _this.notify('clipboard', this, 'copy', selection);
    }
  }).on('cut.editable', _this.editableSelector, function(event) {
    var selection = _this.selectionWatcher.getFreshSelection();
    if (selection.isSelection) {
      _this.notify('clipboard', this, 'cut', selection);
      _this.triggerChangeEvent(this);
    }
  }).on('paste.editable', _this.editableSelector, function(event) {
    var element = this;
    var afterPaste = function (blocks, cursor) {
      if (blocks.length) {
        _this.notify('paste', element, blocks, cursor);

        // The input event does not fire when we process the content manually
        // and insert it via script
        _this.notify('change', element);
      } else {
        cursor.setVisibleSelection();
      }
    };

    var cursor = _this.selectionWatcher.getFreshSelection();
    clipboard.paste(this, cursor, afterPaste);


  }).on('input.editable', _this.editableSelector, function(event) {
    if (isInputEventSupported) {
      _this.notify('change', this);
    } else {
      // Most likely the event was already handled manually by
      // triggerChangeEvent so the first time we just switch the
      // isInputEventSupported flag without notifiying the change event.
      isInputEventSupported = true;
    }
  }).on('formatEditable.editable', _this.editableSelector, function(event) {
    _this.notify('change', this);
  });
};

/**
 * Trigger a change event
 *
 * This should be done in these cases:
 * - typing a letter
 * - delete (backspace and delete keys)
 * - cut
 * - paste
 * - copy and paste (not easily possible manually as far as I know)
 *
 * Preferrably this is done using the input event. But the input event is not
 * supported on all browsers for contenteditable elements.
 * To make things worse it is not detectable either. So instead of detecting
 * we set 'isInputEventSupported' when the input event fires the first time.
 */
Dispatcher.prototype.triggerChangeEvent = function(target){
  if (isInputEventSupported) return;
  this.notify('change', target);
};

Dispatcher.prototype.dispatchSwitchEvent = function(event, element, direction) {
  var cursor;
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
    return;

  cursor = this.selectionWatcher.getSelection();
  if (!cursor || cursor.isSelection) return;
  // Detect if the browser moved the cursor in the next tick.
  // If the cursor stays at its position, fire the switch event.
  var dispatcher = this;
  setTimeout(function() {
    var newCursor = dispatcher.selectionWatcher.forceCursor();
    if (newCursor.equals(cursor)) {
      event.preventDefault();
      event.stopPropagation();
      dispatcher.notify('switch', element, direction, newCursor);
    }
  }, 1);
};

/**
 * Sets up events that are triggered on keyboard events.
 * Keyboard definitions are in {{#crossLink "Keyboard"}}{{/crossLink}}.
 *
 * @method setupKeyboardEvents
 * @param {HTMLElement} $document: The document element.
 * @param {Function} notifier: The callback to be triggered when the event is caught.
 */
Dispatcher.prototype.setupKeyboardEvents = function() {
  var _this = this;

  this.$document.on('keydown.editable', this.editableSelector, function(event) {
    var notifyCharacterEvent = !isInputEventSupported;
    _this.keyboard.dispatchKeyEvent(event, this, notifyCharacterEvent);
  });

  this.keyboard.on('left', function(event) {
    _this.dispatchSwitchEvent(event, this, 'before');
  }).on('up', function(event) {
    _this.dispatchSwitchEvent(event, this, 'before');
  }).on('right', function(event) {
    _this.dispatchSwitchEvent(event, this, 'after');
  }).on('down', function(event) {
    _this.dispatchSwitchEvent(event, this, 'after');
  }).on('tab', function(event) {
  }).on('shiftTab', function(event) {
  }).on('esc', function(event) {
  }).on('backspace', function(event) {
    var range = _this.selectionWatcher.getFreshRange();
    if (range.isCursor) {
      var cursor = range.getCursor();
      if ( cursor.isAtBeginning() ) {
        event.preventDefault();
        event.stopPropagation();
        _this.notify('merge', this, 'before', cursor);
      } else {
        _this.triggerChangeEvent(this);
      }
    } else {
      _this.triggerChangeEvent(this);
    }
  }).on('delete', function(event) {
    var range = _this.selectionWatcher.getFreshRange();
    if (range.isCursor) {
      var cursor = range.getCursor();
      if (cursor.isAtTextEnd()) {
        event.preventDefault();
        event.stopPropagation();
        _this.notify('merge', this, 'after', cursor);
      } else {
        _this.triggerChangeEvent(this);
      }
    } else {
      _this.triggerChangeEvent(this);
    }
  }).on('enter', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var range = _this.selectionWatcher.getFreshRange();
    var cursor = range.forceCursor();

    if (cursor.isAtTextEnd()) {
      _this.notify('insert', this, 'after', cursor);
    } else if (cursor.isAtBeginning()) {
      _this.notify('insert', this, 'before', cursor);
    } else {
      _this.notify('split', this, cursor.before(), cursor.after(), cursor);
    }

  }).on('shiftEnter', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var cursor = _this.selectionWatcher.forceCursor();
    _this.notify('newline', this, cursor);
  }).on('character', function(event) {
    _this.notify('change', this);
  });
};

/**
 * Sets up events that are triggered on a selection change.
 *
 * @method setupSelectionChangeEvents
 * @param {HTMLElement} $document: The document element.
 * @param {Function} notifier: The callback to be triggered when the event is caught.
 */
Dispatcher.prototype.setupSelectionChangeEvents = function() {
  var selectionDirty = false;
  var suppressSelectionChanges = false;
  var $document = this.$document;
  var selectionWatcher = this.selectionWatcher;
  var _this = this;

  // fires on mousemove (thats probably a bit too much)
  // catches changes like 'select all' from context menu
  $document.on('selectionchange.editable', function(event) {
    if (suppressSelectionChanges) {
      selectionDirty = true;
    } else {
      selectionWatcher.selectionChanged();
    }
  });

  // listen for selection changes by mouse so we can
  // suppress the selectionchange event and only fire the
  // change event on mouseup
  $document.on('mousedown.editable', this.editableSelector, function(event) {
    if (_this.config.mouseMoveSelectionChanges === false) {
      suppressSelectionChanges = true;

      // Without this timeout the previous selection is active
      // until the mouseup event (no. not good).
      setTimeout($.proxy(selectionWatcher, 'selectionChanged'), 0);
    }

    $document.on('mouseup.editableSelection', function(event) {
      $document.off('.editableSelection');
      suppressSelectionChanges = false;

      if (selectionDirty) {
        selectionDirty = false;
        selectionWatcher.selectionChanged();
      }
    });
  });
};


/**
 * Fallback solution to support selection change events on browsers that don't
 * support selectionChange.
 *
 * @method setupSelectionChangeFallback
 * @param {HTMLElement} $document: The document element.
 * @param {Function} notifier: The callback to be triggered when the event is caught.
 */
Dispatcher.prototype.setupSelectionChangeFallback = function() {
  var $document = this.$document;
  var selectionWatcher = this.selectionWatcher;

  // listen for selection changes by mouse
  $document.on('mouseup.editableSelection', function(event) {

    // In Opera when clicking outside of a block
    // it does not update the selection as it should
    // without the timeout
    setTimeout($.proxy(selectionWatcher, 'selectionChanged'), 0);
  });

  // listen for selection changes by keys
  $document.on('keyup.editable', this.editableSelector, function(event) {

    // when pressing Command + Shift + Left for example the keyup is only triggered
    // after at least two keys are released. Strange. The culprit seems to be the
    // Command key. Do we need a workaround?
    selectionWatcher.selectionChanged();
  });
};

},{"./clipboard":3,"./config":4,"./eventable":11,"./feature-detection":12,"./keyboard":14,"./selection-watcher":20}],11:[function(require,module,exports){

// Eventable Mixin.
//
// Simple mixin to add event emitter methods to an object (Publish/Subscribe).
//
// Add on, off and notify methods to an object:
// eventable(obj);
//
// publish an event:
// obj.notify(context, 'action', param1, param2);
//
// Optionally pass a context that will be applied to every event:
// eventable(obj, context);
//
// With this publishing can omit the context argument:
// obj.notify('action', param1, param2);
//
// Subscribe to a 'channel'
// obj.on('action', funtion(param1, param2){ ... });
//
// Unsubscribe an individual listener:
// obj.off('action', method);
//
// Unsubscribe all listeners of a channel:
// obj.off('action');
//
// Unsubscribe all listeners of all channels:
// obj.off();
var getEventableModule = function(notifyContext) {
  var listeners = {};

  var addListener = function(event, listener) {
    if (listeners[event] === undefined) {
      listeners[event] = [];
    }
    listeners[event].push(listener);
  };

  var removeListener = function(event, listener) {
    var eventListeners = listeners[event];
    if (eventListeners === undefined) return;

    for (var i = 0, len = eventListeners.length; i < len; i++) {
      if (eventListeners[i] === listener) {
        eventListeners.splice(i, 1);
        break;
      }
    }
  };

  // Public Methods
  return {
    on: function(event, listener) {
      if (arguments.length === 2) {
        addListener(event, listener);
      } else if (arguments.length === 1) {
        var eventObj = event;
        for (var eventType in eventObj) {
          addListener(eventType, eventObj[eventType]);
        }
      }
      return this;
    },

    off: function(event, listener) {
      if (arguments.length === 2) {
        removeListener(event, listener);
      } else if (arguments.length === 1) {
        listeners[event] = [];
      } else {
        listeners = {};
      }
    },

    notify: function(context, event) {
      var args = Array.prototype.slice.call(arguments);
      if (notifyContext) {
        event = context;
        context = notifyContext;
        args = args.splice(1);
      } else {
        args = args.splice(2);
      }
      var eventListeners = listeners[event];
      if (eventListeners === undefined) return;

      // Traverse backwards and execute the newest listeners first.
      // Stop if a listener returns false.
      for (var i = eventListeners.length - 1; i >= 0; i--) {
        // debugger
        if (eventListeners[i].apply(context, args) === false)
          break;
      }
    }
  };

};

module.exports = function(obj, notifyContext) {
  var module = getEventableModule(notifyContext);
  for (var prop in module) {
    obj[prop] = module[prop];
  }
};

},{}],12:[function(require,module,exports){
var browser = require('bowser').browser;

module.exports = (function() {
  /**
   * Check for contenteditable support
   *
   * (from Modernizr)
   * this is known to false positive in some mobile browsers
   * here is a whitelist of verified working browsers:
   * https://github.com/NielsLeenheer/html5test/blob/549f6eac866aa861d9649a0707ff2c0157895706/scripts/engine.js#L2083
   */
  var contenteditable = typeof document.documentElement.contentEditable !== 'undefined';

  /**
   * Check selectionchange event (currently supported in IE, Chrome and Safari)
   *
   * To handle selectionchange in firefox see CKEditor selection object
   * https://github.com/ckeditor/ckeditor-dev/blob/master/core/selection.js#L388
   */
  var selectionchange = (function() {

    // not exactly feature detection... is it?
    return !(browser.gecko || browser.opera);
  })();


  // Chrome contenteditable bug when inserting a character with a selection that:
  //  - starts at the beginning of the contenteditable
  //  - contains a styled span
  //  - and some unstyled text
  //
  // Example:
  // <p>|<span class="highlight">a</span>b|</p>
  //
  // For more details:
  // https://code.google.com/p/chromium/issues/detail?id=335955
  //
  // It seems it is a webkit bug as I could reproduce on Safari (LP).
  var contenteditableSpanBug = (function() {
    return !!browser.webkit;
  })();


  return {
    contenteditable: contenteditable,
    selectionchange: selectionchange,
    contenteditableSpanBug: contenteditableSpanBug
  };

})();

},{"bowser":1}],13:[function(require,module,exports){
var NodeIterator = require('./node-iterator');
var nodeType = require('./node-type');

module.exports = (function() {

  return {
    extractText: function(element) {
      var text = '';
      this.getText(element, function(part) {
        text += part;
      });
      return text;
    },

    // Extract the text of an element.
    // This has two notable behaviours:
    // - It uses a NodeIterator which will skip elements
    //   with data-editable="remove"
    // - It returns a space for <br> elements
    //   (The only block level element allowed inside of editables)
    getText: function(element, callback) {
      var iterator = new NodeIterator(element);
      var next;
      while ( (next = iterator.getNext()) ) {
        if (next.nodeType === nodeType.textNode && next.data !== '') {
          callback(next.data);
        } else if (next.nodeType === nodeType.elementNode && next.nodeName === 'BR') {
          callback(' ');
        }
      }
    },

    highlight: function(element, regex, stencilElement) {
      var matches = this.find(element, regex);
      this.highlightMatches(element, matches, stencilElement);
    },

    find: function(element, regex) {
      var text = this.extractText(element);
      var match;
      var matches = [];
      var matchIndex = 0;
      while ( (match = regex.exec(text)) ) {
        matches.push(this.prepareMatch(match, matchIndex));
        matchIndex += 1;
      }
      return matches;
    },

    highlightMatches: function(element, matches, stencilElement) {
      if (!matches || matches.length === 0) {
        return;
      }

      var next, textNode, length, offset, isFirstPortion, isLastPortion, wordId;
      var currentMatchIndex = 0;
      var currentMatch = matches[currentMatchIndex];
      var totalOffset = 0;
      var iterator = new NodeIterator(element);
      var portions = [];
      while ( (next = iterator.getNext()) ) {

        // Account for <br> elements
        if (next.nodeType === nodeType.textNode && next.data !== '') {
          textNode = next;
        } else if (next.nodeType === nodeType.elementNode && next.nodeName === 'BR') {
          totalOffset = totalOffset + 1;
          continue;
        } else {
          continue;
        }

        var nodeText = textNode.data;
        var nodeEndOffset = totalOffset + nodeText.length;
        if (currentMatch.startIndex < nodeEndOffset && totalOffset < currentMatch.endIndex) {

          // get portion position (fist, last or in the middle)
          isFirstPortion = isLastPortion = false;
          if (totalOffset <= currentMatch.startIndex) {
            isFirstPortion = true;
            wordId = currentMatch.startIndex;
          }
          if (nodeEndOffset >= currentMatch.endIndex) {
            isLastPortion = true;
          }

          // calculate offset and length
          if (isFirstPortion) {
            offset = currentMatch.startIndex - totalOffset;
          } else {
            offset = 0;
          }

          if (isLastPortion) {
            length = (currentMatch.endIndex - totalOffset) - offset;
          } else {
            length = nodeText.length - offset;
          }

          // create portion object
          var portion = {
            element: textNode,
            text: nodeText.substring(offset, offset + length),
            offset: offset,
            length: length,
            isLastPortion: isLastPortion,
            wordId: wordId
          };

          portions.push(portion);

          if (isLastPortion) {
            var lastNode = this.wrapWord(portions, stencilElement);
            iterator.replaceCurrent(lastNode);

            // recalculate nodeEndOffset if we have to replace the current node.
            nodeEndOffset = totalOffset + portion.length + portion.offset;

            portions = [];
            currentMatchIndex += 1;
            if (currentMatchIndex < matches.length) {
              currentMatch = matches[currentMatchIndex];
            }
          }
        }

        totalOffset = nodeEndOffset;
      }
    },

    getRange: function(element) {
      var range = rangy.createRange();
      range.selectNodeContents(element);
      return range;
    },

    // @return the last wrapped element
    wrapWord: function(portions, stencilElement) {
      var element;
      for (var i = 0; i < portions.length; i++) {
        var portion = portions[i];
        element = this.wrapPortion(portion, stencilElement);
      }

      return element;
    },

    wrapPortion: function(portion, stencilElement) {
      var range = rangy.createRange();
      range.setStart(portion.element, portion.offset);
      range.setEnd(portion.element, portion.offset + portion.length);
      var node = stencilElement.cloneNode(true);
      node.setAttribute('data-word-id', portion.wordId);
      range.surroundContents(node);

      // Fix a weird behaviour where an empty text node is inserted after the range
      if (node.nextSibling) {
        var next = node.nextSibling;
        if (next.nodeType === nodeType.textNode && next.data === '') {
          next.parentNode.removeChild(next);
        }
      }

      return node;
    },

    prepareMatch: function (match, matchIndex) {
      // Quickfix for the spellcheck regex where we need to match the second subgroup.
      if (match[2]) {
        return this.prepareMatchForSecondSubgroup(match, matchIndex);
      }

      return {
        startIndex: match.index,
        endIndex: match.index + match[0].length,
        matchIndex: matchIndex,
        search: match[0]
      };
    },

    prepareMatchForSecondSubgroup: function (match, matchIndex) {
      var index = match.index;
      index += match[1].length;
      return {
        startIndex: index,
        endIndex: index + match[2].length,
        matchIndex: matchIndex,
        search: match[0]
      };
    }

  };
})();

},{"./node-iterator":15,"./node-type":16}],14:[function(require,module,exports){
var browserFeatures = require('./feature-detection');
var nodeType = require('./node-type');
var eventable = require('./eventable');

/**
 * The Keyboard module defines an event API for key events.
 */
var Keyboard = function(selectionWatcher) {
  eventable(this);
  this.selectionWatcher = selectionWatcher;
};

module.exports = Keyboard;

Keyboard.prototype.dispatchKeyEvent = function(event, target, notifyCharacterEvent) {
  switch (event.keyCode) {

  case this.key.left:
    this.notify(target, 'left', event);
    break;

  case this.key.right:
    this.notify(target, 'right', event);
    break;

  case this.key.up:
    this.notify(target, 'up', event);
    break;

  case this.key.down:
    this.notify(target, 'down', event);
    break;

  case this.key.tab:
    if (event.shiftKey) {
      this.notify(target, 'shiftTab', event);
    } else {
      this.notify(target, 'tab', event);
    }
    break;

  case this.key.esc:
    this.notify(target, 'esc', event);
    break;

  case this.key.backspace:
    this.preventContenteditableBug(target, event);
    this.notify(target, 'backspace', event);
    break;

  case this.key['delete']:
    this.preventContenteditableBug(target, event);
    this.notify(target, 'delete', event);
    break;

  case this.key.enter:
    if (event.shiftKey) {
      this.notify(target, 'shiftEnter', event);
    } else {
      this.notify(target, 'enter', event);
    }
    break;
  case this.key.ctrl:
  case this.key.shift:
  case this.key.alt:
    break;
  // Metakey
  case 224: // Firefox: 224
  case 17: // Opera: 17
  case 91: // Chrome/Safari: 91 (Left)
  case 93: // Chrome/Safari: 93 (Right)
    break;
  default:
    this.preventContenteditableBug(target, event);
    if (notifyCharacterEvent) {
      this.notify(target, 'character', event);
    }
  }
};

Keyboard.prototype.preventContenteditableBug = function(target, event) {
  if (browserFeatures.contenteditableSpanBug) {
    if (event.ctrlKey || event.metaKey) return;

    var range = this.selectionWatcher.getFreshRange();
    if (range.isSelection) {
      var nodeToCheck, rangyRange = range.range;

      // Webkits contenteditable inserts spans when there is a
      // styled node that starts just outside of the selection and
      // is contained in the selection and followed by other textNodes.
      // So first we check if we have a node just at the beginning of the
      // selection. And if so we delete it before Chrome can do its magic.
      if (rangyRange.startOffset === 0) {
        if (rangyRange.startContainer.nodeType === nodeType.textNode) {
          nodeToCheck = rangyRange.startContainer.parentNode;
        } else if (rangyRange.startContainer.nodeType === nodeType.elementNode) {
          nodeToCheck = rangyRange.startContainer;
        }
      }

      if (nodeToCheck && nodeToCheck !== target && rangyRange.containsNode(nodeToCheck, true)) {
        nodeToCheck.remove();
      }
    }
  }
};

Keyboard.prototype.key = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  tab: 9,
  esc: 27,
  backspace: 8,
  'delete': 46,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18
};

Keyboard.key = Keyboard.prototype.key;

},{"./eventable":11,"./feature-detection":12,"./node-type":16}],15:[function(require,module,exports){
var nodeType = require('./node-type');

// A DOM node iterator.
//
// Has the ability to replace nodes on the fly and continue
// the iteration.
var NodeIterator;
module.exports = NodeIterator = (function() {

  var NodeIterator = function(root) {
    this.root = root;
    this.current = this.next = this.root;
  };

  NodeIterator.prototype.getNextTextNode = function() {
    var next;
    while ( (next = this.getNext()) ) {
      if (next.nodeType === nodeType.textNode && next.data !== '') {
        return next;
      }
    }
  };

  NodeIterator.prototype.getNext = function() {
    var child, n;
    n = this.current = this.next;
    child = this.next = undefined;
    if (this.current) {
      child = n.firstChild;

      // Skip the children of elements with the attribute data-editable="remove"
      // This prevents text nodes that are not part of the content to be included.
      if (child && n.getAttribute('data-editable') !== 'remove') {
        this.next = child;
      } else {
        while ((n !== this.root) && !(this.next = n.nextSibling)) {
          n = n.parentNode;
        }
      }
    }
    return this.current;
  };

  NodeIterator.prototype.replaceCurrent = function(replacement) {
    this.current = replacement;
    this.next = undefined;
    var n = this.current;
    while ((n !== this.root) && !(this.next = n.nextSibling)) {
      n = n.parentNode;
    }
  };

  return NodeIterator;
})();

},{"./node-type":16}],16:[function(require,module,exports){
// DOM node types
// https://developer.mozilla.org/en-US/docs/Web/API/Node.nodeType
module.exports = {
  elementNode: 1,
  attributeNode: 2,
  textNode: 3,
  cdataSectionNode: 4,
  entityReferenceNode: 5,
  entityNode: 6,
  processingInstructionNode: 7,
  commentNode: 8,
  documentNode: 9,
  documentTypeNode: 10,
  documentFragmentNode: 11,
  notationNode: 12
};

},{}],17:[function(require,module,exports){
var string = require('./util/string');
var nodeType = require('./node-type');
var config = require('./config');

/**
 * The parser module provides helper methods to parse html-chunks
 * manipulations and helpers for common tasks.
 *
 * @module core
 * @submodule parser
 */

module.exports = (function() {
  /**
   * Singleton that provides DOM lookup helpers.
   * @static
   */
  return {

    /**
     * Get the editableJS host block of a node.
     *
     * @method getHost
     * @param {DOM Node}
     * @return {DOM Node}
     */
    getHost: function(node) {
      var editableSelector = '.' + config.editableClass;
      var hostNode = $(node).closest(editableSelector);
      return hostNode.length ? hostNode[0] : undefined;
    },

    /**
     * Get the index of a node.
     * So that parent.childNodes[ getIndex(node) ] would return the node again
     *
     * @method getNodeIndex
     * @param {HTMLElement}
     */
    getNodeIndex: function(node) {
      var index = 0;
      while ((node = node.previousSibling) !== null) {
        index += 1;
      }
      return index;
    },

    /**
     * Check if node contains text or element nodes
     * whitespace counts too!
     *
     * @method isVoid
     * @param {HTMLElement}
     */
    isVoid: function(node) {
      var child, i, len;
      var childNodes = node.childNodes;

      for (i = 0, len = childNodes.length; i < len; i++) {
        child = childNodes[i];

        if (child.nodeType === nodeType.textNode && !this.isVoidTextNode(child)) {
          return false;
        } else if (child.nodeType === nodeType.elementNode) {
          return false;
        }
      }
      return true;
    },

    /**
     * Check if node is a text node and completely empty without any whitespace
     *
     * @method isVoidTextNode
     * @param {HTMLElement}
     */
    isVoidTextNode: function(node) {
      return node.nodeType === nodeType.textNode && !node.nodeValue;
    },

    /**
     * Check if node is a text node and contains nothing but whitespace
     *
     * @method isWhitespaceOnly
     * @param {HTMLElement}
     */
    isWhitespaceOnly: function(node) {
      return node.nodeType === nodeType.textNode && this.lastOffsetWithContent(node) === 0;
    },

    isLinebreak: function(node) {
      return node.nodeType === nodeType.elementNode && node.tagName === 'BR';
    },

    /**
     * Returns the last offset where the cursor can be positioned to
     * be at the visible end of its container.
     * Currently works only for empty text nodes (not empty tags)
     *
     * @method isWhitespaceOnly
     * @param {HTMLElement}
     */
    lastOffsetWithContent: function(node) {
      if (node.nodeType === nodeType.textNode) {
        return string.trimRight(node.nodeValue).length;
      } else {
        var i,
            childNodes = node.childNodes;

        for (i = childNodes.length - 1; i >= 0; i--) {
          node = childNodes[i];
          if (this.isWhitespaceOnly(node) || this.isLinebreak(node)) {
            continue;
          } else {
            // The offset starts at 0 before the first element
            // and ends with the length after the last element.
            return i + 1;
          }
        }
        return 0;
      }
    },

    isBeginningOfHost: function(host, container, offset) {
      if (container === host) {
        return this.isStartOffset(container, offset);
      }

      if (this.isStartOffset(container, offset)) {
        var parentContainer = container.parentNode;

        // The index of the element simulates a range offset
        // right before the element.
        var offsetInParent = this.getNodeIndex(container);
        return this.isBeginningOfHost(host, parentContainer, offsetInParent);
      } else {
        return false;
      }
    },

    isEndOfHost: function(host, container, offset) {
      if (container === host) {
        return this.isEndOffset(container, offset);
      }

      if (this.isEndOffset(container, offset)) {
        var parentContainer = container.parentNode;

        // The index of the element plus one simulates a range offset
        // right after the element.
        var offsetInParent = this.getNodeIndex(container) + 1;
        return this.isEndOfHost(host, parentContainer, offsetInParent);
      } else {
        return false;
      }
    },

    isStartOffset: function(container, offset) {
      if (container.nodeType === nodeType.textNode) {
        return offset === 0;
      } else {
        if (container.childNodes.length === 0)
          return true;
        else
          return container.childNodes[offset] === container.firstChild;
      }
    },

    isEndOffset: function(container, offset) {
      if (container.nodeType === nodeType.textNode) {
        return offset === container.length;
      } else {
        if (container.childNodes.length === 0)
          return true;
        else if (offset > 0)
          return container.childNodes[offset - 1] === container.lastChild;
        else
          return false;
      }
    },

    isTextEndOfHost: function(host, container, offset) {
      if (container === host) {
        return this.isTextEndOffset(container, offset);
      }

      if (this.isTextEndOffset(container, offset)) {
        var parentContainer = container.parentNode;

        // The index of the element plus one simulates a range offset
        // right after the element.
        var offsetInParent = this.getNodeIndex(container) + 1;
        return this.isTextEndOfHost(host, parentContainer, offsetInParent);
      } else {
        return false;
      }
    },

    isTextEndOffset: function(container, offset) {
      if (container.nodeType === nodeType.textNode) {
        var text = string.trimRight(container.nodeValue);
        return offset >= text.length;
      } else if (container.childNodes.length === 0) {
        return true;
      } else {
        var lastOffset = this.lastOffsetWithContent(container);
        return offset >= lastOffset;
      }
    },

    isSameNode: function(target, source) {
      var i, len, attr;

      if (target.nodeType !== source.nodeType)
        return false;

      if (target.nodeName !== source.nodeName)
        return false;

      for (i = 0, len = target.attributes.length; i < len; i++) {
        attr = target.attributes[i];
        if (source.getAttribute(attr.name) !== attr.value)
          return false;
      }

      return true;
    },

    /**
     * Return the deepest last child of a node.
     *
     * @method  latestChild
     * @param  {HTMLElement} container The container to iterate on.
     * @return {HTMLElement}           THe deepest last child in the container.
     */
    latestChild: function(container) {
      if (container.lastChild)
        return this.latestChild(container.lastChild);
      else
        return container;
    },

    /**
     * Checks if a documentFragment has no children.
     * Fragments without children can cause errors if inserted into ranges.
     *
     * @method  isDocumentFragmentWithoutChildren
     * @param  {HTMLElement} DOM node.
     * @return {Boolean}
     */
    isDocumentFragmentWithoutChildren: function(fragment) {
      if (fragment &&
          fragment.nodeType === nodeType.documentFragmentNode &&
          fragment.childNodes.length === 0) {
        return true;
      }
      return false;
    },

    /**
     * Determine if an element behaves like an inline element.
     */
    isInlineElement: function(window, element) {
      var styles = element.currentStyle || window.getComputedStyle(element, '');
      var display = styles.display;
      switch (display) {
      case 'inline':
      case 'inline-block':
        return true;
      default:
        return false;
      }
    }
  };
})();

},{"./config":4,"./node-type":16,"./util/string":25}],18:[function(require,module,exports){
var Cursor = require('./cursor');
var Selection = require('./selection');

/** RangeContainer
 *
 * primarily used to compare ranges
 * its designed to work with undefined ranges as well
 * so we can easily compare them without checking for undefined
 * all the time
 */
var RangeContainer;
module.exports = RangeContainer = function(editableHost, rangyRange) {
  this.host = editableHost && editableHost.jquery ?
    editableHost[0] :
    editableHost;
  this.range = rangyRange;
  this.isAnythingSelected = (rangyRange !== undefined);
  this.isCursor = (this.isAnythingSelected && rangyRange.collapsed);
  this.isSelection = (this.isAnythingSelected && !this.isCursor);
};

RangeContainer.prototype.getCursor = function() {
  if (this.isCursor) {
    return new Cursor(this.host, this.range);
  }
};

RangeContainer.prototype.getSelection = function() {
  if (this.isSelection) {
    return new Selection(this.host, this.range);
  }
};

RangeContainer.prototype.forceCursor = function() {
  if (this.isSelection) {
    var selection = this.getSelection();
    return selection.deleteContent();
  } else {
    return this.getCursor();
  }
};

RangeContainer.prototype.isDifferentFrom = function(otherRangeContainer) {
  otherRangeContainer = otherRangeContainer || new RangeContainer();
  var self = this.range;
  var other = otherRangeContainer.range;
  if (self && other) {
    return !self.equals(other);
  } else if (!self && !other) {
    return false;
  } else {
    return true;
  }
};


},{"./cursor":9,"./selection":21}],19:[function(require,module,exports){
var error = require('./util/error');
var nodeType = require('./node-type');

/**
 * Inspired by the Selection save and restore module for Rangy by Tim Down
 * Saves and restores ranges using invisible marker elements in the DOM.
 */
module.exports = (function() {
  var boundaryMarkerId = 0;

  // (U+FEFF) zero width no-break space
  var markerTextChar = '\ufeff';

  var getMarker = function(host, id) {
    return host.querySelector('#'+ id);
  };

  return {

    insertRangeBoundaryMarker: function(range, atStart) {
      var markerId = 'editable-range-boundary-' + (boundaryMarkerId += 1);
      var markerEl;
      var container = range.commonAncestorContainer;

      // If ownerDocument is null the commonAncestorContainer is window.document
      if (container.ownerDocument === null || container.ownerDocument === undefined) {
        error('Cannot save range: range is emtpy');
      }
      var doc = container.ownerDocument.defaultView.document;

      // Clone the Range and collapse to the appropriate boundary point
      var boundaryRange = range.cloneRange();
      boundaryRange.collapse(atStart);

      // Create the marker element containing a single invisible character using DOM methods and insert it
      markerEl = doc.createElement('span');
      markerEl.id = markerId;
      markerEl.setAttribute('data-editable', 'remove');
      markerEl.style.lineHeight = '0';
      markerEl.style.display = 'none';
      markerEl.appendChild(doc.createTextNode(markerTextChar));

      boundaryRange.insertNode(markerEl);
      return markerEl;
    },

    setRangeBoundary: function(host, range, markerId, atStart) {
      var markerEl = getMarker(host, markerId);
      if (markerEl) {
        range[atStart ? 'setStartBefore' : 'setEndBefore'](markerEl);
        markerEl.parentNode.removeChild(markerEl);
      } else {
        console.log('Marker element has been removed. Cannot restore selection.');
      }
    },

    save: function(range) {
      var rangeInfo, startEl, endEl;

      // insert markers
      if (range.collapsed) {
        endEl = this.insertRangeBoundaryMarker(range, false);
        rangeInfo = {
          markerId: endEl.id,
          collapsed: true
        };
      } else {
        endEl = this.insertRangeBoundaryMarker(range, false);
        startEl = this.insertRangeBoundaryMarker(range, true);

        rangeInfo = {
          startMarkerId: startEl.id,
          endMarkerId: endEl.id,
          collapsed: false
        };
      }

      // Adjust each range's boundaries to lie between its markers
      if (range.collapsed) {
        range.collapseBefore(endEl);
      } else {
        range.setEndBefore(endEl);
        range.setStartAfter(startEl);
      }

      return rangeInfo;
    },

    restore: function(host, rangeInfo) {
      if (rangeInfo.restored) return;

      var range = rangy.createRange();
      if (rangeInfo.collapsed) {
        var markerEl = getMarker(host, rangeInfo.markerId);
        if (markerEl) {
          markerEl.style.display = 'inline';
          var previousNode = markerEl.previousSibling;

          // Workaround for rangy issue 17
          if (previousNode && previousNode.nodeType === nodeType.textNode) {
            markerEl.parentNode.removeChild(markerEl);
            range.collapseToPoint(previousNode, previousNode.length);
          } else {
            range.collapseBefore(markerEl);
            markerEl.parentNode.removeChild(markerEl);
          }
        } else {
          console.log('Marker element has been removed. Cannot restore selection.');
        }
      } else {
        this.setRangeBoundary(host, range, rangeInfo.startMarkerId, true);
        this.setRangeBoundary(host, range, rangeInfo.endMarkerId, false);
      }

      range.normalizeBoundaries();
      return range;
    }
  };
})();

},{"./node-type":16,"./util/error":23}],20:[function(require,module,exports){
var parser = require('./parser');
var RangeContainer = require('./range-container');
var Cursor = require('./cursor');
var Selection = require('./selection');

/**
 * The SelectionWatcher module watches for selection changes inside
 * of editable blocks.
 *
 * @module core
 * @submodule selectionWatcher
 */

var SelectionWatcher;
module.exports = SelectionWatcher = function(dispatcher, win) {
  this.dispatcher = dispatcher;
  this.win = win || window;
  this.rangySelection = undefined;
  this.currentSelection = undefined;
  this.currentRange = undefined;
};


/**
 * Return a RangeContainer if the current selection is within an editable
 * otherwise return an empty RangeContainer
 */
SelectionWatcher.prototype.getRangeContainer = function() {
  this.rangySelection = rangy.getSelection(this.win);

  // rangeCount is 0 or 1 in all browsers except firefox
  // firefox can work with multiple ranges
  // (on a mac hold down the command key to select multiple ranges)
  if (this.rangySelection.rangeCount) {
    var range = this.rangySelection.getRangeAt(0);
    var hostNode = parser.getHost(range.commonAncestorContainer);
    if (hostNode) {
      return new RangeContainer(hostNode, range);
    }
  }

  // return an empty range container
  return new RangeContainer();
};


/**
 * Gets a fresh RangeContainer with the current selection or cursor.
 *
 * @return RangeContainer instance
 */
SelectionWatcher.prototype.getFreshRange = function() {
  return this.getRangeContainer();
};


/**
 * Gets a fresh RangeContainer with the current selection or cursor.
 *
 * @return Either a Cursor or Selection instance or undefined if
 * there is neither a selection or cursor.
 */
SelectionWatcher.prototype.getFreshSelection = function() {
  var range = this.getRangeContainer();

  return range.isCursor ?
    range.getCursor(this.win) :
    range.getSelection(this.win);
};


/**
 * Get the selection set by the last selectionChanged event.
 * Sometimes the event does not fire fast enough and the seleciton
 * you get is not the one the user sees.
 * In those cases use #getFreshSelection()
 *
 * @return Either a Cursor or Selection instance or undefined if
 * there is neither a selection or cursor.
 */
SelectionWatcher.prototype.getSelection = function() {
  return this.currentSelection;
};


SelectionWatcher.prototype.forceCursor = function() {
  var range = this.getRangeContainer();
  return range.forceCursor();
};


SelectionWatcher.prototype.selectionChanged = function() {
  var newRange = this.getRangeContainer();
  if (newRange.isDifferentFrom(this.currentRange)) {
    var lastSelection = this.currentSelection;
    this.currentRange = newRange;

    // empty selection or cursor
    if (lastSelection) {
      if (lastSelection.isCursor && !this.currentRange.isCursor) {
        this.dispatcher.notify('cursor', lastSelection.host);
      } else if (lastSelection.isSelection && !this.currentRange.isSelection) {
        this.dispatcher.notify('selection', lastSelection.host);
      }
    }

    // set new selection or cursor and fire event
    if (this.currentRange.isCursor) {
      this.currentSelection = new Cursor(this.currentRange.host, this.currentRange.range);
      this.dispatcher.notify('cursor', this.currentSelection.host, this.currentSelection);
    } else if (this.currentRange.isSelection) {
      this.currentSelection = new Selection(this.currentRange.host, this.currentRange.range);
      this.dispatcher.notify('selection', this.currentSelection.host, this.currentSelection);
    } else {
      this.currentSelection = undefined;
    }
  }
};

},{"./cursor":9,"./parser":17,"./range-container":18,"./selection":21}],21:[function(require,module,exports){
var Cursor = require('./cursor');
var content = require('./content');
var parser = require('./parser');
var config = require('./config');

/**
 * The Selection module provides a cross-browser abstraction layer for range
 * and selection.
 *
 * @module core
 * @submodule selection
 */

module.exports = (function() {

  /**
   * Class that represents a selection and provides functionality to access or
   * modify the selection.
   *
   * @class Selection
   * @constructor
   */
  var Selection = function(editableHost, rangyRange) {
    this.setHost(editableHost);
    this.range = rangyRange;
    this.isSelection = true;
  };

  // add Cursor prototpye to Selection prototype chain
  var Base = function() {};
  Base.prototype = Cursor.prototype;
  Selection.prototype = $.extend(new Base(), {
    /**
     * Get the text inside the selection.
     *
     * @method text
     */
    text: function() {
      return this.range.toString();
    },

    /**
     * Get the html inside the selection.
     *
     * @method html
     */
    html: function() {
      return this.range.toHtml();
    },

    /**
     *
     * @method isAllSelected
     */
    isAllSelected: function() {
      return parser.isBeginningOfHost(
        this.host,
        this.range.startContainer,
        this.range.startOffset) &&
      parser.isTextEndOfHost(
        this.host,
        this.range.endContainer,
        this.range.endOffset);
    },

    /**
     * Get the ClientRects of this selection.
     * Use this if you want more precision than getBoundingClientRect can give.
     */
    getRects: function() {
      var coords = this.range.nativeRange.getClientRects();

      // todo: translate into absolute positions
      // just like Cursor#getCoordinates()
      return coords;
    },

    /**
     *
     * @method link
     */
    link: function(href, attrs) {
      var $link = $(this.createElement('a'));
      if (href) $link.attr('href', href);
      for (var name in attrs) {
        $link.attr(name, attrs[name]);
      }

      this.forceWrap($link[0]);
    },

    unlink: function() {
      this.removeFormatting('a');
    },

    toggleLink: function(href, attrs) {
      var links = this.getTagsByName('a');
      if (links.length >= 1) {
        var firstLink = links[0];
        if (this.isExactSelection(firstLink, 'visible')) {
          this.unlink();
        } else {
          this.expandTo(firstLink);
        }
      } else {
        this.link(href, attrs);
      }
    },

    toggle: function(elem) {
      elem = this.adoptElement(elem);
      this.range = content.toggleTag(this.host, this.range, elem);
      this.setSelection();
    },

    /**
     *
     * @method makeBold
     */
    makeBold: function() {
      var bold = this.createElement(config.boldTag);
      this.forceWrap(bold);
    },

    toggleBold: function() {
      var bold = this.createElement(config.boldTag);
      this.toggle(bold);
    },

    /**
     *
     * @method giveEmphasis
     */
    giveEmphasis: function() {
      var em = this.createElement(config.italicTag);
      this.forceWrap(em);
    },

    toggleEmphasis: function() {
      var em = this.createElement(config.italicTag);
      this.toggle(em);
    },

    /**
     *
     * @method makeBold
     */
    makeStrikethrough: function() {
      var $bold = $(config.strikethroughTag);
      this.forceWrap($bold[0]);
    },

    toggleStrikethrough: function() {
      var $bold = $(config.strikethroughTag);
      this.toggle($bold[0]);
    },

    /**
     * Surround the selection with characters like quotes.
     *
     * @method surround
     * @param {String} E.g. '«'
     * @param {String} E.g. '»'
     */
    surround: function(startCharacter, endCharacter) {
      this.range = content.surround(this.host, this.range, startCharacter, endCharacter);
      this.setSelection();
    },

    removeSurround: function(startCharacter, endCharacter) {
      this.range = content.deleteCharacter(this.host, this.range, startCharacter);
      this.range = content.deleteCharacter(this.host, this.range, endCharacter);
      this.setSelection();
    },

    toggleSurround: function(startCharacter, endCharacter) {
      if (this.containsString(startCharacter) &&
        this.containsString(endCharacter)) {
        this.removeSurround(startCharacter, endCharacter);
      } else {
        this.surround(startCharacter, endCharacter);
      }
    },

    /**
     * @method removeFormatting
     * @param {String} tagName. E.g. 'a' to remove all links.
     */
    removeFormatting: function(tagName) {
      this.range = content.removeFormatting(this.host, this.range, tagName);
      this.setSelection();
    },

    /**
     * Delete the contents inside the range. After that the selection will be a
     * cursor.
     *
     * @method deleteContent
     * @return Cursor instance
     */
    deleteContent: function() {
      this.range.deleteContents();
      return new Cursor(this.host, this.range);
    },

    /**
     * Expand the current selection.
     *
     * @method expandTo
     * @param {DOM Node}
     */
    expandTo: function(elem) {
      this.range = content.expandTo(this.host, this.range, elem);
      this.setSelection();
    },

    /**
     *  Collapse the selection at the beginning of the selection
     *
     *  @return Cursor instance
     */
    collapseAtBeginning: function(elem) {
      this.range.collapse(true);
      this.setSelection();
      return new Cursor(this.host, this.range);
    },

    /**
     *  Collapse the selection at the end of the selection
     *
     *  @return Cursor instance
     */
    collapseAtEnd: function(elem) {
      this.range.collapse(false);
      this.setSelection();
      return new Cursor(this.host, this.range);
    },

    /**
     * Wrap the selection with the specified tag. If any other tag with
     * the same tagName is affecting the selection this tag will be
     * remove first.
     *
     * @method forceWrap
     */
    forceWrap: function(elem) {
      elem = this.adoptElement(elem);
      this.range = content.forceWrap(this.host, this.range, elem);
      this.setSelection();
    },

    /**
     * Get all tags that affect the current selection. Optionally pass a
     * method to filter the returned elements.
     *
     * @method getTags
     * @param {Function filter(node)} [Optional] Method to filter the returned
     *   DOM Nodes.
     * @return {Array of DOM Nodes}
     */
    getTags: function(filterFunc) {
      return content.getTags(this.host, this.range, filterFunc);
    },

    /**
     * Get all tags of the specified type that affect the current selection.
     *
     * @method getTagsByName
     * @param {String} tagName. E.g. 'a' to get all links.
     * @return {Array of DOM Nodes}
     */
    getTagsByName: function(tagName) {
      return content.getTagsByName(this.host, this.range, tagName);
    },

    /**
     * Check if the selection is the same as the elements contents.
     *
     * @method isExactSelection
     * @param {DOM Node}
     * @param {flag:  undefined or 'visible'} if 'visible' is passed
     *   whitespaces at the beginning or end of the selection will
     *   be ignored.
     * @return {Boolean}
     */
    isExactSelection: function(elem, onlyVisible) {
      return content.isExactSelection(this.range, elem, onlyVisible);
    },

    /**
     * Check if the selection contains the passed string.
     *
     * @method containsString
     * @return {Boolean}
     */
    containsString: function(str) {
      return content.containsString(this.range, str);
    },

    /**
     * Delete all occurences of the specified character from the
     * selection.
     *
     * @method deleteCharacter
     */
    deleteCharacter: function(character) {
      this.range = content.deleteCharacter(this.host, this.range, character);
      this.setSelection();
    }
  });

  return Selection;
})();

},{"./config":4,"./content":5,"./cursor":9,"./parser":17}],22:[function(require,module,exports){
var content = require('./content');
var highlightText = require('./highlight-text');
var nodeType = require('./node-type');

module.exports = (function() {

  // Unicode character blocks for letters.
  // See: http://jrgraphix.net/research/unicode_blocks.php
  //
  // \\u0041-\\u005A    A-Z (Basic Latin)
  // \\u0061-\\u007A    a-z (Basic Latin)
  // \\u0030-\\u0039    0-9 (Basic Latin)
  // \\u00AA            ª   (Latin-1 Supplement)
  // \\u00B5            µ   (Latin-1 Supplement)
  // \\u00BA            º   (Latin-1 Supplement)
  // \\u00C0-\\u00D6    À-Ö (Latin-1 Supplement)
  // \\u00D8-\\u00F6    Ø-ö (Latin-1 Supplement)
  // \\u00F8-\\u00FF    ø-ÿ (Latin-1 Supplement)
  // \\u0100-\\u017F    Ā-ſ (Latin Extended-A)
  // \\u0180-\\u024F    ƀ-ɏ (Latin Extended-B)
  var letterChars = '\\u0041-\\u005A\\u0061-\\u007A\\u0030-\\u0039\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF\\u0100-\\u017F\\u0180-\\u024F';

  var escapeRegEx = function(s) {
    return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  };

  /**
   * Spellcheck class.
   *
   * @class Spellcheck
   * @constructor
   */
  var Spellcheck = function(editable, configuration) {
    var defaultConfig = {
      checkOnFocus: false, // check on focus
      checkOnChange: true, // check after changes
      throttle: 1000, // unbounce rate in ms before calling the spellcheck service after changes
      removeOnCorrection: true, // remove highlights after a change if the cursor is inside a highlight
      markerNode: $('<span class="spellcheck"></span>'),
      spellcheckService: undefined
    };

    this.editable = editable;
    this.win = editable.win;
    this.config = $.extend(defaultConfig, configuration);
    this.prepareMarkerNode();
    this.setup();
  };

  Spellcheck.prototype.setup = function(editable) {
    if (this.config.checkOnFocus) {
      this.editable.on('focus', $.proxy(this, 'onFocus'));
      this.editable.on('blur', $.proxy(this, 'onBlur'));
    }
    if (this.config.checkOnChange || this.config.removeOnCorrection) {
      this.editable.on('change', $.proxy(this, 'onChange'));
    }
  };

  Spellcheck.prototype.onFocus = function(editableHost) {
    if (this.focusedEditable !== editableHost) {
      this.focusedEditable = editableHost;
      this.editableHasChanged(editableHost);
    }
  };

  Spellcheck.prototype.onBlur = function(editableHost) {
    if (this.focusedEditable === editableHost) {
      this.focusedEditable = undefined;
    }
  };

  Spellcheck.prototype.onChange = function(editableHost) {
    if (this.config.checkOnChange) {
      this.editableHasChanged(editableHost, this.config.throttle);
    }
    if (this.config.removeOnCorrection) {
      this.removeHighlightsAtCursor(editableHost);
    }
  };

  Spellcheck.prototype.prepareMarkerNode = function() {
    var marker = this.config.markerNode;
    if (marker.jquery) {
      marker = marker[0];
    }
    marker = content.adoptElement(marker, this.win.document);
    this.config.markerNode = marker;

    marker.setAttribute('data-editable', 'ui-unwrap');
    marker.setAttribute('data-spellcheck', 'spellcheck');
  };

  Spellcheck.prototype.createMarkerNode = function() {
    return this.config.markerNode.cloneNode();
  };

  Spellcheck.prototype.removeHighlights = function(editableHost) {
    $(editableHost).find('[data-spellcheck=spellcheck]').each(function(index, elem) {
      content.unwrap(elem);
    });
  };

  Spellcheck.prototype.removeHighlightsAtCursor = function(editableHost) {
    var wordId;
    var selection = this.editable.getSelection(editableHost);
    if (selection && selection.isCursor) {
      var elementAtCursor = selection.range.startContainer;
      if (elementAtCursor.nodeType === nodeType.textNode) {
        elementAtCursor = elementAtCursor.parentNode;
      }

      do {
        if (elementAtCursor === editableHost) return;
        if ( elementAtCursor.hasAttribute('data-word-id') ) {
          wordId = elementAtCursor.getAttribute('data-word-id');
          break;
        }
      } while ( (elementAtCursor = elementAtCursor.parentNode) );

      if (wordId) {
        selection.retainVisibleSelection(function() {
          $(editableHost).find('[data-word-id='+ wordId +']').each(function(index, elem) {
            content.unwrap(elem);
          });
        });
      }
    }
  };

  Spellcheck.prototype.createRegex = function(words) {
    var escapedWords = $.map(words, function(word) {
      return escapeRegEx(word);
    });

    var regex = '';
    regex += '([^' + letterChars + ']|^)';
    regex += '(' + escapedWords.join('|') + ')';
    regex += '(?=[^' + letterChars + ']|$)';

    return new RegExp(regex, 'g');
  };

  Spellcheck.prototype.highlight = function(editableHost, misspelledWords) {

    // Remove old highlights
    this.removeHighlights(editableHost);

    // Create new highlights
    if (misspelledWords && misspelledWords.length > 0) {
      var regex = this.createRegex(misspelledWords);
      var span = this.createMarkerNode();
      highlightText.highlight(editableHost, regex, span);
    }
  };

  Spellcheck.prototype.editableHasChanged = function(editableHost, throttle) {
    if (this.timeoutId && this.currentEditableHost === editableHost) {
      clearTimeout(this.timeoutId);
    }

    var that = this;
    this.timeoutId = setTimeout(function() {
      that.checkSpelling(editableHost);
      that.currentEditableHost = undefined;
      that.timeoutId = undefined;
    }, throttle || 0);

    this.currentEditableHost = editableHost;
  };

  Spellcheck.prototype.checkSpelling = function(editableHost) {
    var that = this;
    var text = highlightText.extractText(editableHost);
    text = content.normalizeWhitespace(text);

    this.config.spellcheckService(text, function(misspelledWords) {
      var selection = that.editable.getSelection(editableHost);
      if (selection) {
        selection.retainVisibleSelection(function() {
          that.highlight(editableHost, misspelledWords);
        });
      } else {
        that.highlight(editableHost, misspelledWords);
      }
    });
  };

  return Spellcheck;
})();


},{"./content":5,"./highlight-text":13,"./node-type":16}],23:[function(require,module,exports){
var config = require('../config');

// Allows for safe error logging
// Falls back to console.log if console.error is not available
module.exports = function() {
  if (config.logErrors === false) { return; }

  var args;
  args = Array.prototype.slice.call(arguments);
  if (args.length === 1) {
    args = args[0];
  }

  if (window.console && typeof window.console.error === 'function') {
    return console.error(args);
  } else if (window.console) {
    return console.log(args);
  }
};

},{"../config":4}],24:[function(require,module,exports){
var config = require('../config');

// Allows for safe console logging
// If the last param is the string "trace" console.trace will be called
// configuration: disable with config.log = false
module.exports = function() {
  if (config.log === false) { return; }

  var args, _ref;
  args = Array.prototype.slice.call(arguments);
  if (args.length) {
    if (args[args.length - 1] === 'trace') {
      args.pop();
      if ((_ref = window.console) ? _ref.trace : void 0) {
        console.trace();
      }
    }
  }

  if (args.length === 1) {
    args = args[0];
  }

  if (window.console) {
    return console.log(args);
  }
};


},{"../config":4}],25:[function(require,module,exports){
module.exports = (function() {

  var toString = Object.prototype.toString;
  var htmlCharacters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
  };

  return {
    trimRight: function(text) {
      return text.replace(/\s+$/, '');
    },

    trimLeft: function(text) {
      return text.replace(/^\s+/, '');
    },

    trim: function(text) {
      return text.replace(/^\s+|\s+$/g, '');
    },

    isString: function(obj) {
      return toString.call(obj) === '[object String]';
    },

    /**
     * Turn any string into a regular expression.
     * This can be used to search or replace a string conveniently.
     */
    regexp: function(str, flags) {
      if (!flags) flags = 'g';
      var escapedStr = str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      return new RegExp(escapedStr, flags);
    },

    /**
     * Escape HTML characters <, > and &
     * Usage: escapeHtml('<div>');
     *
     * @param { String }
     * @param { Boolean } Optional. If true " and ' will also be escaped.
     * @return { String } Escaped Html you can assign to innerHTML of an element.
     */
    escapeHtml: function(s, forAttribute) {
      return s.replace(forAttribute ? /[&<>'"]/g : /[&<>]/g, function(c) { // "'
        return htmlCharacters[c];
      });
    },

    /**
     * Escape a string the browser way.
     */
    browserEscapeHtml: function(str) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }
  };
})();

},{}]},{},[6]);
