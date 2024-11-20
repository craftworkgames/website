---
id: contentManager
title: ContentManager
sidebar_label: ContentManager
description: Extensions for the MonoGame ContentManager class.
---

:::tip[Up to date]
This page is **up to date** for MonoGame.Extended `@mgeversion@`.  If you find outdated information, [please open an issue](https://github.com/craftworkgames/craftworkgames.github.io/issues).
:::

# ContentManager extensions

## ContentManager.OpenStream

`System.IO.Stream ContentManager.OpenStream(string filename)`

**OpenStream** allows easy access to `TitleContainer.OpenStream` so you can use the `Game.Content` object to load compiled resources *and* included resources.

Example below loads a text file "song-lyrics" directly.  This file is assumed to have it's properties set to "Copy to Output Directory".
```csharp
// song-lyrics.txt is in the Content Directory
var stream = Content.OpenStream("song-lyrics.txt");
var reader = new StreamReader(stream);
string songLyrics = reader.ReadToEnd();

reader.Close();
stream.Close();
```

## ContentManager.GetGraphicsDevice

`GraphicsDevice ContentManager.GetGraphicsDevice()`

**GetGraphicsDevice** returns the current `GraphicsDevice` from the services.

```csharp
var graphicsDevice = Content.GetGraphicsDevice();
var width = graphicsDevice.DisplayMode.Width;
```
