/*global TrelloClone JST*/
TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],
  
  events: {
    "mouseover": "handleHover",
    "mouseout": "handleStopHover",
    "click .close-button": "handleRemove"
  },
  
  render: function() {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);
    
    return this;
  },
  
  handleHover: function() {
    this.$el.find(".close-button").removeClass("hidden");
  },
  
  handleStopHover: function() {
    this.$el.find(".close-button").addClass("hidden");
  },
  
  handleRemove: function() {
    debugger;
    this.remove();
    this.model.destroy();
  }
});