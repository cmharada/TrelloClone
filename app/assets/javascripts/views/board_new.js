/*global TrelloClone JST*/
TrelloClone.Views.BoardNew = Backbone.View.extend({
  template: JST["boards/new"],
  
  events: {
    "submit #new-board": "handleSubmission"
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
  
  handleSubmission: function(event) {
    event.preventDefault();
    var that = this;
    
    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(params["board"]);
    
    newBoard.save({}, {
      success: function () {
        TrelloClone.boards.add(newBoard);
        Backbone.history.navigate("/", { trigger: true });
      },
      
      error: function (model, response) {
        that.$el.find(".errors").append(response.responseJSON);
      }
    });
  }
});