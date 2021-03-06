var Editable = require('../src/core');
var Spellcheck = require('../src/spellcheck');
var Cursor = require('../src/cursor');

describe('Spellcheck', function() {

  // Helpers

  var createCursor = function(host, elem, offset) {
    var range = rangy.createRange();
    range.setStart(elem, offset);
    range.setEnd(elem, offset);
    return new Cursor(host, range);
  };

  // Specs

  beforeEach(function() {
    this.editable = new Editable();
  });

  describe('new instance', function() {

    it('is created and has a reference to editable', function() {
      var spellcheck = new Spellcheck(this.editable);
      expect(spellcheck.editable).toEqual(this.editable);
    });
  });

  describe('with a simple sentence', function() {
    beforeEach(function() {
      var that = this;
      this.p = $('<p>A simple sentence.</p>')[0];
      this.errors = ['simple'];
      this.spellcheck = new Spellcheck(this.editable, {
        markerNode: $('<span class="misspelled-word"></span>')[0],
        spellcheckService: function(text, callback) {
          callback(that.errors);
        }
      });
    });

    describe('checkSpelling()', function() {

      it('calls highlight()', function() {
        var highlight = sinon.spy(this.spellcheck, 'highlight');
        this.spellcheck.checkSpelling(this.p);
        expect(highlight.called).toEqual(true);
      });

      it('highlights a match with the given marker node', function() {
        this.spellcheck.checkSpelling(this.p);
        expect( $(this.p).find('.misspelled-word').length ).toEqual(1);
      });

      it('removes a corrected highlighted match.', function() {
        this.spellcheck.checkSpelling(this.p);
        var $misspelledWord = $(this.p).find('.misspelled-word');
        expect($misspelledWord.length).toEqual(1);

        // correct the error
        $misspelledWord.html('simpler');
        this.errors = [];

        this.spellcheck.checkSpelling(this.p);
        $misspelledWord = $(this.p).find('.misspelled-word');
        expect($misspelledWord.length).toEqual(0);
      });

      it('match highlights are marked with "ui-unwrap"', function() {
        this.spellcheck.checkSpelling(this.p);
        var $spellcheck = $(this.p).find('.misspelled-word').first();
        var dataEditable = $spellcheck.attr('data-editable');
        expect(dataEditable).toEqual('ui-unwrap');
      });

      it('calls highlight() for an empty wordlist', function() {
        var highlight = sinon.spy(this.spellcheck, 'highlight');
        this.spellcheck.config.spellcheckService = function(text, callback) {
          callback([]);
        };
        this.spellcheck.checkSpelling(this.p);
        expect(highlight.called).toEqual(true);
      });

      it('calls highlight() for an undefined wordlist', function() {
        var highlight = sinon.spy(this.spellcheck, 'highlight');
        this.spellcheck.config.spellcheckService = function(text, callback) {
          callback();
        };
        this.spellcheck.checkSpelling(this.p);
        expect(highlight.called).toEqual(true);
      });
    });


    describe('removeHighlights()', function() {

      it('removes the highlights', function() {
        this.spellcheck.checkSpelling(this.p);
        expect( $(this.p).find('.misspelled-word').length ).toEqual(1);
        this.spellcheck.removeHighlights(this.p);
        expect( $(this.p).find('.misspelled-word').length ).toEqual(0);
      });
    });


    describe('removeHighlightsAtCursor()', function() {

      beforeEach(function() {
        this.spellcheck.checkSpelling(this.p);
        this.highlight = $(this.p).find('.misspelled-word')[0];
      });

      afterEach(function() {
        this.editable.getSelection.restore();
      });

      it('does remove the highlights if cursor is within a match', function() {
        var self = this;
        sinon.stub(this.editable, 'getSelection', function() {
          return createCursor(self.p, self.highlight, 0);
        });

        this.spellcheck.removeHighlightsAtCursor(this.p);
        expect( $(this.p).find('.misspelled-word').length ).toEqual(0);
      });

      it('does not remove the highlights if cursor is outside a match', function() {
        var self = this;
        sinon.stub(this.editable, 'getSelection', function() {
          return createCursor(self.p, self.p.firstChild, 0);
        });

        this.spellcheck.removeHighlightsAtCursor(this.p);
        expect( $(this.p).find('.misspelled-word').length ).toEqual(1);
      });
    });


    describe('retains cursor position', function() {

      it('in the middle of a text node', function() {
        var cursor = createCursor(this.p, this.p.firstChild, 4);
        cursor.save();
        this.spellcheck.checkSpelling(this.p);
        cursor.restore();

        // These are the child nodes of the paragraph we expect after restoring the cursor:
        // 'A |span|span| sentence.'
        //
        // The cursor should be positioned between the two marker <span> elements.
        expect(cursor.range.startContainer).toEqual(this.p);
        expect(cursor.range.startOffset).toEqual(2);

        // The storing of the cursor position will have split up the text node,
        // so now we have two markers in the editable.
        expect( $(this.p).find('.misspelled-word').length ).toEqual(2);

      });
    });
  });
});
