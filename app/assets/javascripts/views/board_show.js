/*global TrelloClone JST */
TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],
  
  events: {
    "click .delete-board": "deleteBoard"
  },
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.registerList);
    this.listenTo(this.model.lists(), "remove", this.removeList);
    
    var that = this;
    
    this.model.lists().each(function(list) {
      that.registerList(list);
    });
    var newListView = new TrelloClone.Views.ListNew(this.model);
    this.addSubview(".new-list", newListView);
  },
  
  registerList: function(list) {
    var view = new TrelloClone.Views.ListShow({ model: list });
    this.addSubview(".lists", view);
  },
  
  removeList: function(list) {
    var subView = _.find(this.subviews(".lists"), function(subview) {
      return subview.model === list;
    });
    
    this.removeSubview(".lists", subView);
  },
  
  render: function() {
    var renderedContent = this.template( { board: this.model });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  },
  
  deleteBoard: function() {
    /* Maybe ask for confirmation first? */
    this.remove();
    this.model.destroy();
    Backbone.history.navigate("#", { trigger: true });
  }
});