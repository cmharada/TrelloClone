/*global TrelloClone JST */
TrelloClone.Views.CardNew = Backbone.View.extend({
  template: JST["cards/new"],
  
  events: {
    "click": "showForm",
    "submit .new-card-form": "handleSubmit"
  },
  
  initialize: function(list) {
    this.parentList = list;
  },
  
  render: function() {
    var renderedContent = this.template();
    this.$el.html(renderedContent);
    
    return this;
  },
  
  handleSubmit: function(event) {
    event.preventDefault();
    
    var list = this.parentList;
    var that = this;
    
    var params = $(event.currentTarget).serializeJSON();
    params.card.list_id = this.parentList.id;
    var lastCard = this.parentList.cards().last();
    if (lastCard) {
      params.card.ord = lastCard.get("ord") + 1;
    } else {
      params.card.ord = 0;
    }
    
    var newCard = new TrelloClone.Models.Card(params["card"]);
    newCard.save({}, {
      success: function() {
        list.cards().add(newCard);
      },
      error: function(model, response) {
        that.$el.find(".errors").append(response.responseJSON);
      }
    });
  },
  
  showForm: function() {
    this.$el.find(".new-card-text").addClass("hidden");
    this.$el.find(".new-card-form").removeClass("hidden");
  }
});