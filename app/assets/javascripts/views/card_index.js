/*global TrelloClone JST */
TrelloClone.Views.CardIndex = Backbone.CompositeView.extend({
  template: JST["cards/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "add", this.addCard);
    this.listenTo(this.collection, "remove", this.removeCard);
    this.listenTo(this.collection, "sync add", this.render);

    var that = this;
    
    this.collection.each(function (card) {
      that.addCard(card);
    });
  },
  
  addCard: function (card) {
    var view = new TrelloClone.Views.CardShow({ model: card });
    this.addSubview("#" + card.id, view);
  },
  
  removeCard: function (card) {
    var selector = "#" + card.id;
    var subView = _.find(this.subviews(selector), function(subview) {
      return subview.model === card;
    });

    this.removeSubview("selector", subView);
  },
  
  render: function () {
    var renderedContent = this.template({ cards: this.collection });
    this.$el.html(renderedContent);
    
    this.attachSubviews();
    
    this.onRender();
    
    return this;
  },
  
  onRender: function () {
    this.$el.find("#card-sortable").sortable();
    this.$el.find("#card-sortable").disableSelection();
  }
});