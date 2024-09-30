---
id: tiled
title: Tiled
sidebar_label: Tiled
description: Load and render map files created with the Tiled Map Editor.
---

:::warning[Not up to date]
This page **is not** up to date for MonoGame.Extended `@mgeversion@`.  If you would like to contribute to updating this document, please [create a new PR](https://github.com/craftworkgames/craftworkgames.github.io/pulls)
:::

[![Tiled Logo](tiled-logo.png)](https://www.mapeditor.org/)
# Tiled
The `MonoGame.Extended.Tiled` library allows you to load and render maps files (`.tmx`) created with the [Tiled Map Editor](http://www.mapeditor.org/).

## Installation

### Content Pipeline

To load a Tiled map you first to compile it using the Content Pipeline. If you have not setup the Content Pipeline with `MonoGame.Extended` yet see the instructions on how to install the Content Pipeline in the [getting started section](/docs/getting-started/installation-monogame).

### NuGet 

[MonoGame.Extended.Tiled](https://www.nuget.org/packages/MonoGame.Extended.Tiled/) is distributed via a NuGet package. You can add the NuGet package to your C# project through your IDE of choice (Visual Studio, Xamarin Studio, Rider, etc) or through the Command Line Interface (CLI) using the dotnet command.
```
dotnet add package MonoGame.Extended.Tiled
```

## Usage

:::info
The assets used in this example can be downloaded [here](./assets.zip)
:::

We start by including the `Tiled` namespaces.

```cs
using MonoGame.Extended.Tiled;
using MonoGame.Extended.Tiled.Renderers;
```

Next, we define our `Tiledmap` and `TiledMapRenderer`

```cs
TiledMap _tiledMap;
TiledMapRenderer _tiledMapRenderer;
```

Which we then initialize in the LoadContent function.
```cs
protected override void LoadContent()
{
    _tiledMap = Content.Load<TiledMap>("samplemap");
    _tiledMapRenderer = new TiledMapRenderer(GraphicsDevice, _tiledMap);

    _spriteBatch = new SpriteBatch(GraphicsDevice);
}
```

Finally we render and update the map by calling `mapRenderer.Update()` and `mapRenderer.Draw()` respectively.

```cs
protected override void Update(GameTime gameTime)
{
    _tiledMapRenderer.Update(gameTime);
}
```

```cs
protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.Black);
    
    _tiledMapRenderer.Draw();
}
```

### Adding a Camera

The game now renders the `TiledMap`. The next step is to navigate through the map with a `Camera`.

We start by including the `Camera` namespaces.
```cs
using MonoGame.Extended;
using MonoGame.Extended.ViewportAdapters;
```

Next, we define our Camera

```cs
private OrthographicCamera _camera;
```

Which we then initialize in the Initialize function.

```cs
protected override void Initialize()
{
    var viewportadapter = new BoxingViewportAdapter(Window, GraphicsDevice, 800, 600);
    _camera = new OrthographicCamera(viewportadapter);
}
```

We need to tell the Camera where to look. To do this, we declare the following field.

```cs
private Vector2 _cameraPosition;
```

We update this field with the following function.

```cs
private Vector2 GetMovementDirection()
{
    var movementDirection = Vector2.Zero;
    var state = Keyboard.GetState();
    if (state.IsKeyDown(Keys.Down))
    {
        movementDirection += Vector2.UnitY;
    }
    if (state.IsKeyDown(Keys.Up))
    {
        movementDirection -= Vector2.UnitY;
    }
    if (state.IsKeyDown(Keys.Left))
    {
        movementDirection -= Vector2.UnitX;
    }
    if (state.IsKeyDown(Keys.Right))
    {
        movementDirection += Vector2.UnitX;
    }
    
    // Can't normalize the zero vector so test for it before normalizing
    if (movementDirection != Vector2.Zero)
    {
        movementDirection.Normalize(); 
    }
    
    return movementDirection;
}

private void MoveCamera(GameTime gameTime)
{
    var speed = 200;
    var seconds = gameTime.GetElapsedSeconds();
    var movementDirection = GetMovementDirection();
    _cameraPosition += speed * movementDirection * seconds;
}
```

Which we then use in the `Update` function.

```cs
protected override void Update(GameTime gameTime)
{
    _tiledMapRenderer.Update(gameTime);

    MoveCamera(gameTime);
    _camera.LookAt(_cameraPosition);

    base.Update(gameTime);
}
```

To render the map with our `Camera`, we call the Draw function with the Camera's `ViewMatrix` as follows.

```cs
protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.Black);

    _tiledMapRenderer.Draw(_camera.GetViewMatrix());
}
```
