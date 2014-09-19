/*global TrelloClone JST */
TrelloClone.Views.ListNew = Backbone.View.extend({
  template: JST["lists/new"],
  
  events: {
    "submit #new-list": "handleSubmit"
  },
  
  initialize: function(board) {
    this.parentBoard = board;
  },
  
  handleSubmit: function(event) {
    event.preventDefault();
    
    var board = this.parentBoard;
    var that = this;
    
    var params = $(event.currentTarget).serializeJSON();
    params.list.board_id = this.parentBoard.id;
    var lastBoard = this.parentBoard.lists().last();
    if (lastBoard) {
      params.list.ord = lastBoard.get("ord") + 1;
    } else {
      params.list.ord = 0;
    }
    
    var newList = new TrelloClone.Models.List(params["list"]);
    newList.save({}, {
      success: function() {
        board.lists().add(newList);
      },
      error: function(model, response) {
        that.$el.find(".errors").append(response.responseJSON);
      }
    });
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  }
});