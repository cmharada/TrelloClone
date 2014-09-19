/*global TrelloClone JST */
TrelloClone.Views.ListShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  
  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);
    
    var that = this;
    
    this.model.cards().each(function(card) {
      that.addCard(card);
    });
    
    var newCardView = new TrelloClone.Views.CardNew(this.model);
    this.addSubview(".new-card", newCardView);
  },
  
  addCard: function(card) {
    var view = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview(".cards", view);
  },
  
  removeCard: function(card) {
    var subView = _.find(this.subviews(".cards"), function(subview) {
      return subview.model === card;
    });
    
    this.removeSubview(".cards", subView);
  },
  
  render: function() {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    return this;
  }
});