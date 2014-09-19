# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list

json.(@board, :title)

json.lists do
  json.array!(@board.lists) do |list|
    json.title list.title
    json.ord list.ord
    json.id list.id
    
    json.cards do
      json.array!(list.cards) do |card|
        json.title card.title
        json.ord card.ord
        json.description card.description
        json.id card.id
      end
    end
  end
end