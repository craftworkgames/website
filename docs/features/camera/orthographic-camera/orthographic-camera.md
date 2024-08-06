---
id: orthographiccamera
sidebar_label: Orthographic Camera
title: Orthographic Camera
---

This camera type creates a view with no depth perception.  Exactly what is wanted for a 2D game.

To create a camera initialize an instance of it using one of the constructor overloads. It's recommended that you used a viewport adapter to scale the screen but you don't have to.
```csharp
private OrthographicCamera _camera;

protected override void Initialize()
{
    base.Initialize();

    var viewportAdapter = new BoxingViewportAdapter(Window, GraphicsDevice, 800, 480);
    _camera = new OrthographicCamera(viewportAdapter);
}
```

Next you'll need to apply the camera's view matrix to one or more of the `SpriteBatch.Begin` calls in your `Draw` method.
```csharp
protected override void Draw(GameTime gameTime)
{
    var transformMatrix = _camera.GetViewMatrix();
    _spriteBatch.Begin(transformMatrix: transformMatrix);
    _spriteBatch.DrawRectangle(new RectangleF(250,250,50,50), Color.Black, 1f);
    _spriteBatch.End();
}
```
A `TransformationMatrix` is one of the parameters of a `SpriteBatch.Begin` call.

The transformation matrix is used for scale, rotate, and translate options.
In other words, we use the camera to transform the way a batch of sprites is rendered to the screen without actually modifying their positions, rotations, or scales directly. This creates the effect of having a camera looking at your scene that can move, rotate, and zoom in and out.

Once you've got a camera instance in your game you'll probably want to move it around in the `Update` method somehow. For example, you could move the camera's position with the arrow keys.

```csharp
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
    return movementDirection;
}

protected override void Update(GameTime gameTime)
{
    const float movementSpeed = 200;
    _camera.Move(GetMovementDirection() * movementSpeed * gameTime.GetElapsedSeconds());
}
```

Last but not least, there'll be times when you want to convert from screen coordinates to world coordinates and vice-versa.  For example, if you want to know which sprite is under the mouse you'll need to convert the mouse position back into the world position that was used to position the sprite in the first place.
```csharp
var mouseState = Mouse.GetState();
_worldPosition = _camera.ScreenToWorld(new Vector2(mouseState.X, mouseState.Y));
```

## Further Reading

[Matrix Basics](https://stevehazen.wordpress.com/2010/02/15/matrix-basics-how-to-step-away-from-storing-an-orientation-as-3-angles/)
[Orthographic Camera](https://en.wikipedia.org/wiki/Orthographic_projection)