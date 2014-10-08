/*global TrelloClone JST */
TrelloClone.Views.CardIndex = Backbone.CompositeView.extend({
  template: JST["cards/index"],

  events: {
    "mouseover .card-show": "handleHover",
    "mouseout .card-show": "handleStopHover",
    "click .card-show": "handleShowCard",
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

    this.onRender();

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

  handleCardMove: function(event) {
    event.stopPropagation();

    var newOrd = this.$el.find(".card-sortable").sortable("toArray", {
      "attribute": "data-id"
    });
    this.reorderCards(_.map(newOrd, function(string) {
      return parseInt(string, 10);
    }));
  },

  reorderCards: function(newOrd) {
    if (this.collection.length !== newOrd.length) {
      for (var k = 0; k < this.collection.length; k++) {
        if (!_.contains(newOrd, this.collection.at(k).id)) {
          this.collection.remove(this.collection.at(k));
          this.render();
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
  },

  handleShowCard: function(event) {
    if (this.subviews(".card-detail-wrapper")[0]) {
      this.removeSubview(".card-detail-wrapper",
        this.subviews(".card-detail-wrapper")[0]);
    }
    var cardShowView = new TrelloClone.Views.CardShow({
      model: this.collection.get($(event.currentTarget).data("id"))
    });
    this.addSubview(".card-detail-wrapper", cardShowView);
  }
});