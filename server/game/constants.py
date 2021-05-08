# max number of players allowed in a game
MAX_PLAYERS = 10
# min number of players allowed in a game
MIN_PLAYERS = 2
# default white card pack
DEFAULT_WHITE_CARDS = 'white_cards.csv'
# default black card pack
DEFAULT_BLACK_CARDS = 'black_cards.csv'

### GAME RULES ###


class GameRules:
    # number of cards each player should have in their hand at any given time
    CARDS_PER_HAND = 7
    # number of points needed to win
    POINTS_TO_WIN = 10
    # number of wildcards to insert into deck
    NUM_WILDCARDS = 20
    # text for wildcards
    WILDCARD_TEXT = '___'
