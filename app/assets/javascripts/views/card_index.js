/*global TrelloClone JST */
TrelloClone.Views.CardIndex = Backbone.View.extend({
  template: JST["cards/index"],
  
  events: {
    "mouseover .card-show": "handleHover",
    "mouseout .card-show": "handleStopHover",
    "click .close-button": "handleRemove",
    "sortupdate .card-sortable": "handleCardMove"
  },
  
  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({ cards: this.collection });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  onRender: function () {
    this.$el.find(".card-sortable").sortable({
      connectWith: ".card-sortable"
    });
    this.$el.find(".card-sortable").disableSelection();
  },
  
  handleHover: function(event) {
    var $cardEl = $(event.currentTarget);
    $cardEl.find(".close-button").removeClass("hidden");
  },
  
  handleStopHover: function() {
    var $cardEl = $(event.currentTarget);
    $cardEl.find(".close-button").addClass("hidden");
  },
  
  handleRemove: function() {
    var $cardEl = $(event.target);
    var model = this.collection.get($cardEl.parent(".card-show").data("id"));
    this.collection.remove(model);
    model.destroy();
  },
  
  handleCardMove: function() {
    console.log("moved");
    this.onRender();
  }
});