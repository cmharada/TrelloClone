/*global TrelloClone JST */
TrelloClone.Views.ListIndex = Backbone.CompositeView.extend({
  template: JST["lists/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "add", this.addList);
    this.listenTo(this.collection, "remove", this.removeList);
    this.listenTo(this.collection, "sync add", this.render);

    var that = this;
    
    this.collection.each(function (list) {
      that.addList(list);
    });
  },
  
  addList: function (list) {
    var view = new TrelloClone.Views.ListShow({ model: list });
    this.addSubview("#" + list.id, view);
  },
  
  removeList: function (list) {
    var selector = "#" + list.id;
    var subView = _.find(this.subviews(selector), function(subview) {
      return subview.model === list;
    });

    this.removeSubview("selector", subView);
  },
  
  render: function () {
    var renderedContent = this.template({ lists: this.collection });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  }
});