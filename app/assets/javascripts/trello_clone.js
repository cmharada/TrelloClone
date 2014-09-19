/*global TrelloClone*/
window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  
  initialize: function() {
    TrelloClone.boards = new TrelloClone.Collections.Boards();
    new TrelloClone.Routers.AppRouter($("#main"));
    Backbone.history.start();
  }
};
