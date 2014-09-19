/*global TrelloClone JST */
TrelloClone.Views.ListIndex = Backbone.CompositeView.extend({
  template: JST["lists/index"],
  
  events: {
    "sortupdate .list-sortable": "shiftLists"
  },
  
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
    this.addSubview(".lists-wrapper", view);
  },
  
  removeList: function (list) {
    var subView = this.findListSubview(list);

    this.removeSubview(".lists-wrapper", subView);
  },
  
  render: function () {
    var renderedContent = this.template({ lists: this.collection });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  },
  
  findListSubview: function (list) {
    return _.find(this.subviews(".lists-wrapper"), function(subview) {
      return subview.model === list;
    });
  },
  
  onRender: function () {
    this.$el.find(".list-sortable").sortable();
    this.$el.find(".list-sortable").disableSelection();
  },
  
  shiftLists: function() {
    var newOrd = this.$el.find(".list-sortable").sortable("toArray", {
      "attribute": "data-id"
    });
    
    for (var i = 0; i < newOrd.length; i++) {
      var list = this.collection.get(newOrd[i]);
      list.set("ord", i);
      list.save();
      
      this.removeList(list);
      this.addList(list);
    }
  }
});