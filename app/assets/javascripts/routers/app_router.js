/*global TrelloClone */
TrelloClone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "boardIndex",
    "boards/": "boardIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow"
  },
  
  initialize: function($el) {
    this.$rootEl = $el;
  },
  
  boardIndex: function() {
    TrelloClone.boards.fetch();
    
    var view = new TrelloClone.Views.BoardIndex({
      collection: TrelloClone.boards
    });
    this._swapView(view);
  },
  
  boardNew: function() {
    var view = new TrelloClone.Views.BoardNew();
    this._swapView(view);
  },
  
  boardShow: function(id) {
    var board = TrelloClone.boards.getOrFetch(id);
    
    var view = new TrelloClone.Views.BoardShow({
      model: board
    });
    this._swapView(view);
  },
  
  _swapView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    
    this.currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
});