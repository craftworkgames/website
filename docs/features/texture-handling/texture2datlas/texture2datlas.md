---
id: texture2datlas
sidebar_label: Texture2DAtlas
title: Texture2DAtlas
description: A Texture2DAtlas is a 2D texture atlas that contains a collection of texture regions.
image: ./cards.png
---

import PlayingCards from './cards.png'
import ResultScreenShot from './result.png'

:::tip[Up to date]
This page is **up to date** for MonoGame.Extended `@mgeversion@`.  If you find outdated information, [please open an issue](https://github.com/craftworkgames/craftworkgames.github.io/issues).
:::

In the [previous](../texture2dregion/texture2dregion.md) article we discussed what a `Texture2DRegion` is.  When you combine all the texture regions into a single collection, this is called a texture atlas. By using a texture atlas it gives us an easy way to create and manage our collection of regions

Let's take a look at the image of all the cards again.

<figure>
    <img src={PlayingCards} style={{width: '100%', imageRendering: 'pixelated'}} alt="Packed Texture of playing cards"/>
    <figcaption>
        <small>
            <a href="https://kenney.nl/assets/playing-cards-pack">Playing Cards Pack</a> by <a href="https://www.kenney.nl">Kenney</a>; Licensed under CreativeCommons Zero, CC0
        </small>
    </figcaption>
</figure>

Let's recreate the example from the [Texture2DRegion](/docs/features/texture-handling/texture2dregion/texture2dregion.md) document, but this time using a `Texture2DAtlas`.

## Using `Texture2DAtlas`
When creating a `Texture2DAtlas`, if all of the regions within your texture are uniform, then you can use the `Texture2DAtlas.Create` method to automatically generate every region.  Then you can access the regions by index. For instance:

```cs
private Texture2DAtlas _atlas;

private Texture2DRegion _aceOfClubs;
private Texture2DRegion _aceOfDiamonds;
private Texture2DRegion _aceOfHearts;
private Texture2DRegion _aceOfSpades;

protected override void LoadContent()
{
    Texture2D cardsTexture = Content.Load<Texture2D>("cards");
    _atlas = Texture2DAtlas.Create("Atlas/Cards", cardsTexture, 32, 32);

    _aceOfClubs = _atlas[12];
    _aceOfDiamonds = _atlas[25];
    _aceOfHearts = _atlas[38];
    _aceOfSpades = _atlas[51];
}
```

Then we can draw the regions just like in the other example

```cs
protected override void Draw(GameTime gameTime)
{
    GraphicsDevice.Clear(Color.CornflowerBlue);

    _spriteBatch.Begin(samplerState: SamplerState.PointClamp);

    _spriteBatch.Draw(_aceOfClubs, new Vector2(336, 284), Color.White);
    _spriteBatch.Draw(_aceOfDiamonds, new Vector2(368, 284), Color.White);
    _spriteBatch.Draw(_aceOfHearts, new Vector2(400, 284), Color.White);
    _spriteBatch.Draw(_aceOfSpades, new Vector2(432, 284), Color.White);

    _spriteBatch.End();

    base.Draw(gameTime);
}
```

<figure>
    <img src={ResultScreenShot} style={{width: '100%', imageRendering: 'pixelated'}} alt="Result of the code"/>
    <figcaption>
        <small>Result of the code above drawing all four ace cards using texture regions</small>
    </figcaption>
</figure>

:::note
Regions that are automatically generated are automatically assigned a name in the format of `"{Textur2D.Name}({x}, {y}, {width}, {height})"`.  So in the instance of our cards, since the name of the image is `cards.png`, the Ace of Hearts would be generated as `"cards(384, 0, 32, 32)"`
:::

## Manually Creating Regions
If the regions in your texture are not uniform, or if you want more fine grained control over the creation of them, such as giving them a specific name instead of the auto generated name, you can use the `Texture2DAtlas.CreateRegion()` method

```cs
protected override void LoadContent()
{
    Texture2D cardsTexture = Content.Load<Texture2D>("cards");
    _atlas = Texture2DAtlas.Create("Atlas/Cards", cardsTexture, 32, 32);

    _aceOfClubs = _atlas.CreateRegion(384, 0, 32, 32, "Ace of Clubs");
}
```

:::caution
When naming a texture region, the name of each region added to the texture atlas must be unique.
:::


## Conclusion
We've now learned to use a `Texture2DAtlas` to create and retrieve the `Texture2DRegion` instances for our `Texture2D`.  Next, let's take a look at the `Sprite` class and how we can use the `Texture2DAtlas` to generate the sprites for us based on the regions.