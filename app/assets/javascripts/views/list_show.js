/*global TrelloClone JST */
TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  tagName: "li",
  className: "list-show",
  
  template: JST["lists/show"],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    
    var cardIndexView = new TrelloClone.Views.CardIndex({
      collection: this.model.cards()
    });
    this.addSubview(".cards", cardIndexView);
    var newCardView = new TrelloClone.Views.CardNew(this.model);
    this.addSubview(".new-card", newCardView);
    this.$el.attr("data-id", this.model.id);
  },
  
  render: function() {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    
    this.attachSubviews();

    this.onRender();
    
    return this;
  }
});