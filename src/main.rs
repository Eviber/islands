// use anyhow::Result;

use bevy::prelude::*;

#[derive(Component)]
struct Player;

#[derive(Component)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_startup_system(setup)
        .add_system(move_player)
        .add_system(bevy::window::close_on_esc)
        .run();
}

// Add the game's entities to our world
fn setup(mut commands: Commands, asset_server: Res<AssetServer>) {
    // Camera
    commands.spawn(Camera2dBundle::default());
    commands.spawn((
        Player,
        SpriteBundle {
            texture: asset_server.load("player.png").into(),
            //transform: Transform::from_xyz(0.0, 0.0, 0.0),
            ..Default::default()
        },
        Direction::Up,
    ));
}

fn move_player(
    keyboard_input: Res<Input<KeyCode>>,
    mut player_query: Query<(&Player, &mut Transform)>,
) {
    for (_player, mut transform) in player_query.iter_mut() {
        if keyboard_input.pressed(KeyCode::Up) {
            transform.translation.y += 1.0;
        }
        if keyboard_input.pressed(KeyCode::Down) {
            transform.translation.y -= 1.0;
        }
        if keyboard_input.pressed(KeyCode::Left) {
            transform.translation.x -= 1.0;
        }
        if keyboard_input.pressed(KeyCode::Right) {
            transform.translation.x += 1.0;
        }
    }
}
