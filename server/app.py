from flask_socketio import SocketIO, join_room, leave_room, emit
from flask import Flask, jsonify, request

import random
import string

from game.exceptions import *
from game.state import *
from game.constants import *
import game.loader as loader


app = Flask(__name__)
socketio = SocketIO(app)

rooms = {}


def get_game(room_name, sid):
    if room_name in rooms:
        return rooms[room_name]
    emit("room closed", to=sid)
    return None


'''
    CONNECTING AND DISCONNECTING
'''


@socketio.on('connection')
def connection():
    return list(rooms.keys())


@socketio.on('disconnection')
def disconnection(room_name, user_name):
    game = get_game(room_name, request.sid)
    if not game:
        return
    leave_room(str(room_name))
    emit('user left', user_name, to=room_name)


'''
    ROOMS
'''


@socketio.on('create room')
def handle_create_room():
    # unique 6-character room code
    room_name = ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=6))
    while room_name in rooms.keys():
        room_name = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=6))

    rooms[room_name] = State(loader.loadWhiteCards(DEFAULT_WHITE_CARDS),
                             loader.loadBlackCards(DEFAULT_BLACK_CARDS))
    # send to everyone
    socketio.emit('new room', list(rooms.keys()), skip_sid=request.sid)
    return room_name


@socketio.on('join room')
def handle_join_room(room_name, user_name, token):
    print(user_name, "joined room")
    join_room(str(room_name))
    game = get_game(room_name, request.sid)
    if not game:
        return

    new_token = token
    # token_match = filter(game.players, lambda p: p.session_token == token)
    token_match = [p for p in game.players if p.session_token == token]
    if len(token_match) > 0 and token_match[0].session_token == token:
        # user already exists, update their info
        player = token_match[0]
        player.name = user_name
        player.id = request.sid
    else:
        new_token = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=32))
        game.add_player(user_name, request.sid, new_token)

    players = [str(p) for p in game.players]
    emit('user joined', (user_name, players),
         to=room_name, skip_sid=request.sid)

    player = game.get_player_by_id(request.sid)
    return {'players': players, 'isHost': player.is_host, 'token': new_token}


@socketio.on('validate username')
def validate_username(room_name, user_name):
    game = get_game(room_name, request.sid)
    if not game:
        return

    names = [p.name for p in game.players]
    if user_name in names:
        return {'valid': False, 'error': "Username taken"}
    elif len(user_name) > 20:
        return {'valid': False, 'error': "Username must be < 20 characters"}
    return {'valid': True}


'''
    GAMEPLAY
'''


@socketio.on('start game')
def start_game(room_name):
    game = get_game(room_name, request.sid)
    if not game:
        return

    emit('start game', to=room_name, skip_sid=request.sid)
    play_round(room_name)


def play_round(room_name):
    game = get_game(room_name, request.sid)
    if not game:
        return

    (judge, players), black_card = game.new_round()
    for player in game.players:
        data = {
            'whiteCards': player.get_hand_str(),
            'blackCard': str(black_card),
            'isJudge': player in players,
            'judgeName': judge.name,
        }
        emit('new round', data, to=player.id)


if __name__ == '__main__':
    socketio.run(app)
