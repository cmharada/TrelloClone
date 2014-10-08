/*global TrelloClone JST*/
TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],
  tagName: "div",
  className: "card-modal modal fade",

  events: {
    "click .edit-card-description": "showDescriptionEdit",
    "submit .edit-card-desc": "handleSubmit"
  },

  initialize: function() {
    this.$el.modal('show');
  },

  render: function() {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);

    return this;
  },

  showDescriptionEdit: function() {
    this.$(".card-desc").addClass("hidden");
    this.$(".edit-card-desc").removeClass("hidden");
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    this.model.set(params);
    this.model.save();

    this.$el.modal("hide");
  }
});