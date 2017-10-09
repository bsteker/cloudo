// Generated by CoffeeScript 1.6.2
(function() {
  var Command, CommandStack, CommandStackData, m, _fn_redo_, _fn_undo_;

  m = $namespace("cloudo");

  Command = (function() {
    function Command() {}

    Command.prototype.execute = function() {};

    Command.prototype.redo = function() {
      return this.execute();
    };

    Command.prototype.undo = function() {};

    return Command;

  })();

  CommandStackData = (function() {
    function CommandStackData() {
      this.stack = [];
    }

    CommandStackData.prototype.stack = null;

    CommandStackData.prototype.index = -1;

    CommandStackData.prototype.atTail = function() {
      return this.index + 1 === this.stack.length;
    };

    CommandStackData.prototype.atNull = function() {
      return this.index < 0;
    };

    CommandStackData.prototype.trimTail = function() {
      return this.stack.splice(this.index + 1, this.stack.length - this.index - 1);
    };

    CommandStackData.prototype.push = function(element) {
      this.stack.push(element);
      return this.index = this.stack.length - 1;
    };

    CommandStackData.prototype.shift = function() {
      this.stack.shift();
      return --this.index;
    };

    CommandStackData.prototype.size = function() {
      return this.stack.length;
    };

    CommandStackData.prototype.moveNext = function() {
      return ++this.index;
    };

    CommandStackData.prototype.movePrevious = function() {
      return --this.index;
    };

    CommandStackData.prototype.execute = function(fn) {
      var element;
      element = this.stack[this.index];
      fn(element);
      return element;
    };

    return CommandStackData;

  })();

  _fn_undo_ = function(cmd) {
    return cmd.undo();
  };

  _fn_redo_ = function(cmd) {
    return cmd.redo();
  };

  CommandStack = (function() {
    function CommandStack(size) {
      this.size = size;
      this._data_ = new CommandStackData;
    }

    CommandStack.prototype._data_ = null;

    CommandStack.prototype.add = function(command) {
      if (!this._data_.atTail()) {
        this._data_.trimTail();
      }
      this._data_.push(command);
      if (this._data_.size() > this.size) {
        this._data_.shift();
      }
      return command.execute();
    };

    CommandStack.prototype.canUndo = function() {
      return !this._data_.atNull();
    };

    CommandStack.prototype.canRedo = function() {
      return !this._data_.atTail();
    };

    CommandStack.prototype.undo = function() {
      var command;
      if (this.canUndo()) {
        command = this._data_.execute(_fn_undo_);
        this._data_.movePrevious();
        return command;
      }
    };

    CommandStack.prototype.redo = function() {
      var command;
      if (this.canRedo()) {
        this._data_.moveNext();
        command = this._data_.execute(_fn_redo_);
        return command;
      }
    };

    return CommandStack;

  })();

  m.Command = Command;

  m.CommandStack = CommandStack;

}).call(this);
