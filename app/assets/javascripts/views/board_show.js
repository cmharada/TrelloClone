/*global TrelloClone JST */
TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  events: {
    "click .delete-board": "deleteBoard"
  },
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    var listIndexView = new TrelloClone.Views.ListIndex({
      collection: this.model.lists()
    });
    this.addSubview(".list-container", listIndexView);
    var newListView = new TrelloClone.Views.ListNew(this.model);
    this.addSubview(".new-list", newListView);
  },
  
  render: function() {
    var renderedContent = this.template( { board: this.model });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    this.onRender();
    
    return this;
  },
  
  deleteBoard: function() {
    /* Maybe ask for confirmation first? */
    this.remove();
    this.model.destroy();
    Backbone.history.navigate("#", { trigger: true });
  }
});