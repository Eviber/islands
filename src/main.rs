// use anyhow::Result;

use bevy::prelude::*;

const TILE_SIZE: f32 = 32.0;

#[derive(Component)]
struct Player;

#[derive(Component)]
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

#[derive(Component)]
struct Position {
    x: i32,
    y: i32,
}

#[derive(Component)]
enum Movement {
    Up,
    Down,
    Left,
    Right,
    None,
}

impl std::ops::AddAssign<&Movement> for Position {
    fn add_assign(&mut self, other: &Movement) {
        match other {
            Movement::Up => self.y -= 1,
            Movement::Down => self.y += 1,
            Movement::Left => self.x -= 1,
            Movement::Right => self.x += 1,
            Movement::None => (),
        }
    }
}

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_startup_system(setup)
        .add_system(move_player)
        .add_system(move_entity)
        .add_system(update_transform)
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
        Position { x: 0, y: 0 },
        Movement::None,
    ));
}

fn move_player(
    keyboard_input: Res<Input<KeyCode>>,
    mut player_query: Query<(&Player, &mut Movement, &mut Direction)>,
) {
    for (_player, mut movement) in player_query.iter_mut() {
        *movement = if keyboard_input.pressed(KeyCode::Up) {
            Movement::Up
        } else if keyboard_input.pressed(KeyCode::Down) {
            Movement::Down
        } else if keyboard_input.pressed(KeyCode::Left) {
            Movement::Left
        } else if keyboard_input.pressed(KeyCode::Right) {
            Movement::Right
        } else {
            Movement::None
        };
    }
}

fn move_entity(mut query: Query<(&mut Position, &mut Movement, Option<&mut Direction>)>) {
    for (mut position, mut movement, mut direction) in query.iter_mut() {
        // TODO: Check for collisions
        *position += &movement;
        movement.x = 0;
        movement.y = 0;
    }
}

fn update_transform(mut query: Query<(&Position, &mut Transform)>) {
    for (position, mut transform) in query.iter_mut() {
        transform.translation.x = position.x as f32 * TILE_SIZE;
        transform.translation.y = position.y as f32 * TILE_SIZE;
    }
}
