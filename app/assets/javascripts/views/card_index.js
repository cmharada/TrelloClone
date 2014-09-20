/*global TrelloClone JST */
TrelloClone.Views.CardIndex = Backbone.View.extend({
  template: JST["cards/index"],
  
  events: {
    "mouseover .card-show": "handleHover",
    "mouseout .card-show": "handleStopHover",
    "click .close-button": "handleRemove",
    "sortupdate .card-sortable": "handleCardMove"
  },
  
  initialize: function (options) {
    this.listenTo(this.collection, "sync add remove", this.render);
    this.parentList = options.parentList;
  },
  
  render: function () {
    var renderedContent = this.template({ cards: this.collection });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  onRender: function () {
    this.$el.find(".card-sortable").sortable({
      connectWith: ".card-sortable",
      dropOnEmpty: true
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
  
  handleCardMove: function(event, ui) {
    event.stopPropagation();
    
    var newOrd = this.$el.find(".card-sortable").sortable("toArray", {
      "attribute": "data-id"
    });

    if (ui.sender) {
      // Object moved to here from other list
      this.reorderCards(newOrd, ui.sender);
    } else {
      this.reorderCards(newOrd);
    }
  },
  
  reorderCards: function(newOrd) {
    if (this.collection.length !== newOrd.length) {
      for (var k = 0; k < this.collection.length; k++) {
        if (!_.contains(newOrd, this.collection.at(k))) {
          this.collection.remove(this.collection.at(k));
        }
      }
    }
    for (var i = 0; i < newOrd.length; i++) {
      var card = this.collection.get(newOrd[i]);
      if (!card) {
        this.changeCardList(card, newOrd, i);
      } else {
        card.set("ord", i);
        card.save();
      }
    }
    this.collection.sort();
  },
  
  changeCardList: function(card, newOrd, i) {
    var parentId = this.parentList.id;
    var that = this;
    card = new TrelloClone.Models.Card({
      id: newOrd[i]
    });
    card.fetch({
      success: function() {
        card.set("list_id", parentId);
        card.set("ord", i);
        card.save();
        
        that.collection.add(card);
      }
    });
  }
});